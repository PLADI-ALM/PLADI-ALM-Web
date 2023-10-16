import React,{ useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar } from "../../booking/bookedList/BookedList";
import { ManageAddButton, ManageAddButtonImage, ManageAddButtonLabel } from "components/searchBar/ManageSearchBar";

import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";
import {AdminBookingResourceAxios, ImageUrlAxios} from "api/AxiosApi";

import AddImageImage from "../../../assets/images/AddImage.png"
import SearchButtonImage from "../../../assets/images/SearchPlus.svg"
import {ExitBtn} from "../../../components/modal/Modal";
import axios from "axios";


const NameContainer = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 120px 130px 0 80px;
`
const CategoryContainer = styled.div`
    width: 90%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 30px 80px 0px 80px;
`
const DescriptionContainer = styled.div`
    width: 90%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 60px 80px 0 80px;
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
    margin: 0 80px 0 80px;
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

const CategorySelect = styled.select`
    width: 336px;
    height: 49px;
    border-radius: 8px;
    border: 2px solid #E6E6E6;
    background: #FFF;
    margin-left: 52px;
    color: #4C4C4C;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */
    padding: 10px;
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

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [selectCategory, setSelectCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const getCategories = () => {
        AdminBookingResourceAxios.get(`/category`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { setCategories(Response.data.data.category) })
        .catch((error) => {basicError(error)})
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
                    alert(Response)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }


    const addResource = () => {
        AdminBookingResourceAxios.post(``, {
                category: selectCategory,
                description: description,
                name: name,
                imgUrl: imageUrl,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                setCategories(Response.data.data.category)
            })
            .catch((error) => {
                basicError(error)
            });
    };


    useEffect(() => {
        getCategories("");
    }, [])



    return (
       <RightContainer>
            <TitleText>{props.title}</TitleText>

            <WhiteContainer>
                <Bar />
                    <NameContainer>
                        <TitleLabel>자원명</TitleLabel>
                        <NameInput type="text" onChange={chagneName}/>
                    </NameContainer>

                    <CategoryContainer>
                        <TitleLabel>카테고리</TitleLabel>
                        <CategorySelect onChange={changeCategory}>
                            {categories.map((category, index) =>
                                <option key={index}>{category}</option>
                             )}
                        </CategorySelect>
                    </CategoryContainer>

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
