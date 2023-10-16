import ImageButton from "components/button/ImageButton";
import { ResourceSearchBar, RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import SearchButtonImg from '../../../assets/images/button/searchButton.png'
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ResourceInfo from "components/resourceInfo/ResourceInfo";
import { ResourcesAxios } from "api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { basicError } from 'utils/ErrorHandlerUtil';


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
    padding-left: 10px;
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
    const navigate = useNavigate();

    const [resourceList, setResourceList] = useState([]);
    const [resourceName, setResourceName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getResourceList = () => {
        ResourcesAxios.get()
            .then((Response) => { setResourceList(Response.data.data.content) })
            .catch((error) => {basicError(error)})
    };


    useEffect(() => {
        getResourceList();
    }, []);

    const changeResourceName = (e) => {
        setResourceName(e.target.value)
    }

    const changeStartDate = (e) => {
        setStartDate(e.target.value)
    }

    const changeEndDate = (e) => {
        setEndDate(e.target.value)
    }

    const searchResource = () => {
        ResourcesAxios.get(`?resourceName=${resourceName}&startDate=${startDate}&endDate=${endDate}`)
            .then((Response) => { setResourceList(Response.data.data.content) })
            .catch((error) => {basicError(error)})
    }


    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ResourceSearchBar>
                <SearchTitleContainer>
                    <SearchTitleText>예약 가능 자원 검색</SearchTitleText>
                </SearchTitleContainer>

                <SearchTextInput type="text" placeholder="자원명 검색" onChange={changeResourceName} />

                <SearchDateContainer>
                    <SearchDateInput type="date" onChange={changeStartDate} />
                    ~
                    <SearchDateInput type="date" onChange={changeEndDate} />
                </SearchDateContainer>

                <ImageButton image={SearchButtonImg} width={"40px"} height={"40px"} click={searchResource} />
            </ResourceSearchBar>

            <WhiteContainer>
                <div className="cardList">
                    {resourceList.length === 0 ? <label>예약 가능한 자원이 없습니다.</label> : resourceList.map((resource, index) => <ResourceInfo key={resource.index} detail={true} resourceId={resource.resourceId} name={resource.name} imgUrl={resource.imgUrl} category={resource.category} description={resource.description} />)}
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectResource;
