import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
import ResourceManageTableCell from "./ResourceManageTableCell";
import ManageSearchBar from "components/searchBar/ManageSearchBar";


function ResourceManage(props) {

    const moveToAdd = () => {
        window.location.href = `/manage/resources/add`
    }

    return (
       <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ManageSearchBar buttonTitle="자원 추가" onClick={moveToAdd}/>

            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="20%">자원명</th>
                                <th width="20%">카테고리</th>
                                <th width="60%">설명</th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            <ResourceManageTableCell  name={"MAcBookPro"} category={"전자기기"}  description={"맥북 프로가 가지고 싶다면 이걸로 대여해서 코딩하세요"}/>
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default ResourceManage;