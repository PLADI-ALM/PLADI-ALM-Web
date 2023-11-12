import React, {useEffect, useState} from "react";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {Bar, BookedTable, BookedThead, TableContainer} from "../../basic/myBookings/BookedList";
import CarBookingManageCell from "./CarBookingManageCell";
import {AdminBookingAxios} from "api/AxiosApi";
import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";


function CarBookingManage(props) {

    const [carBookings, setCarBookings] = useState([]);

    useEffect(() => {
        getCarBooking();
    }, [])

    const getCarBooking = () => {
        AdminBookingAxios.get("cars", {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { setCarBookings(Response.data.data.content) })
        .catch((error) => {basicError(error)})
    }

    return (
        <RightContainer>
            <TitleText>차량 예약 관리</TitleText>

            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="15%">차량명</th>
                                <th width="10%">현재위치</th>
                                <th width="20%">예약일시</th>
                                <th width="15%">예약자</th>
                                <th width="15%">상태</th>
                                <th width="15%">설정</th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            {carBookings.map((carBooking, index) =>
                                <CarBookingManageCell
                                    key={index}
                                    id={carBooking.id}
                                    name={carBooking.name}
                                    location={carBooking.location}
                                    startDateTime={carBooking.startDateTime}
                                    endDateTime={carBooking.endDateTime}
                                    reservatorName={carBooking.reservatorName}
                                    reservatorPhone={carBooking.reservatorPhone}
                                    status={carBooking.status}
                                    refresh={getCarBooking} />
                            )}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
        </RightContainer>
    );
}

export default CarBookingManage;