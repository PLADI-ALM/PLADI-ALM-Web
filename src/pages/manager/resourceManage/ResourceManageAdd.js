import React,{ useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar } from "../../booking/bookedList/BookedList";
import { ManageAddButton, ManageAddButtonImage, ManageAddButtonLabel } from "components/searchBar/ManageSearchBar";

import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";
import {AdminBookingResourceAxios, ImageUrlAxios, ResourcesAxios} from "api/AxiosApi";

import AddImageImage from "../../../assets/images/AddImage.png"
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
    width: 199px;
    height: 56px;
    flex-shrink: 0;
    margin-left: 52px;
    margin-top: -10px;
`

const ImageAddButton = styled.img`
    width: 100%;
    height: 100%;
`

const ImageInfoContainer = styled.div`
    width: 83%;
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

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [selectCategory, setSelectCategory] = useState(0);
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUpload, setIsUpload] = useState(false);

    const [isFocusStaffInput, setIsFocusStaffInput] = useState(false);

    const [resourceInfo, setResourceInfo] = useState([])

    const getCategories = () => {
        AdminBookingResourceAxios.get(`/category`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { setCategories(Response.data.data.category) })
        .catch((error) => {basicError(error)})
    };


    const focusSelectInput = () => {
        setIsFocusStaffInput(true);
        console.log(isFocusStaffInput)
    }

    const cancelFocusSelectInput = () => {
        setIsFocusStaffInput(false);
        console.log(isFocusStaffInput)
    };

    const chagneName = (e) => {
        setName(e.target.value);
    };

    const changeCategory = (e) => {
        setSelectCategory(e.target.value)
    };

    const changeDescription = (e) => {
        setDescription(e.target.value)
    };

    const imageInput = useRef(null);

    const changeImageFile = (e) => {
        imageInput.current.click();
    };

    const handleChange = (e) => {
        setImageFile(e.target.files[0])
    };

    const deleteImageFile = () => {
        setImageFile(null);
    };

    const getImageUrl = () => {
        if (imageFile !== null) {
            ImageUrlAxios.get(`?ext=${imageFile.type.split("/", 2)[1]}&dir=photo`)
                .then((Response) => {
                    setImageUrl(Response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        }else {
            alert("이미지를 업로드해주세요.")
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
                category: selectCategory,
                description: description,
                name: name,
                imgUrl: imageUrl.imgKey,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                alert("자원 등록이 완료되었습니다.");
                window.location.href = `/manage/resources`
            })
            .catch((error) => {
                basicError(error)
            });
    };

    const getResourceInfo = () => {
        ResourcesAxios.get(`/${resourceId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response)=>{
                console.log(Response.data.data);
                setResourceInfo(Response.data.data);
            })
            .catch((Error)=>{
                basicError(Error)
                console.log(Error)
                window.alert("자원 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }

    useEffect(() => {
        getCategories("");
        if (resourceId !== undefined) {
            getResourceInfo();
        }
    }, [])

    useEffect(() => {
        if (imageUrl !== null) {
            uploadImage();
        }
    }, [imageUrl]);

    useEffect(() => {
        if (isUpload) {
            addResource();
        }
    }, [isUpload]);




    return (
       <RightContainer>
            <TitleText>{props.title}</TitleText>

            <WhiteContainer>
                <Bar />
                    <NameContainer>
                        <TitleLabel>장비명</TitleLabel>
                        <NameInput type="text" value={name} onChange={chagneName}/>
                    </NameContainer>

                    <PlaceContainer>
                        <TitleLabel>보관장소</TitleLabel>
                        <PlaceInput type="text" value={name} onChange={chagneName}/>
                    </PlaceContainer>

                    <StaffContainer>
                        <TitleLabel>책임자</TitleLabel>
                        <StaffInputContainer>
                            <StaffInput type="text" value={name} onChange={chagneName} onFocus={focusSelectInput} ={cancelFocusSelectInput()}/>
                            {isFocusStaffInput && <StaffSelectUl></StaffSelectUl>}
                            {/*<StaffSelectUl style={{*/}
                            {/*    display: isFocusStaffInput ? "none" : ""*/}
                            {/*}}>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*    <StaffLabel>sdf</StaffLabel>*/}
                            {/*</StaffSelectUl>*/}
                        </StaffInputContainer>

                    </StaffContainer>

                    <DescriptionContainer>
                        <TitleLabel>설명</TitleLabel>
                        <DescriptionInput type="text"  onChange={changeDescription}/>
                    </DescriptionContainer>

                    <ImageContainer>
                        <TitleLabel>첨부사진</TitleLabel>
                        {imageFile === null ?
                        <IamgeAddContainer>
                            <ImageAddButton src={AddImageImage} onClick={changeImageFile} />
                            <input type="file"
                                   name="image"
                                   ref={imageInput}
                                   accept='.png, .jpg,image/*'
                                   onChange={handleChange}
                                   style={{ display: "none"}}/>
                        </IamgeAddContainer>
                        : <ImageInfoContainer>
                            <IamgeInfoLabel>{imageFile.name}</IamgeInfoLabel>
                                <ExitBtn onClick={deleteImageFile} >X</ExitBtn>
                          </ImageInfoContainer>
                        }
                    </ImageContainer>

                    <AddButtonContainer>
                        <ManageAddButton onClick={getImageUrl}>
                            <ManageAddButtonImage src={SearchButtonImage} />
                            <ManageAddButtonLabel>대여 자원 추가</ManageAddButtonLabel>
                        </ManageAddButton>
                    </AddButtonContainer>

            </WhiteContainer>
       </RightContainer>
    );
}

export default ResourceManageAdd;
