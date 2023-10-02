import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import axios from "axios";
import BookedLine from './BookedLine';
import { RightContainer, WhiteContainer, TitleText } from "components/rightContainer/RightContainer";
import { BookingsAxios } from 'api/AxiosApi';
import SelectToggle from 'components/capsule/SelectToggle';
import { BookingCategoryList } from 'constants/ToggleList';

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

// 표 있는 페이지의 네이비 바
const Bar = styled.div`
    border-radius: 12px;
    height: 60px;
    width: 100%;
    background-color: #2A3042;
    box-sizing: border-box;
    position: absolute;
    top: 0;
`

// 네이비 바 밑의 테이블의 컨테이너
const TableContainer = styled.div`
    overflow-y: scroll;
`

const BookedTable = styled.table`
    border-collapse: collapse;
    height: fit-content;
    width: 100%;
    font-size: 18px;
`

const BookedThead = styled.thead`
    position: sticky;
    top: 0;
    border-radius: 12px;
    height: 60px;
    z-index: 1;
    color: white;
`

export const BookedLineTr = styled.tr`
    color: #4c4c4c;
    text-align: center;
    height: 60px;
    border-bottom: #E1E0E2 solid 1px;
`
const optionList = BookingCategoryList.map((category) => (<option>{category}</option>))

function BookedList(props) {

    const [bookings, setBookingList] = useState([]);
    const [category, setCategory] = useState("회의실");

    // 회의실 예약내역
    const getOfficeBookingList = () => {
        BookingsAxios.get("")
            .then((response) => { setBookingList(response.data.data.content) })
            .catch((error) => { alert(error) })
    }

    // 자원 예약내역
    const getResourceBookingList = () => {
        setBookingList([])
        // BookingsAxios.get("")
        //     .then((response) => { setBookingList(response.data.data.content) })
        //     .catch((error) => { alert(error) })
    }

    useEffect(() => {
        getOfficeBookingList()
    }, [])

    useEffect(() => {
        if (category === BookingCategoryList[0]) {
            getOfficeBookingList()
        } else {
            getResourceBookingList()
        }
    }, [category])

    const changeCategory = (e) => {
        setCategory(e.target.value)
    }

    return (
        <RightContainer>
            <TitleContainer>
                <TitleText>{props.title}</TitleText>
                <SelectToggle items={optionList} change={changeCategory} />
            </TitleContainer>
            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="30%">예약 항목</th>
                                <th width="30%">예약 일시</th>
                                <th width="10%">상태</th>
                                <th width="10%"></th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            {bookings.length === 0 ?
                                <BookedLineTr>
                                    <td colSpan={4}>예약 내역이 없습니다.</td>
                                </BookedLineTr>
                                : bookings.map((booking, index) =>
                                    <BookedLine key={index}
                                        id={booking.id}
                                        name={booking.name}
                                        info={booking.location}
                                        start={booking.startDateTime}
                                        end={booking.endDateTime}
                                        status={booking.status}
                                    />)}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
        </RightContainer>
    );
}

export default BookedList;