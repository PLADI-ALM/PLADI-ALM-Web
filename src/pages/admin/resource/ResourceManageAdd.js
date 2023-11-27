import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {ManageAddButton, ManageAddButtonImage} from "components/searchBar/ManageSearchBar";
import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";
import {AdminResourcesAxios, ImageUrlAxios, ResourcesAxios, UsersAxios} from "api/AxiosApi";
import SearchButtonImage from "assets/images/SearchPlus.svg"
import EmptyImg from "assets/images/EmptyImg.svg"
import {ExitBtn} from "components/modal/BigModal";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getImgKey} from "../../../utils/ImageUtil";

const MarginWhiteContainer = styled(WhiteContainer)`
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ColumnContainer = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
`

const ShortColumnContainer = styled(ColumnContainer)`
  width: 50%;
`

const ImgColumnContainer = styled(ShortColumnContainer)`
  margin-bottom: 0;
  height: 150px;
  width: 300px;
`

const TitleLabel = styled.label`
  color: #8741CB;
  font-size: 20px;
  width: 100px;
  min-width: 100px;
  text-align: left;
`

const InfoInput = styled.input.attrs({type: 'text'})`
  flex: 1;
  height: 20px;
  border-radius: 8px;
  border: 2px solid #E6E6E6;
  font-size: 20px;
  padding: 10px;
`

const StaffInputContainer = styled.div`
  width: 50%;
  height: 100%;
  display: block;
  z-index: 11;
  background: white;
`

const StaffInfoInput = styled(InfoInput)`
  width: 100%;
`

const StaffSelectUl = styled.div`
  width: 100%;
  max-height: 120px;
  overflow: scroll;
  border-radius: 0 0 8px 8px;
  border: 2px solid #E6E6E6;
  padding: 10px;
  z-index: 3;
  background: white;
  margin-top: -5px;
`

const StaffNameLabel = styled.p`
  color: #4C4C4C;
  font-size: 20px;
  text-align: left;
  z-index: 4;
  cursor: pointer;
  margin: 10px 0;
  width: fit-content;
`

const DescriptionContainer = styled(ColumnContainer)`
  height: 60px;
`

const DescriptionInput = styled.textarea`
  flex: 1;
  height: 100%;
  border-radius: 8px;
  border: 2px solid #E6E6E6;
  font-size: 20px;
  padding: 10px;
`

const AddButtonContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
`

const ImageAddContainer = styled.div`
  width: 100px;
  height: 40px;
  margin-left: 10px;
`

const ImageAddButton = styled.button`
  min-width: 100px;
  height: 100%;
  border-radius: 8px;
  border: none;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  font-size: 16px;
`

const ImageInfoContainer = styled.div`
  width: 320px;
  min-width: 320px;
  height: 180px;
  border-radius: 8px;
  border: 2px solid #E6E6E6;
  overflow: clip;
  position: relative;
`

const AbExitBtn = styled(ExitBtn)`
  position: absolute;
  top: 0;
  right: 0;
  color: #8741CB;
`

const PreviewImage = styled.img`
  width: 320px;
  height: 180px;
  object-fit: contain;
