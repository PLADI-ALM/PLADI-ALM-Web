import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import ResourceBookingManageCell from "./ResourceBookingManageCell";


function ResourceBookingManage(props) {


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
                            <ResourceBookingManageCell name="Macbook Air"  detailInfo="전자기기" startDateTime="2023.10.01" endDate="2023.10.02" human="김초원(대리)" status="예약대기"  description="허가 | 반려 | 상세보기"/>
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default ResourceBookingManage;