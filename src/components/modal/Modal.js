import styled from 'styled-components';

// Modal이 떴을 때의 배경
export const ModalBackdrop = styled.div`
    z-index: 1; //위치지정 요소
    position: fixed;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color: rgba(0,0,0,0.4);
    top : 0;
    left : 0;
    right : 0;
    bottom : 0;
`

// Modal창
export const ModalView = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    width: 500px;
    background-color: #ffffff;
    padding: 30px 50px;
    box-sizing: border-box;
`

export const TitleContainer = styled.div`
    width: 100%;
    display : flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`

export const ModalTitle = styled.h2`
    color: #8741CB;
    margin: 0;
`

export const ExitBtn = styled.button`
    background: none;
    width: 40px;
    height: 40px;
    font-family: NanumSquare_ac;
    font-size: 40px;
    border: none;
    color: #4C4C4C;
    cursor: pointer;
    display : flex;
    justify-content : center;
    align-items : center;
`

export const AttrsContainer = styled.div`
    width: 100%;
`

export const AttrContainer = styled.div`
    display : flex;
    align-items: center;
    margin-bottom: 20px;
`

export const AttrLabel = styled.div`
    width: 120px;
    font-size: 20px;
    text-align: left;
    line-height: 40px;
`

export const AttrInput = styled.input`
    border: 2px solid #E6E6E6;
    border-radius: 10px;
    height: 35px;
    width: 280px;
    font-family: NanumSquare_ac;
    font-size: 18px;
    color: #757575;
    padding: 0 10px;
    outline: none;
    box-sizing: border-box;
`