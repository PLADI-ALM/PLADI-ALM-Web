import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import ResourceBookingManageCell from "./ResourceBookingManageCell";
import { AdminBookingAxios } from "api/AxiosApi";


function ResourceBookingManage(props) {

    const [bookingResources, SetBookingResources] = useState([]);

    useEffect(() => {
        getResourceBooking();
    }, [])

    const getResourceBooking = () => {
        AdminBookingAxios.get("resources?size=100")
        .then((Response) => { SetBookingResources(Response.data.data.content) })
        .catch((Error) => { alert (Error.response.data.message) })
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
                                <th width="15%">자원명</th>
                                <th width="10%">카테고리</th>
                                <th width="20%">예약일자</th>
                                <th width="10%">요청자</th>
                                <th width="15%">상태</th>
                                <th width="20%">설정</th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            {bookingResources.map((bookingResource, index) => 
                                <ResourceBookingManageCell 
                                    key={index} 
                                    id={bookingResource.id}
                                    name={bookingResource.name}  
                                    category={bookingResource.category} 
                                    startDateTime={bookingResource.startDateTime} 
                                    endDateTime={bookingResource.endDateTime} 
                                    requester={bookingResource.requester} 
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