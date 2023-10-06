import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../bookedList/BookedList";
import OfficeManageTableCell from "./OfficeManageTableCell";


function OfficeManage(props) {


    return (
       <RightContainer>
            <TitleText>{props.title}</TitleText>

            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="20%">회의실명</th>
                                <th width="20%">위치</th>
                                <th width="20%">수용인원</th>
                                <th width="40%">설명</th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            <OfficeManageTableCell  name={"회의실1"} location={"S1350"} capacity={"7"} description={"분명 추석 연휴가 긴 줄 알았는데 눈깜빡하니까 학교가겠"}/>
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default OfficeManage;