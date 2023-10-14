import React from "react";
import styled from "styled-components";
import SearchInputImage from "../../assets/images/SearchInput.svg"
import SearchButtonImage from "../../assets/images/SearchPlus.svg"

const Container = styled.div`
    background: none;
    width: 100%;
    height: 50px;
    display: inline-flex;
    align-items: center;
    margin-bottom: 20px;
`

const ManageSearchContainer = styled.div`
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #FFF;
    background: #FFF;
    margin-right: 20px;
    padding: 0 10px;
`
const ManageSearchImage = styled.img`
    width: 30px;
    height: 30px;
`

const ManageSearchText = styled.input`
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
`

const ManageSearchButton = styled.button`
    width: 160px;
    height: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #8741CB;
    display: flex;
    align-items: center;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    cursor: pointer;
`

const ManageSearchButtonImage = styled.img`
    width: 16px;
    height: 16px;
    border-radius: 12px;
    border: 1px dashed var(--gray-300, #D0D5DD);
    margin: 0 5px;
`

const ManageSearchButtonLabel = styled.text`
    margin: auto;
    color: white;
    font-size: 17px;
    font-family: NanumSquare_ac;
`

function ManageSearchBar(props) {

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            props.onEnter(e) // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    return (
        <Container>
            <ManageSearchContainer>
                <ManageSearchImage src={SearchInputImage} />
                <ManageSearchText onKeyUp={handleOnKeyPress} placeholder="이름 검색" />
            </ManageSearchContainer>
            <ManageSearchButton>
                <ManageSearchButtonImage src={SearchButtonImage} />
                <ManageSearchButtonLabel>{props.buttonTitle}</ManageSearchButtonLabel>
            </ManageSearchButton>
        </Container>
    );
}

export default ManageSearchBar;