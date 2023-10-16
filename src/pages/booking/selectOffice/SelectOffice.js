import React, { useEffect } from "react";
import SearchBar from "components/searchBar/SearchBar";
import OfficeInfo from "components/officeInfo/OfficeInfo";
import {RightContainer, WhiteContainer, TitleText, ResourceSearchBar} from "components/rightContainer/RightContainer";
import { OfficesAxios } from "api/AxiosApi";
import { useState } from "react";
import { basicError } from 'utils/ErrorHandlerUtil';
import { SearchDateContainer, SearchDateInput, SearchTextInput, SearchTitleContainer, SearchTitleText} from "../selectResource/SelectResource";
import SearchButtonImg from "../../../assets/images/button/searchButton.png";
import ImageButton from "../../../components/button/ImageButton";
import {SelectToggle} from "../../../components/capsule/SelectToggle";
import {TimeList} from "../../../constants/ToggleList";

function SelectOffice(props) {

    const timeOptionList = TimeList.map((time) => (<option>{time}</option>))

    const [offices, setOffices] = useState([]);
    const [facilityName, setFacilityName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const getOfficeList = () => {
        OfficesAxios.get("")
            .then((Response) => { setOffices(Response.data.data.content) })
            .catch((error) => {basicError(error)})
    };

    const changeFacilityName = (e) => {
        setFacilityName(e.target.value);
    };

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    const changeStart = (e) => {
        setStartTime(e.target.value)
    }

    const changeEnd = (e) => {
        setEndTime(e.target.value)
    }

    const searchOffice = () => {
        OfficesAxios.get(`?date=${date}&startTime=${startTime}&endTime=${endTime}&facilityName=${facilityName}`)
            .then((Response) => { setOffices(Response.data.data.content) })
            .catch((error) => {basicError(error)})
    }

    useEffect(() => {
        getOfficeList();
    }, []);


    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ResourceSearchBar>
                <SearchTitleContainer>
                    <SearchTitleText>예약 가능 회의실 검색</SearchTitleText>
                </SearchTitleContainer>

                <SearchTextInput type="text" placeholder="시설 검색" onChange={changeFacilityName} />

                <SearchDateContainer>
                    <SearchDateInput type="date" onChange={changeDate} />
                    <SelectToggle items={timeOptionList} change={changeStart} />~
                    <SelectToggle items={timeOptionList} change={changeEnd} />
                </SearchDateContainer>
                <ImageButton image={SearchButtonImg} width={"40px"} height={"40px"} click={searchOffice} />
            </ResourceSearchBar>
            <WhiteContainer>
                <div className="cardList">
                    {offices.length === 0 ? <label>예약 가능한 회의실이 없습니다.</label> : offices.map((office) => <OfficeInfo key={office.officeId}
                        officeId={office.officeId}
                        name={office.name}
                        imgUrl={office.imgUrl}
                        location={office.location}
                        capacity={office.capacity}
                        facilityList={office.facilityList}
                        description={office.description}
                    />)}
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectOffice;
