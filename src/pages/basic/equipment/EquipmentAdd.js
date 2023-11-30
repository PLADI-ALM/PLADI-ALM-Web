import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {ManageAddButton, ManageAddButtonImage} from "components/searchBar/ManageSearchBar";
import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";
import {EquipmentsAxios, ImageUrlAxios} from "api/AxiosApi";
import SearchButtonImage from "assets/images/SearchPlus.svg"
import EmptyImg from "assets/images/EmptyImg.svg"
import {ExitBtn} from "components/modal/BigModal";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getImgKey} from "utils/ImageUtil";
import {DropBox} from "components/capsule/DropBox";

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

function EquipmentManageAdd(props) {
    let {equipmentId} = useParams();

    const initialValue = {
        name: null,
        quantity: null,
        place: null,
        description: null,
        category: null
    };
    const [inputValues, setInputValues] = useState(initialValue);
    const {name, quantity, place, description, category} = inputValues;
    const [categoryOptionList, setCategoryOptionList] = useState([]);
    const [imageSrc, setImgSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImgUrl] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [equipmentInfo, setEquipmentInfo] = useState(null)
    const imageInput = useRef(null);

    const onChangeInput = event => {
        const {value, name: inputName} = event.target;
        setInputValues({...inputValues, [inputName]: value});
    }

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

    // 비품 기존 정보 호출
    const getEquipmentInfo = () => {
        EquipmentsAxios.get(`/${equipmentId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setEquipmentInfo(Response.data.data);
                setInputValues({
                    ...inputValues,
                    name: Response.data.data.name,
                    quantity: Response.data.data.quantity,
                    category: Response.data.data.category,
                    place: Response.data.data.location,
                    description: Response.data.data.description
                });
                setImgUrl(Response.data.data.imgUrl);
                setImgSrc(Response.data.data.imgUrl);
            })
            .catch((Error) => {
                basicError(Error)
                window.history.back()
            })
    }
    useEffect(() => {
        getCategoryList();
        if (equipmentId !== undefined) {
            getEquipmentInfo();
        }
    }, [])

    // 카테고리 리스트 검색
    const getCategoryList = () => {
        EquipmentsAxios.get(`categories`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                let categories = Response.data.data.categoryNames
                if (categoryOptionList.length === 0) {
                    setCategoryOptionList((prevList) => [...prevList, <option value="">선택</option>])
                    categories.map((category) =>
                        setCategoryOptionList((prevList) => [...prevList,
                            <option value={category}>{category}</option>]))
                }
            })
            .catch((error) => {
                basicError(error)
            });
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
        if (imageFile !== null && !isUpload) { // 이미지 파일 선택했을 때
            ImageUrlAxios.get(`?ext=${imageFile.type.split("/", 2)[1]}&dir=equipment`)
                .then((Response) => {
                    setImgUrl(Response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            if (equipmentInfo !== null) { // 수정일 때
                editEquipment();
            } else {
                addEquipment();
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
            if (equipmentInfo !== null) editEquipment();
            else addEquipment();
        }
    }, [isUpload]);

    const addEquipment = () => {
        EquipmentsAxios.post(``, {
                category: category,
                description: description,
                quantity: quantity,
                location: place,
                name: name,
                imgKey: imageFile === null ? null : `equipment/${imageUrl.imageKey}`,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                alert("비품 등록이 완료되었습니다.");
                window.location.href = `/equipments`
            })
            .catch((error) => {
                basicError(error)
            });
    };

    const editEquipment = () => {
        EquipmentsAxios.patch(`/${equipmentId}`, {
                category: category,
                description: description,
                quantity: quantity,
                location: place,
                name: name,
                imgKey: imageFile === null ? getImgKey(imageUrl) : `equipment/${imageUrl.imageKey}`,
            },
            {
                headers: {
                    Authorization: getToken()
                },
            })
            .then((Response) => {
                alert("비품 수정이 완료되었습니다.");
                window.location.href = `/equipments`
            })
            .catch((error) => {
                basicError(error)
            });
    }

    return (
        <RightContainer>
            <TitleText>{equipmentInfo === null ? "비품 추가" : "비품 수정"}</TitleText>

            <MarginWhiteContainer>
                <ShortColumnContainer>
                    <TitleLabel>비품명</TitleLabel>
                    <InfoInput name='name' value={name} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <ShortColumnContainer>
                    <TitleLabel>수량</TitleLabel>
                    <InfoInput name='quantity' value={quantity} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <ShortColumnContainer>
                    <TitleLabel>보관장소</TitleLabel>
                    <InfoInput name='place' value={place} onChange={onChangeInput}/>
                </ShortColumnContainer>

                <ShortColumnContainer>
                    <TitleLabel>카테고리</TitleLabel>
                    <DropBox name='category' height={"40px"} items={categoryOptionList} change={onChangeInput} color={'#E6E6E6'}/>
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
                        {equipmentInfo === null ? "비품 추가" : "비품 수정"}
                    </ManageAddButton>
                </AddButtonContainer>

            </MarginWhiteContainer>
        </RightContainer>
    );
}

export default EquipmentManageAdd;
