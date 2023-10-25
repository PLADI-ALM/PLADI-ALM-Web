import React,{ useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar } from "../../booking/bookedList/BookedList";
import { ManageAddButton, ManageAddButtonImage, ManageAddButtonLabel } from "components/searchBar/ManageSearchBar";

import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";
import {AdminBookingResourceAxios, ImageUrlAxios, ResourcesAxios, UsersAxios} from "api/AxiosApi";

import AddImageImage from "../../../assets/images/AddImage.svg"
import SearchButtonImage from "../../../assets/images/SearchPlus.svg"
import {ExitBtn} from "../../../components/modal/Modal";
import axios from "axios";
import {useParams} from "react-router-dom";


const NameContainer = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 90px 130px 0 80px;
`
const PlaceContainer = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 40px 80px 0px 80px;
`


const StaffContainer = styled.div`
  width: 90%;
  height: 150px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 40px 80px 0px 80px;
`


const DescriptionContainer = styled.div`
    width: 90%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 40px 80px 0 80px;
`
const ImageContainer = styled.div`
    width: 90%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 40px 80px 0 80px;
`
const AddButtonContainer = styled.div`
    width: 90%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: -50px 80px 0 80px;
`

const TitleLabel = styled.label`
    color: #8741CB;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 66.667% */
`

const NameInput = styled.input`
    width: 83%;
    height: 70%;
    border-radius: 8px;
    border: 2px solid #E6E6E6;
    background: #FFF;
    margin-left: 73px;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; 
    padding: 10px;
`

const PlaceInput = styled.input`
    width: 43%;
    height: 70%;
    border-radius: 8px;
    border: 2px solid #E6E6E6;
    background: #FFF;
    margin-left: 52px;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; 
    padding: 10px;
`

const StaffInputContainer = styled.div`
  width: 43%;
  height: 100%;
  margin-left: 73px;
  display: block;
  justify-content: start;
  align-items: start;
  margin-top: -10px;
`

const StaffInput = styled.input`
  width: 100%;
  height: 25px;
  border-radius: 8px;
  border: 2px solid #E6E6E6;
  background: #FFF;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  padding: 10px;
  z-index: 10;
`

const StaffSelectUl = styled.div`
  width: 100%;
  height: 120px;
  overflow: scroll;
  border-radius: 0px 0px 8px 8px;
  border: 2px solid #E6E6E6;
  background: #FFF;
  margin-top: -5px;
  padding: 10px;
  z-index: 1;
`
const StaffLabel = styled.p`
  color: #4C4C4C;
  font-family: NanumSquare_ac;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: start;
  z-index: 2;
`

const DescriptionInput = styled.textarea`
    width: 83%;
    height: 100%;
    border-radius: 8px;
    border: 2px solid #E6E6E6;
    background: #FFF;
    margin-left: 93px;
    margin-top: -10px;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; 
    padding: 10px;
`

const IamgeAddContainer = styled.div`
    width: 112px;
    height: 49px;
    flex-shrink: 0;
    margin-left: 52px;
    margin-top: -10px;
`

const ImageAddButton = styled.img`
    width: 100%;
    height: 100%;
`

const ImageInfoContainer = styled.div`
    width: 30%;
    height: 70%;
    border-radius: 8px;
    border: 2px solid #E6E6E6;
    background: #FFF;
    margin-left: 52px;
    margin-top: -10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const IamgeInfoLabel = styled.label`
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; 
    padding: 5px;
    margin-left: 20px;
`






function ResourceManageAdd(props) {

    let { resourceId } = useParams()
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

    const [resourceInfo, setResourceInfo] = useState([])


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
            }else {
                editResource();
            }
        }else {
            if (imageFile !== null) {
                ImageUrlAxios.get(`?ext=${imageFile.type.split("/", 2)[1]}&dir=photo`)
                    .then((Response) => {
                        setImageUrl(Response.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }else {
                alert("이미지를 업로드해주세요.");
            }
        }
    }

    const uploadImage =  () => {
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
        AdminBookingResourceAxios.post(``, {
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
                window.location.href = `/manage/resources`
            })
            .catch((error) => {
                basicError(error)
            });
    };

    const editResource = () => {


        AdminBookingResourceAxios.patch(`/${resourceId}`, {
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
                window.location.href = `/manage/resources/${resourceId}`
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
            .then((Response)=>{
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
            .catch((Error)=>{
                basicError(Error)
                console.log(Error)
                window.alert("자원 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }


    const getStaffList = () => {
        UsersAxios.get(`managers?name=${staff.name}` , {
            headers: {
                Authorization: getToken()
            }})
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
        if (isUpload ) {
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
            <TitleText>{props.title}</TitleText>

            <WhiteContainer>
                <Bar />
                    <NameContainer>
                        <TitleLabel>장비명</TitleLabel>
                        <NameInput type="text" value={name} onChange={changeName}/>
                    </NameContainer>

                    <PlaceContainer>
                        <TitleLabel>보관장소</TitleLabel>
                        <PlaceInput type="text" value={place} onChange={changePlace}/>
                    </PlaceContainer>

                    <StaffContainer >
                        <TitleLabel>책임자</TitleLabel>
                        <StaffInputContainer >
                            <StaffInput type="text" value={staff.name} onChange={changeStaff} onClick={() => setIsFocusStaffInput(true)} onBlur={() => setIsFocusStaffInput(false)} />
                            {isFocusStaffInput &&
                                <StaffSelectUl>
                                    {staffList.map((staff, index) =>
                                        <StaffLabel key={index} onMouseDown={() => setStaff(staff)}>{staff.name}</StaffLabel>
                                    )}
                                </StaffSelectUl>
                            }
                        </StaffInputContainer>

                    </StaffContainer>

                    <DescriptionContainer>
                        <TitleLabel>설명</TitleLabel>
                        <DescriptionInput type="text" value={description}  onChange={changeDescription}/>
                    </DescriptionContainer>

                    <ImageContainer>
                        <TitleLabel>첨부사진</TitleLabel>
                        <ImageInfoContainer>
                            <IamgeInfoLabel>{imageFile !== null ? imageFile.name :""
                            }</IamgeInfoLabel>
                            {imageFile===null ? <></> : <ExitBtn onClick={deleteImageFile} >X</ExitBtn>}
                        </ImageInfoContainer>
                        <IamgeAddContainer>
                            <ImageAddButton src={AddImageImage} onClick={changeImageFile} />
                            <input type="file"
                               name="image"
                               ref={imageInput}
                               accept='.png, .jpg,image/*'
                               onChange={handleChange}
                               style={{ display: "none"}}/>
                        </IamgeAddContainer>
                    </ImageContainer>

                    <AddButtonContainer>
                        <ManageAddButton onClick={getImageUrl}>
                            <ManageAddButtonImage src={SearchButtonImage} />
                            <ManageAddButtonLabel>{resourceInfo === null ? "대여 자원 추가" : "대여 자원 수정"}</ManageAddButtonLabel>
                        </ManageAddButton>
                    </AddButtonContainer>

            </WhiteContainer>
       </RightContainer>
    );
}

export default ResourceManageAdd;
