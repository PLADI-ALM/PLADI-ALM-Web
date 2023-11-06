import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import BookedLine from './BookedLine';
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {BookingsAxios} from 'api/AxiosApi';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

// 표 있는 페이지의 네이비 바
export const Bar = styled.div`
    border-radius: 12px;
    height: 60px;
    width: 100%;
    background-color: #2A3042;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 1;
`

// 네이비 바 밑의 테이블의 컨테이너
export const TableContainer = styled.div`
    overflow-y: scroll;
`

export const BookedTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 18px;
  position: absolute;
  top: 0;
`

export const BookedThead = styled.thead`
    position: sticky;
    top: 0;
    border-radius: 12px;
    height: 60px;
    z-index: 2;
    color: white;
`

export const BookedLineTr = styled.tr`
    color: #4c4c4c;
    text-align: center;
    height: 60px;
  max-height: 60px;
    border-bottom: #E1E0E2 solid 1px;
`

export const NoLineTr = styled.tr`
  color: #4c4c4c;
  text-align: center;
  height: 60px;
  border-bottom: #E1E0E2 solid 1px;
`

function BookedList(props) {

    const [bookings, setBookingList] = useState([])

    // 예약내역
    const getBookingList = () => {
        BookingsAxios.get(`${props.type}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => { setBookingList(response.data.data.content) })
            .catch((error) => {
                basicError(error)
            })
    }

    useEffect(() => {
        getBookingList()
    }, [props.type])

    return (
        <RightContainer>
            <TitleContainer>
                <TitleText>{props.title}</TitleText>
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
                                <NoLineTr>
                                    <td colSpan={4}>예약 내역이 없습니다.</td>
                                </NoLineTr>
                                : bookings.map((booking) =>
                                    <BookedLine key={booking.id}
                                        id={booking.id}
                                        name={booking.name}
                                        info={booking.detailInfo}
                                        start={booking.startDateTime}
                                        end={booking.endDateTime}
                                        status={booking.status}
                                        type={props.type}
                                    />)}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
        </RightContainer>
    );
}

export default BookedList;