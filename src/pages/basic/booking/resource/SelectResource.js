import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import SearchButtonImg from '../../../../assets/images/Search.svg'
import React, {useEffect, useRef, useState} from "react";
import ResourceInfo from "components/card/ResourceInfo";
import {ResourcesAxios} from "api/AxiosApi";
import {useNavigate} from "react-router-dom";
import {basicError} from 'utils/ErrorHandlerUtil';
import {getToken} from "../../../../utils/IsLoginUtil";
import {NoCard} from "../../../../components/card/Card";
import ImagePaddingButton from "../../../../components/button/ImagePaddingButton";
import {DropBox, TimeDropBox} from "../../../../components/capsule/DropBox";
import {TimeList} from "../../../../constants/ToggleList";
import {
    SearchBarContainer,
    SearchDateContainer,
    SearchDateInput,
    SearchTextInput,
    SearchTitleContainer,
    SearchTitleText
} from "../../../../components/searchBar/SearchBar";

function SelectResource(props) {
    const navigate = useNavigate();

    const [resourceList, setResourceList] = useState([]);
    const resourceName = useRef("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");

    useEffect(() => {
        searchResource();
    }, []);

    const changeResourceName = (e) => {
        resourceName.current = e.target.value
        searchResource()
    }

    const changeStartDate = (e) => {
        setStartDate(e.target.value)
    }

    const changeEndDate = (e) => {
        setEndDate(e.target.value)
    }

    const changeStartTime = (e) => {
        setStartTime(e.target.value)
    }

    const changeEndTime = (e) => {
        setEndTime(e.target.value)
    }

    const searchResource = () => {
        // var bookingPurpose = document.getElementById("bookingPurpose").value;
        let url = `?resourceName=${resourceName.current}`;
        if (startDate !== "" && endDate !== "")
            url = `?resourceName=${resourceName.current}&startDate=${startDate} ${startTime}&endDate=${endDate} ${endTime}`;
        ResourcesAxios.get(url,
            {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => {
                setResourceList(Response.data.data.content)
            })
            .catch((error) => {
                basicError(error)
            })
    }

    return (
        <RightContainer>
            <TitleText>장비 예약</TitleText>
            <SearchBarContainer>
                <SearchTitleContainer>
                    <SearchTitleText>예약 가능 장비 검색</SearchTitleText>
                </SearchTitleContainer>

                <SearchTextInput placeholder="장비명 검색" onChange={changeResourceName}/>

                <SearchDateContainer>
                    <SearchDateInput value={startDate} onChange={changeStartDate}/>
                    <TimeDropBox change={changeStartTime}/>
                    ~
                    <SearchDateInput value={endDate} onChange={changeEndDate}/>
                    <TimeDropBox change={changeEndTime}/>
                </SearchDateContainer>

                <ImagePaddingButton image={SearchButtonImg} width={"40px"} height={"40px"} background={"#717171"} click={searchResource}/>
            </SearchBarContainer>

            <WhiteContainer>
                <div className="cardList">
                    {resourceList.length === 0 ?
                        <NoCard>예약 가능한 장비가 없습니다.</NoCard>
                        : resourceList.map((resource, index) =>
                            <ResourceInfo key={resource.index}
                                          resourceId={resource.resourceId}
                                          name={resource.name}
                                          imgUrl={resource.imgUrl}
                                          location={resource.location}
                                          description={resource.description}/>)}
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectResource;
