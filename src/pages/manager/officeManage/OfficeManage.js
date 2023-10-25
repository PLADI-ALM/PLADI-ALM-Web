import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
import OfficeManageTableCell from "./OfficeManageTableCell";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";
import { OfficesAxios } from "api/AxiosApi";

function OfficeManage(props) {

    const [offices, setOffices] = useState([]);

    const getOffices = (name) => {
        const max = Int32Array.max;
        OfficesAxios.get(`?keyword=${name}&size=200`,{
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { setOffices(Response.data.data.content) })
        .catch((error) => {basicError(error)})
    };

    const getSearchOffices = (e) => {
        getOffices(e.target.value)
    };

    useEffect(() => {
        getOffices();
    }, [])

      const moveToAdd = () => {
        window.location.href = `/manage/offices/add`
    }


    return (
       <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ManageSearchBar buttonTitle="회의실 추가" onEnter={getSearchOffices} btnClick={moveToAdd}/>

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
                            { offices.length === 0 ?
                            <OfficeManageTableCell>
                                <td colSpan={5}>회의실 내역이 없습니다.</td>
                            </OfficeManageTableCell>
                            : offices.map((office) =>
                                <OfficeManageTableCell
                                    id={office.officeId}
                                    name={office.name} 
                                    location={office.location} 
                                    capacity={office.capacity} 
                                    description={office.description}
                                />
                            )}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default OfficeManage;