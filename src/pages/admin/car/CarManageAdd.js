import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {Bar} from "../../basic/myBookings/BookedList";
import {ManageAddButton, ManageAddButtonImage} from "components/searchBar/ManageSearchBar";

import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";
import {AdminResourcesAxios, ImageUrlAxios, ResourcesAxios, UsersAxios} from "api/AxiosApi";

import AddImageImage from "../../../assets/images/AddImage.svg"
import SearchButtonImage from "../../../assets/images/SearchPlus.svg"
import {ExitBtn} from "../../../components/modal/BigModal";
import axios from "axios";
import {useParams} from "react-router-dom";

const MarginWhiteContainer = styled(WhiteContainer)`
  padding: 50px;
  box-sizing: border-box;
`

const ColumnContainer = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
`

const TitleLabel = styled.label`
  color: #8741CB;
  font-size: 22px;
  width: 130px;
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
  width: 30%;
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
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: -50px 80px 0 80px;
`

const ImageAddContainer = styled.div`
  width: 112px;
  height: 40px;
  flex-shrink: 0;
  margin-left: 52px;
`

const ImageAddButton = styled.img`
  width: 100%;
  height: 100%;
`

const ImageInfoContainer = styled.div`
  width: 32%;
  height: 40px;
  border-radius: 8px;
  border: 2px solid #E6E6E6;
  display: flex;
  justify-content: space-between;
`

const ImageInfoLabel = styled.label`
  font-size: 20px;
  padding: 5px;
  margin-left: 20px;
`

function CarManageAdd(props) {

    let {resourceId} = useParams()
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [staff, setStaff] = useState({
        userId: 1,
        name: ""
    });
    const [staffList, setStaffList] = useState([]);
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUpload, setIsUpload] = useState(false);


    const [isFocusStaffInput, setIsFocusStaffInput] = useState(false);

    const [resourceInfo, setResourceInfo] = useState(null)

    const changeName = (e) => {
        setName(e.target.value);
    };

    const changePlace = (e) => {
        setPlace(e.target.value);
    };

    const changeStaff = (e) => {
        setStaff({...staff, name: e.target.value});
    };

    const changeDescription = (e) => {
        setDescription(e.target.value)
    };

    const imageInput = useRef(null);

    const changeImageFile = () => {
        imageInput.current.click();
    };

    const handleChange = (e) => {
        setImageFile(e.target.files[0])
    };

    const deleteImageFile = () => {
        setImageFile(null);
    };

    const getImageUrl = () => {
        if (resourceInfo !== null) {
            if (imageFile !== null) {
                ImageUrlAxios.get(`?ext=${imageFile.type.split("/", 2)[1]}&dir=photo`)
                    .then((Response) => {
                        setImageUrl(Response.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                editResource();
            }
        } else {
            if (imageFile !== null) {
                ImageUrlAxios.get(`?ext=${imageFile.type.split("/", 2)[1]}&dir=photo`)
                    .then((Response) => {
                        setImageUrl(Response.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                alert("이미지를 업로드해주세요.");
            }
        }
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("files", imageFile);

        axios.put(imageUrl.presignedUrl, formData)
            .then(function (rep) {
                setIsUpload(true);
            })
            .catch(function (err) {
                alert("이미지 등록에 실패했습니다. 다시 시도해주세요.");
            });
    }

    const addResource = () => {
        AdminResourcesAxios.post(``, {
                responsibility: staff.userId,
                description: description,
                location: place,
                name: name,
                imgKey: imageUrl.imgKey,
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
                responsibility: staff.userId,
                description: description,
                location: place,
                name: name,
                imgKey: imageFile === null ? imageUrl : imageUrl.imgKey,
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
                setDescription(Response.data.data.description);
                setPlace(Response.data.data.location);
                setName(Response.data.data.name);
                setImageUrl(Response.data.data.imgUrl)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("장비 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }


    const getStaffList = () => {
        UsersAxios.get(`managers?name=${staff.name}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                console.log(Response.data.data)
                setStaffList(Response.data.data.responsibilityList);
            })
            .catch((error) => {
                basicError(error)
            });
    };

    useEffect(() => {
        if (resourceId !== undefined) {
            getResourceInfo();
        }
    }, [])

    useEffect(() => {
        if (resourceInfo !== null && imageFile === null) {
            return;
        }
        if (imageUrl !== null) {
            if (staff.userId === -1) {
                alert("책임자를 선택해주세요.");
            } else {
                uploadImage();
            }
        }
    }, [imageUrl]);

    useEffect(() => {
        if (isUpload) {
            if (resourceInfo !== null) {
                editResource();
            } else {
                addResource();
            }
        }
    }, [isUpload]);

    useEffect(() => {
        getStaffList();
    }, [staff.name]);

    return (
        <RightContainer>
            <TitleText>{resourceInfo === null ? "장비 추가" : "장비 수정"}</TitleText>

            <MarginWhiteContainer>
                <ColumnContainer>
                    <TitleLabel>장비명</TitleLabel>
                    <InfoInput value={name} onChange={changeName}/>
                </ColumnContainer>

                <ColumnContainer>
                    <TitleLabel>보관장소</TitleLabel>
                    <InfoInput value={place} onChange={changePlace}/>
                </ColumnContainer>

                <ColumnContainer>
                    <TitleLabel>책임자</TitleLabel>
                    <StaffInputContainer>
                        <StaffInfoInput value={staff.name}
                                        onChange={changeStaff}
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

                </ColumnContainer>

                <DescriptionContainer>
                    <TitleLabel>설명</TitleLabel>
                    <DescriptionInput value={description} onChange={changeDescription}/>
                </DescriptionContainer>

                <ColumnContainer>
                    <TitleLabel>첨부사진</TitleLabel>
                    <ImageInfoContainer>
                        <ImageInfoLabel>{imageFile !== null ? imageFile.name : ""}</ImageInfoLabel>
                        {imageFile === null ? <></> : <ExitBtn onClick={deleteImageFile}>X</ExitBtn>}
                    </ImageInfoContainer>
                    <ImageAddContainer>
                        <ImageAddButton src={AddImageImage} onClick={changeImageFile}/>
                        <input type="file"
                               name="image"
                               ref={imageInput}
                               accept='.png, .jpg,image/*'
                               onChange={handleChange}
                               style={{display: "none"}}/>
                    </ImageAddContainer>
                </ColumnContainer>

                <AddButtonContainer>
                    <ManageAddButton onClick={getImageUrl}>
                        <ManageAddButtonImage src={SearchButtonImage}/>
                        {resourceInfo === null ? "대여 장비 추가" : "대여 장비 수정"}
                    </ManageAddButton>
                </AddButtonContainer>

            </MarginWhiteContainer>
        </RightContainer>
    );
}

export default CarManageAdd;
