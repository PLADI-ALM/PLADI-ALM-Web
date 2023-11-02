import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import {Bar, BookedTable, BookedThead, NoLineTr, TableContainer} from "../../basic/myBookings/BookedList";
import ResourceManageTableCell from "./ResourceManageTableCell";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";
import { AdminBookingResourceAxios } from "api/AxiosApi";


function ResourceManage(props) {

    const [resources, setResources] = useState([]);

    const getResources = (name) => {
        const max = Int32Array.max;
        AdminBookingResourceAxios.get(`?keyword=${name}&size=200`, {
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
            <TitleText>{props.title}</TitleText>
            <ManageSearchBar selectOptions={null} buttonTitle="장비 추가" onEnter={getSearchResources} btnClick={moveToAdd}/>
            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="20%">장비명</th>
                                <th width="15%">보관장소</th>
                                <th width="20%">책임자</th>
                                <th width="30%">설명</th>
                                <th width="8%"></th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            { resources.length === 0 ?
                            <NoLineTr>
                                <td colSpan={5}>장비 내역이 없습니다.</td>
                            </NoLineTr>
                            : resources.map((resource) =>
                                <ResourceManageTableCell
                                    key={resource.resourceId}
                                    id={resource.resourceId}
                                    name={resource.name}
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
