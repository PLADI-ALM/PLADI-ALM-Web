import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import SearchButtonImg from 'assets/images/Search.svg'
import React, {useEffect, useRef, useState} from "react";
import ResourceInfo from "components/card/ResourceInfo";
import {CarsAxios} from "api/AxiosApi";
import {basicError} from 'utils/ErrorHandlerUtil';
import {getToken} from "utils/IsLoginUtil";
import {NoCard} from "components/card/Card";
import ImagePaddingButton from "components/button/ImagePaddingButton";
import {TimeDropBox} from "components/capsule/DropBox";
import {
    SearchBarContainer,
    SearchDateContainer,
    SearchDateInput,
    SearchTextInput,
    SearchTitleContainer,
    SearchTitleText
} from "components/searchBar/SearchBar";

function SelectCar(props) {

    const [carList, setCarList] = useState([]);
    const carName = useRef("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");

    useEffect(() => {
        searchCar();
    }, []);

    const changeCarName = (e) => {
        carName.current = e.target.value
        searchCar()
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

    const searchCar = () => {
        let url = `?carName=${carName.current}`;
        if (startDate !== "" && endDate !== "")
            url = `?carName=${carName.current}&startDate=${startDate} ${startTime}&endDate=${endDate} ${endTime}`;
        CarsAxios.get(url,
            {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => {
                setCarList(Response.data.data.content)
            })
            .catch((error) => {
                basicError(error)
            })
    }

    return (
        <RightContainer>
            <TitleText>차량 예약</TitleText>
            <SearchBarContainer>
                <SearchTitleContainer>
                    <SearchTitleText>예약 가능 차량 검색</SearchTitleText>
                </SearchTitleContainer>

                <SearchTextInput placeholder="차량명 검색" onChange={changeCarName}/>

                <SearchDateContainer>
                    <SearchDateInput value={startDate} onChange={changeStartDate}/>
                    <TimeDropBox change={changeStartTime}/>
                    ~
                    <SearchDateInput value={endDate} onChange={changeEndDate}/>
                    <TimeDropBox change={changeEndTime}/>
                </SearchDateContainer>

                <ImagePaddingButton image={SearchButtonImg} width={"40px"} height={"40px"} background={"#717171"}
                                    click={searchCar}/>
            </SearchBarContainer>

            <WhiteContainer>
                <div className="cardList">
                    {carList.length === 0 ?
                        <NoCard>예약 가능한 차량이 없습니다.</NoCard>
                        : carList.map((car) =>
                            <ResourceInfo key={car.carId}
                                          id={car.carId}
                                          name={car.name}
                                          imgUrl={car.imgUrl}
                                          location={car.location}
                                          description={car.description}
                                          type='car'/>)}
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectCar;
