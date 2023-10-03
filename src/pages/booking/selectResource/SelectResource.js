import ImageButton from "components/button/ImageButton";
import { ResourceSearchBar, RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import SearchButtonImg from '../../../assets/images/button/searchButton.png'
import React from "react";
import styled from "styled-components";
import ResourceInfo from "components/resourceInfo/ResourceInfo";
import { DatePicker } from "components/searchBar/SearchBar";


export const SearchTitleContainer = styled.div`
    width: 15%;
    height: 40px;
    display: flex;
    border-radius: 8px;
    border: 1px solid #FFF;
    background: #FFF;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

export const SearchTitleText = styled.text`
    color: #000;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; 
    text-align: center;
`

export const SearchTextInput = styled.input`
    width: 46%;
    height: 40px;
    flex-shrink: 0;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background: #FFF;
`

export const SearchDateContainer = styled.div`
    width: 30%;
    height: 40px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #FFF;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
`
export const SearchDateInput = styled.input`
    background: none;
    font-family: NanumSquare_ac;
    font-size: 18px;
    padding: 0 10px;
    border: none;
    width: 45%;
`




function SelectResource(props) {
    return(
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ResourceSearchBar>
                <SearchTitleContainer>
                    <SearchTitleText>예약 가능 자원 검색</SearchTitleText>
                </SearchTitleContainer>

                <SearchTextInput type="text" placeholder="자원명 검색"/>
                
                <SearchDateContainer>
                    <SearchDateInput type="date"/>
                    ~
                    <SearchDateInput type="date"/>
                </SearchDateContainer>

                <ImageButton image={SearchButtonImg} width={"40px"} height={"40px"} click={props.search} />
            </ResourceSearchBar>

            <WhiteContainer>
                <div className="cardList">
                    {/* {offices.length == 0 ? <label>예약 가능한 회의실이 없습니다.</label>  : offices.map((office) => <OfficeInfo key={office.name} 
                                                         name={office.name}
                                                         location={office.location}
                                                         capacity={office.capacity}
                                                         facilityList={office.facilityList}
                                                         description={office.description}
                                                         />)} */}

                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectResource;