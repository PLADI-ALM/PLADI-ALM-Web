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
`

const ManageAddButton = styled.button`
    width: 15%;
    height: 100%;
    border-radius: 8px;
    background: #8741CB;
    display: flex;
    align-items: center;
`

const ManageAddButtonImage = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 12px;
    border: 1px dashed var(--gray-300, #D0D5DD);
    margin: 0 15px 0 15px
`

const ManageAddButtonLabel = styled.label`
    color: white;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
`



function ManageSearchBar(props) {
    return(
        <Container>
            <ManageSearchContainer>
                <ManageSearchImage src={SearchInputImage} />
                <ManageSearchText placeholder="이름 검색" />
            </ManageSearchContainer>
            <ManageAddButton>
                <ManageAddButtonImage src={SearchButtonImage} />
                <ManageAddButtonLabel>{props.buttonTitle}</ManageAddButtonLabel>
            </ManageAddButton>
        </Container>
    );
}

export default ManageSearchBar;