import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
import OfficeBookingManageCell from "./OfficeBookingManageCell";
import { AdminBookingAxios } from "api/AxiosApi";
import styled from "styled-components";
import RangeImage from "../../../assets/images/RangeArrow.svg"
import { getToken } from "utils/IsLoginUtil";


const RangeImg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 20px;
`


function OfficeBookingManage(props) {

    const [bookingOffices, SetBookingOffices] = useState([]);

    useEffect(() => {
        getOfficesBooking();
    }, [])

    const getOfficesBooking = () => {
        AdminBookingAxios.get("offices?size=100", {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { SetBookingOffices(Response.data.data.content) })
        .catch((Error) => { alert(Error.response.data.message) })
    }

    const chnageRange = () => {
        alert("Q")
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
                                <th width="15%">회의실명</th>
                                <th width="10%">위치</th>
                                <th width="20%"><RangeImg onClick={chnageRange} src={RangeImage}/>예약일시</th>
                                <th width="10%">요청자</th>
                                <th width="15%">상태</th>
                                <th width="20%">설정</th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            {bookingOffices.map((bookingOffice, index) => 
                                <OfficeBookingManageCell 
                                    key={index} 
                                    id={bookingOffice.id}
                                    name={bookingOffice.name}  
                                    detailInfo={bookingOffice.detailInfo} 
                                    startDateTime={bookingOffice.startDateTime} 
                                    endDateTime={bookingOffice.endDateTime} 
                                    requester={bookingOffice.requester} 
                                    status={bookingOffice.status} />
                            )}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default OfficeBookingManage;