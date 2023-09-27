import styled from "styled-components"

// 카드 박스
export const Card = styled.ul`
    height: 300px;
    background: white;
    border-radius: 8px;
    border: 1px solid #E6E6E6;
    padding: 30px;
    margin: 20px 20px 0 20px;
`

// 카드 내 텍스트
export const CardText = styled.text`
    color: #575757;
    font-size: 18px;
`

// 카드 제목 컨테이너
export const TitleContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

// 카드명
export const NameText = styled.text`
    color: #8741CB;
    font-size: 22px;
    margin-right: 16px;
`

// 카드 하단 정보
export const DetailContainer = styled.div`
    display: flex;
`

// 이미지
export const CardImage = styled.img`
    width: 30%;
    height: 220px;
    object-fit: contain;
    margin-right: 20px;
`

// 정보 컨테이너
export const InfoContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;  
`

// 설명 컨테이너
export const DescriptionContainer = styled.div`
    display: inline-flex;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 12px;
`

// 설명 텍스트
export const OfficeContentText = styled(CardText)`
    margin-top: 10px;
    line-height: 25px;
    text-align: left;
`