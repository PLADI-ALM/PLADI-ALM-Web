import React, {useEffect, useState} from "react";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {Bar, BookedTable, BookedThead, NoLineTr, TableContainer} from "pages/basic/myBookings/BookedList";
import CarManageTableCell from "./CarManageTableCell";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";
import {AdminCarsAxios} from "api/AxiosApi";

function CarManage(props) {

    const [cars, setCars] = useState([]);

    const getCars = (name) => {
        AdminCarsAxios.get(`?keyword=${name}`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { setCars(Response.data.data.content) })
        .catch((error) => {basicError(error)})
    };

    const searchCars = (e) => {
        getCars(e.target.value)
    };

    useEffect(() => {
        getCars("");
    }, [])

      const moveToAdd = () => {
        window.location.href = `/admin/cars/add`
    }

    return (
       <RightContainer>
            <TitleText>차량 관리</TitleText>
            <ManageSearchBar selectOptions={null} buttonTitle="차량 추가" onEnter={searchCars} btnClick={moveToAdd}/>
            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="15%">차량명</th>
                                <th width="10%">제조사</th>
                                <th width="10%">현재위치</th>
                                <th width="15%">책임자</th>
                                <th width="30%">설명</th>
                                <th width="8%"></th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            { cars.length === 0 ?
                            <NoLineTr>
                                <td colSpan={6}>차량 내역이 없습니다.</td>
                            </NoLineTr>
                            : cars.map((car) =>
                                <CarManageTableCell
                                    key={car.carId}
                                    id={car.carId}
                                    name={car.name}
                                    manufacturer={car.manufacturer}
                                    location={car.location}
                                    user={car.responsibilityName}
                                    userPhone={car.responsibilityPhone}
                                    description={car.description}
                                    isEnable={car.isActive}
                                />
                            )}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default CarManage;
