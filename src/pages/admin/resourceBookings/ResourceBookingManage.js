import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../basic/myBookings/BookedList";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import ResourceBookingManageCell from "./ResourceBookingManageCell";
import { AdminBookingAxios } from "api/AxiosApi";
import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";


function ResourceBookingManage(props) {

    const [bookingResources, SetBookingResources] = useState([]);

    useEffect(() => {
        getResourceBooking();
    }, [])

    const getResourceBooking = () => {
        AdminBookingAxios.get("resources?size=100", {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { SetBookingResources(Response.data.data.content) })
        .catch((error) => {basicError(error)})
    }
    


    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>

            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="15%">장비명</th>
                                <th width="10%">보관장소</th>
                                <th width="20%">예약일시</th>
                                <th width="15%">예약자</th>
                                <th width="15%">상태</th>
                                <th width="15%">설정</th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            {bookingResources.map((bookingResource, index) => 
                                <ResourceBookingManageCell
                                    key={index}
                                    id={bookingResource.id}
                                    name={bookingResource.name}
                                    location={bookingResource.location}
                                    startDateTime={bookingResource.startDateTime}
                                    endDateTime={bookingResource.endDateTime}
                                    reservatorName={bookingResource.reservatorName}
                                    reservatorPhone={bookingResource.reservatorPhone}
                                    status={bookingResource.status}
                                    refresh={getResourceBooking} />
                            )}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
        </RightContainer>
    );
}

export default ResourceBookingManage;