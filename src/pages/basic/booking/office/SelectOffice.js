import React, {useEffect, useRef, useState} from "react";
import OfficeInfo from "components/card/OfficeInfo";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {OfficesAxios} from "api/AxiosApi";
import {basicError} from 'utils/ErrorHandlerUtil';
import SearchButtonImg from "../../../../assets/images/Search.svg";
import {DropBox, TimeDropBox} from "../../../../components/capsule/DropBox";
import {TimeList} from "../../../../constants/ToggleList";
import {getToken} from "../../../../utils/IsLoginUtil";
import {NoCard} from "../../../../components/card/Card";
import ImagePaddingButton from "../../../../components/button/ImagePaddingButton";
import {
    SearchBarContainer,
    SearchDateContainer,
    SearchDateInput,
    SearchTextInput,
    SearchTitleContainer,
    SearchTitleText
} from "../../../../components/searchBar/SearchBar";

function SelectOffice(props) {
    const [offices, setOffices] = useState([]);
    const facilityName = useRef("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");

    const changeFacilityName = (e) => {
        facilityName.current = e.target.value;
    };
    const enterFacilityName = (e) => {
        if (e.key === 'Enter') {
            searchOffice()
        }
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
        let url = `?facilityName=${facilityName.current}`
        if (date !== "")
            url = `?facilityName=${facilityName.current}&date=${date}&startTime=${startTime}&endTime=${endTime}`
        OfficesAxios.get(url, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setOffices(Response.data.data.content)
            })
            .catch((error) => {
                basicError(error)
            })
    }

    useEffect(() => {
        searchOffice();
    }, []);


    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <SearchBarContainer>
                <SearchTitleContainer>
                    <SearchTitleText>예약 가능 회의실 검색</SearchTitleText>
                </SearchTitleContainer>

                <SearchTextInput placeholder="시설 검색" onChange={changeFacilityName} onKeyUp={enterFacilityName}/>

                <SearchDateContainer>
                    <SearchDateInput onChange={changeDate}/>
                    <TimeDropBox change={changeStart}/>~
                    <TimeDropBox change={changeEnd}/>
                </SearchDateContainer>
                <ImagePaddingButton image={SearchButtonImg} width={"40px"} height={"40px"} background={"#717171"}
                                    click={searchOffice}/>
            </SearchBarContainer>
            <WhiteContainer>
                <div className="cardList">
                    {offices.length === 0 ? <NoCard>예약 가능한 회의실이 없습니다.</NoCard> : offices.map((office) => <OfficeInfo
                        key={office.officeId}
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
