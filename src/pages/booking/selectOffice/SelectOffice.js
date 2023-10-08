import React, { useEffect } from "react";
import SearchBar from "components/searchBar/SearchBar";
import OfficeInfo from "components/officeInfo/OfficeInfo";
import { RightContainer, WhiteContainer, TitleText } from "components/rightContainer/RightContainer";
import { OfficesAxios } from "api/AxiosApi";
import { useState } from "react";

function SelectOffice(props) {

    const [offices, setOffices] = useState([]);
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const getOfficeList = () => {
        OfficesAxios.get("")
            .then((Response) => { setOffices(Response.data.data.content) })
            .catch((Error) => { alert(Error) })
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
        OfficesAxios.get("?date=" + date + "&startTime=" + startTime + "&endTime=" + endTime)
            .then((Response) => { setOffices(Response.data.data.content) })
            .catch((Error) => { alert(Error) })
    }

    useEffect(() => {
        getOfficeList();
    }, []);


    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <WhiteContainer>
                <SearchBar changeDate={changeDate} changeStart={changeStart} changeEnd={changeEnd} search={searchOffice} />
                <div className="cardList">
                    {offices.length === 0 ? <label>예약 가능한 회의실이 없습니다.</label> : offices.map((office) => <OfficeInfo key={office.officeId}
                        officeId={office.officeId}
                        name={office.name}
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