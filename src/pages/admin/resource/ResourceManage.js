import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import {Bar, BookedTable, BookedThead, NoLineTr, TableContainer} from "../../basic/myBookings/BookedList";
import ResourceManageTableCell from "./ResourceManageTableCell";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";
import { AdminResourcesAxios } from "api/AxiosApi";


function ResourceManage(props) {

    const [resources, setResources] = useState([]);

    const getResources = (name) => {
        const max = Int32Array.max;
        AdminResourcesAxios.get(`?keyword=${name}&size=200`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response) => { setResources(Response.data.data.content) })
        .catch((error) => {basicError(error)})
    };

    const getSearchResources = (e) => {
        getResources(e.target.value)
    };

    useEffect(() => {
        getResources("");
    }, [])

      const moveToAdd = () => {
        window.location.href = `/admin/resources/add`
    }



    return (
       <RightContainer>
            <TitleText>장비 관리</TitleText>
            <ManageSearchBar selectOptions={null} buttonTitle="장비 추가" onEnter={getSearchResources} btnClick={moveToAdd}/>
            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="20%">장비명</th>
                                <th width="10%">제조사</th>
                                <th width="15%">현재위치</th>
                                <th width="15%">책임자</th>
                                <th width="30%">설명</th>
                                <th width="8%"></th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            { resources.length === 0 ?
                            <NoLineTr>
                                <td colSpan={6}>장비 내역이 없습니다.</td>
                            </NoLineTr>
                            : resources.map((resource) =>
                                <ResourceManageTableCell
                                    key={resource.id}
                                    id={resource.id}
                                    name={resource.name}
                                    manufacturer={resource.manufacturer}
                                    location={resource.location}
                                    user={resource.responsibilityName}
                                    userPhone={resource.responsibilityPhone}
                                    description={resource.description}
                                    isEnable={resource.isActive}
                                />
                            )}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default ResourceManage;
