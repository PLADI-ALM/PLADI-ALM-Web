import styled from "styled-components"

// 오른쪽 보라색 화면
export const RightContainer = styled.div`
    max-height: 100vh;
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
`

// 오른쪽 하얀색 박스
export const WhiteContainer = styled.div`
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
    overflow-y: scroll;
    display: grid;
    height: 100%;
    width: 100%;
    position: relative;
`

// 페이지 제목
export const TitleText = styled.text`
    color: #4C4C4C;
    font-size: 30px;
    font-weight: bold;
    line-height: 30px;
    text-align: left;
    margin-bottom: 20px;
    margin-left: 10px;
`

//예약 검색 컨테이너
export const ResourceSearchBar = styled.div`
    background: none;
    width: 100%;
    height: 50px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`