`

function ResourceManageAdd(props) {
    let {resourceId} = useParams();

    const initialValue = {
        name: null,
        manufacturer: null,
        place: null,
        description: null,
    };
    const [inputValues, setInputValues] = useState(initialValue);
    const {name, capacity, place, description} = inputValues;	//비구조화 할당
    const [staff, setStaff] = useState({
        userId: null,
        name: ""
    });
    const [staffList, setStaffList] = useState([]);
    const [imageSrc, setImgSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImgUrl] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [isFocusStaffInput, setIsFocusStaffInput] = useState(false);
    const [resourceInfo, setResourceInfo] = useState(null)
    const imageInput = useRef(null);

    const onChangeInput = event => {
        const {value, name: inputName} = event.target;
        setInputValues({...inputValues, [inputName]: value});
    }

    const changeStaff = (e) => {
        setStaff({...staff, name: e.target.value});
    };

    const deleteStaff = (e) => {
        if (e.key === 'Backspace')
            setStaff({
                ...staff,
                name: "",
                userId: null
            });
    };

    const changeImageFile = () => {
        imageInput.current.click();
    };

    const handleChange = (e) => {
        setImageFile(e.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setImgSrc(reader.result);
        };
    };

    const deleteImageFile = () => {
        setImageFile(null);
        setIsUpload(false);
        imageInput.current.value = "";
        setImgSrc(null)
        setImgUrl(null)
    };

    // 이미지 람다 호출
    const getImageUrl = () => {
        // todo: 검사 다 하기
        if (staff.facilityId === null) {
            alert("책임자를 선택해주세요.");
            return;
        }
        if (imageFile !== null) { // 이미지 파일 선택했을 때
            ImageUrlAxios.get(`?ext=${imageFile.type.split("/", 2)[1]}&dir=resource`)
                .then((Response) => {
                    setImgUrl(Response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            if (resourceInfo !== null) { // 수정일 때
                editResource();
            } else {
                addResource();
            }
        }
    }

    // s3에 이미지 업로드
    const uploadImage = () => {
        axios.put(imageUrl.presignedUrl, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data' // Content-Type 헤더 설정
            }
        })
            .then(function (rep) {
                setIsUpload(true);
            })
            .catch(function (err) {
                console.log(err)
                alert("이미지 등록에 실패했습니다. 다시 시도해주세요.");
            });
    }

    useEffect(() => {
        if (imageUrl !== null && imageFile !== null)
            uploadImage();
    }, [imageUrl]);

    useEffect(() => {
        if (isUpload) {
            if (resourceInfo !== null) editResource();
            else addResource();
        }
    }, [isUpload]);

    const addResource = () => {
        AdminResourcesAxios.post(``, {
                responsibility: staff.facilityId,
                description: description,
                manufacturer: capacity,
                location: place,
                name: name,
                imgKey: imageFile === null ? null : `resource/${imageUrl.imageKey}`,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                alert("장비 등록이 완료되었습니다.");
                window.location.href = `/admin/resources`
            })
            .catch((error) => {
                basicError(error)
            });
    };

    const editResource = () => {
        AdminResourcesAxios.patch(`/${resourceId}`, {
                responsibility: staff.facilityId,
                description: description,
                manufacturer: capacity,
                location: place,
                name: name,
                imgKey: imageFile === null ? getImgKey(imageUrl) : `resource/${imageUrl.imageKey}`,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                alert("장비 수정이 완료되었습니다.");
                window.location.href = `/admin/resources/${resourceId}`
            })
            .catch((error) => {
                basicError(error)
            });
    }

    // 장비 기존 정보 호출
    const getResourceInfo = () => {
        ResourcesAxios.get(`/${resourceId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setResourceInfo(Response.data.data);
                setStaff({
                    ...staff,
                    name: Response.data.data.responsibilityName,
                    userId: Response.data.data.responsibilityId
                });
                setInputValues({
                    ...inputValues,
                    name: Response.data.data.name,
                    manufacturer: Response.data.data.manufacturer,
                    place: Response.data.data.location,
                    description: Response.data.data.description
                });
                setImgUrl(Response.data.data.imgUrl);
                setImgSrc(Response.data.data.imgUrl);
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("장비 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }
    useEffect(() => {
        if (resourceId !== undefined) {
            getResourceInfo();
        }
    }, [])

    // 책임자 리스트 검색
    const getStaffList = () => {
        UsersAxios.get(`managers?name=${staff.name}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setStaffList(Response.data.data.responsibilityList);
            })
            .catch((error) => {
                basicError(error)
            });
    };
    useEffect(() => {
        getStaffList();
    }, [staff.name]);

    return (
        <RightContainer>
            <TitleText>{resourceInfo === null ? "장비 추가" : "장비 수정"}</TitleText>

            <MarginWhiteContainer>
                <ShortColumnContainer>
                    <TitleLabel>장비명</TitleLabel>
                    <InfoInput name='name' value={name} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <ShortColumnContainer>
                    <TitleLabel>제조사</TitleLabel>
                    <InfoInput name='manufacturer' value={capacity} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <ShortColumnContainer>
                    <TitleLabel>현재위치</TitleLabel>
                    <InfoInput name='place' value={place} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <ShortColumnContainer>
                    <TitleLabel>책임자</TitleLabel>
                    <StaffInputContainer>
                        <StaffInfoInput value={staff.name}
                                        onChange={changeStaff}
                                        onKeyDown={deleteStaff}
                                        onClick={() => setIsFocusStaffInput(true)}
                                        onBlur={() => setIsFocusStaffInput(false)}/>
                        {isFocusStaffInput &&
                            <StaffSelectUl>
                                {staffList.map((staff, index) =>
                                    <StaffNameLabel key={index}
                                                    onMouseDown={() => setStaff(staff)}>{staff.name}</StaffNameLabel>
                                )}
                            </StaffSelectUl>
                        }
                    </StaffInputContainer>
                </ShortColumnContainer>

                <DescriptionContainer>
                    <TitleLabel>설명</TitleLabel>
                    <DescriptionInput name='description' value={description} onChange={onChangeInput}/>
                </DescriptionContainer>

                <ImgColumnContainer>
                    <TitleLabel>첨부사진</TitleLabel>
                    <ImageInfoContainer>
                        <PreviewImage
                            src={imageSrc ? imageSrc : EmptyImg}
                            alt="첨부사진"
                        />
                        {imageSrc !== null && <AbExitBtn onClick={deleteImageFile}>×</AbExitBtn>}
                    </ImageInfoContainer>
                    <ImageAddContainer>
                        <ImageAddButton onClick={changeImageFile}>파일선택</ImageAddButton>
                        <input type="file"
                               name="image"
                               ref={imageInput}
                               accept='.png, .jpg, image/*'
                               onChange={handleChange}
                               style={{display: "none"}}/>
                    </ImageAddContainer>
                </ImgColumnContainer>

                <AddButtonContainer>
                    <ManageAddButton onClick={getImageUrl}>
                        <ManageAddButtonImage src={SearchButtonImage}/>
                        {resourceInfo === null ? "장비 추가" : "장비 수정"}
                    </ManageAddButton>
                </AddButtonContainer>

            </MarginWhiteContainer>
        </RightContainer>
    );
}

export default ResourceManageAdd;
