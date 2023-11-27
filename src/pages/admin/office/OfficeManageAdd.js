import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {ManageAddButton, ManageAddButtonImage} from "components/searchBar/ManageSearchBar";
import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";
import {AdminOfficesAxios, ImageUrlAxios, OfficesAxios, UsersAxios} from "api/AxiosApi";
import SearchButtonImage from "assets/images/SearchPlus.svg"
import EmptyImg from "assets/images/EmptyImg.svg"
import {ExitBtn} from "components/modal/BigModal";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getImgKey} from "../../../utils/ImageUtil";
import FacilityCapsule from "../../../components/capsule/FacilityCapsule";

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

const FacilityColumnContainer = styled(ShortColumnContainer)`
  margin-bottom: 20px;
`

const FacilityListColumnContainer = styled(ColumnContainer)`
  margin-bottom: 20px;
  margin-left: 100px;
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

const FacilityInputContainer = styled.div`
  width: 50%;
  height: 100%;
  display: block;
  z-index: 11;
  background: white;
`

const FacilityTagContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`

const FacilityInfoInput = styled(InfoInput)`
  width: 100%;
`

const FacilitySelectUl = styled.div`
  width: 100%;
  max-height: 120px;
  overflow: scroll;
  border-radius: 0 0 8px 8px;
  border: 2px solid #E6E6E6;
  padding: 10px;
  z-index: 10;
  background: white;
  margin-top: -5px;
`

const FacilityNameLabel = styled.p`
  color: #4C4C4C;
  font-size: 20px;
  text-align: left;
  z-index: 11;
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

function OfficeManageAdd(props) {
    let {officeId} = useParams();

    const initialValue = {
        name: null,
        place: null,
        capacity: null,
        description: null,
    };
    const [inputValues, setInputValues] = useState(initialValue);
    const {name, place, capacity, description} = inputValues;	//비구조화 할당
    const [selectedfacilities, setSelectedfacilities] = useState([]);
    const [facilityList, setFacilityList] = useState([]);
    const [imageSrc, setImgSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImgUrl] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [isFocusFacilityInput, setIsFocusFacilityInput] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [officeInfo, setOfficeInfo] = useState(null)
    const imageInput = useRef(null);

    const onChangeInput = event => {
        const {value, name: inputName} = event.target;
        setInputValues({...inputValues, [inputName]: value});
    }

    const changeSearchWord = (e) => {
        setSearchWord(e.target.value);
    };

    // const deleteStaff = (e) => {
    //     if (e.key === 'Backspace')
    //         setSelectedfacilities({
    //             ...selectedfacilities,
    //             name: "",
    //             facilityId: null
    //         });
    // };

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
        if (imageFile !== null) { // 이미지 파일 선택했을 때
            ImageUrlAxios.get(`?ext=${imageFile.type.split("/", 2)[1]}&dir=office`)
                .then((Response) => {
                    setImgUrl(Response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            if (officeInfo !== null) { // 수정일 때
                editOffice();
            } else {
                addOffice();
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
            if (officeInfo !== null) editOffice();
            else addOffice();
        }
    }, [isUpload]);

    const addOffice = () => {
        AdminOfficesAxios.post(``, {
                facility: selectedfacilities,
                description: description,
                capacity: capacity,
                location: place,
                name: name,
                imgKey: imageFile === null ? null : `office/${imageUrl.imageKey}`,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                alert("회의실 등록이 완료되었습니다.");
                window.location.href = `/admin/offices`
            })
            .catch((error) => {
                basicError(error)
            });
    };

    const editOffice = () => {
        AdminOfficesAxios.patch(`/${officeId}`, {
                facility: selectedfacilities,
                description: description,
                capacity: capacity,
                location: place,
                name: name,
                imgKey: imageFile === null ? getImgKey(imageUrl) : `office/${imageUrl.imageKey}`,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                alert("회의실 수정이 완료되었습니다.");
                window.location.href = `/admin/offices/${officeId}`
            })
            .catch((error) => {
                basicError(error)
            });
    }

    // 회의실 기존 정보 호출
    const getOfficeInfo = () => {
        OfficesAxios.get(`/${officeId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setOfficeInfo(Response.data.data);
                setSelectedfacilities(Response.data.data.facilityList);
                setInputValues({
                    ...inputValues,
                    name: Response.data.data.name,
                    capacity: Response.data.data.capacity,
                    place: Response.data.data.location,
                    description: Response.data.data.description
                });
                setImgUrl(Response.data.data.imgUrl);
                setImgSrc(Response.data.data.imgUrl);
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("회의실 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }
    useEffect(() => {
        if (officeId !== undefined) {
            getOfficeInfo();
        }
    }, [])

    // 책임자 리스트 검색
    const getFacilityList = () => {
        AdminOfficesAxios.get(`facilities?name=${searchWord}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setFacilityList(Response.data.data);
            })
            .catch((error) => {
                basicError(error)
            });
    };

    const addFacilityToList = (newItem) => {
        if (!selectedfacilities.includes(newItem))
            setSelectedfacilities((prevList) => [...prevList, newItem]);
    };

    const deleteFacilityToList = (facility) => {
        if (selectedfacilities.includes(facility))
            setSelectedfacilities((prevList) => prevList.filter((item) => item !== facility));
    };

    useEffect(() => {
        getFacilityList();
    }, [searchWord]);

    useEffect(() => {
        setSearchWord("")
        console.log(selectedfacilities)
    }, [selectedfacilities]);

    return (
        <RightContainer>
            <TitleText>{officeInfo === null ? "회의실 추가" : "회의실 수정"}</TitleText>

            <MarginWhiteContainer>
                <ShortColumnContainer>
                    <TitleLabel>회의실명</TitleLabel>
                    <InfoInput name='name' value={name} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <ShortColumnContainer>
                    <TitleLabel>위치</TitleLabel>
                    <InfoInput name='place' value={place} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <FacilityColumnContainer>
                    <TitleLabel>시설</TitleLabel>
                    <FacilityInputContainer>
                        <FacilityInfoInput value={searchWord}
                                           onChange={changeSearchWord}
                                           onClick={() => setIsFocusFacilityInput(true)}
                                           onBlur={() => setIsFocusFacilityInput(false)}/>
                        {isFocusFacilityInput &&
                            <FacilitySelectUl>
                                {
                                    facilityList.length === 0 ? <FacilityNameLabel
                                            onMouseDown={() => addFacilityToList(searchWord)}>'{searchWord}' 추가하기</FacilityNameLabel> :
                                    facilityList.map((facility, index) =>
                                    <FacilityNameLabel key={index}
                                                       onMouseDown={() => addFacilityToList(facility)}>{facility}</FacilityNameLabel>
                                )}
                            </FacilitySelectUl>
                        }
                    </FacilityInputContainer>
                </FacilityColumnContainer>
                {
                    selectedfacilities &&
                    <FacilityListColumnContainer>
                        <FacilityTagContainer>
                            {
                                selectedfacilities.map((facility, index) =>
                                    <FacilityCapsule text={facility} click={() => deleteFacilityToList(facility)}/>
                                )}
                        </FacilityTagContainer>
                    </FacilityListColumnContainer>
                }

                <ShortColumnContainer>
                    <TitleLabel>수용인원</TitleLabel>
                    <InfoInput name='capacity' value={capacity} onChange={onChangeInput}/>
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
                        {officeInfo === null ? "회의실 추가" : "회의실 수정"}
                    </ManageAddButton>
                </AddButtonContainer>

            </MarginWhiteContainer>
        </RightContainer>
    )
        ;
}

export default OfficeManageAdd;
