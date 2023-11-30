import React, {useEffect, useRef, useState} from "react";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {EquipmentsAxios} from "api/AxiosApi";
import {basicError} from 'utils/ErrorHandlerUtil';
import {getToken} from "utils/IsLoginUtil";
import {NoCard} from "components/card/Card";
import {SearchBarContainer, SearchTextInputNoMargin} from "components/searchBar/SearchBar";
import EquipmentInfo from "../../../components/card/EquipmentInfo";
import styled from "styled-components";
import SearchButtonImage from "../../../assets/images/SearchPlus.svg";
import {ManageAddButton, ManageAddButtonImage} from "../../../components/searchBar/ManageSearchBar";

const CardList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Container = styled(WhiteContainer)`
  padding: 15px;
  box-sizing: border-box;
`

function EquipmentList(props) {
    const searchWord = useRef("");
    const [equipments, setEquipments] = useState([]);

    const changeSearchWord = (e) => {
        searchWord.current = e.target.value;
        searchEquipment()
    };

    const enterSearchWord = (e) => {
        if (e.key === 'Enter') {
            searchEquipment()
        }
    };

    const searchEquipment = () => {
        EquipmentsAxios.get(`?cond=${searchWord.current}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setEquipments(Response.data.data.content)
            })
            .catch((error) => {
                basicError(error)
            })
    }

    useEffect(() => {
        searchEquipment();
    }, []);


    return (
        <RightContainer>
            <TitleText>비품 내역</TitleText>
            <SearchBarContainer>
                <SearchTextInputNoMargin placeholder="비품명 검색" onChange={changeSearchWord} onKeyUp={enterSearchWord}/>
                <ManageAddButton onClick={props.btnClick}>
                    <ManageAddButtonImage src={SearchButtonImage}/>
                    신규 비품 추가
                </ManageAddButton>
            </SearchBarContainer>
            <Container>
                <CardList className="cardList">
                    {equipments.length === 0 ? <NoCard>비품 내역이 없습니다.</NoCard> : equipments.map((equipment) =>
                        <EquipmentInfo
                            key={equipment.equipmentId}
                            equipmentId={equipment.equipmentId}
                            name={equipment.name}
                            imgUrl={equipment.imgUrl}
                            location={equipment.location}
                            keeper={equipment.keeper}
                            contact={equipment.contact}
                            quantity={equipment.quantity}
                            category={equipment.category}
                            description={equipment.description}
                        />)}
                </CardList>
            </Container>
        </RightContainer>
    );
}

export default EquipmentList;
