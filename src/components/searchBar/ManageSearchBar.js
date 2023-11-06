import React from "react";
import styled from "styled-components";
import SearchInputImage from "../../assets/images/SearchInput.svg"
import SearchButtonImage from "../../assets/images/SearchPlus.svg"
import {DropBox} from "../capsule/DropBox";

const Container = styled.div`
  background: none;
  width: 100%;
  height: 40px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ManageSearchContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #FFF;
  background: #FFF;
  margin-right: 10px;
  padding: 0 10px;
`
const ManageSearchImage = styled.img`
  width: 30px;
  height: 30px;
`

const ManageSearchText = styled.input`
  padding-left: 10px;
  font-size: 18px;
  height: 100%;
  background: none;
  border: none;
  outline: none;
`

export const ManageAddButton = styled.button`
  height: 100%;
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 8px;
  background: #8741CB;
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  font-size: 17px;
  color: white;
  white-space: nowrap;
`

export const ManageAddButtonImage = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 12px;
  border: 1px dashed var(--gray-300, #FFF);
  margin-right: 10px;
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
                <ManageSearchImage src={SearchInputImage}/>
                <ManageSearchText onKeyUp={handleOnKeyPress} placeholder="이름 검색"/>
            </ManageSearchContainer>
            {
                props.selectOptions !== null ?
                    <DropBox height={"40px"} items={props.selectOptions} change={props.onSelectedChange}/> : null
            }
            <ManageAddButton onClick={props.btnClick}>
                <ManageAddButtonImage src={SearchButtonImage}/>
                {props.buttonTitle}
            </ManageAddButton>
        </Container>
    );
}

export default ManageSearchBar;
