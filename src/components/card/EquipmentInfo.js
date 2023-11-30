import React, {useState} from "react";
import styled from "styled-components"
import {MiniCapsule} from "components/capsule/Capsule";
import {CardText} from "./Card";
import {MoreBtn} from "../modal/MoreModal";
import MyInfoIcon from "assets/images/sidebarIcon/MyInfoIcon.svg"
import LocationIcon from "assets/images/Location.svg"
import MoreIcon from "assets/images/triple_dot_icon_black.svg";
import EmptyImg from "assets/images/EmptyImg.svg"

// 카드 박스
export const Card = styled.div`
  height: 350px;
  width: calc(33.33% - 15px);
  background: white;
  border-radius: 8px;
  border: 1px solid #E6E6E6;
  box-sizing: border-box;
  padding: 15px;
  margin: 0 0 15px 0;
`

// 상단줄 컨테이너
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const TopGatherContainer = styled.div`
  display: flex;
  align-items: center;
`

// 비품명 컨테이너
const EquipmentNameContainer = styled.div`
  display: inline-flex;
  align-items: center;
  color: #8741CB;
  font-size: 20px;
  margin-right: 10px;
`

// 정보 컨테이너
const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`

// 이미지
const ThisImg = styled.img`
  width: 100%;
  height: 50%;
  object-fit: contain;
`

// 아이콘
const IconImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`

function EquipmentInfo(props) {
    const [isOpen, setIsOpen] = useState(false)

    const openMoreModalHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Card>
            <TopContainer>
                <TopGatherContainer>
                    <EquipmentNameContainer>{props.name}</EquipmentNameContainer>
                    <CardText>{props.quantity}개</CardText>
                </TopGatherContainer>
                <TopGatherContainer>
                    <MiniCapsule color="purple" text={props.category}/>
                    <MoreBtn src={MoreIcon} onClick={openMoreModalHandler}/>
                </TopGatherContainer>
            </TopContainer>

            <ThisImg src={props.imgUrl ? props.imgUrl : EmptyImg}/>
            <InfoContainer>
                <IconImg src={MyInfoIcon} />
                <CardText>{props.keeper}({props.contact})</CardText>
            </InfoContainer>
            <InfoContainer>
                <IconImg src={LocationIcon} />
                <CardText>{props.location}</CardText>
            </InfoContainer>

            <InfoContainer>
                <CardText>{props.description}</CardText>
            </InfoContainer>
        </Card>
    );
}

export default EquipmentInfo;