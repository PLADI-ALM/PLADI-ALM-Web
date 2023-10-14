import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
import ResourceManageTableCell from "./ResourceManageTableCell";
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import { getToken } from "utils/IsLoginUtil";
import { basicError } from "utils/ErrorHandlerUtil";
import { AdminBookingResourceAxios } from "api/AxiosApi";


function ResourceManage(props) {

    const [resources, setResources] = useState([]);

    const getResources = (name) => {
        AdminBookingResourceAxios.get(`?keyword=${name}`, {
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
        window.location.href = `/manage/resources/add`
    }



    return (
       <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ManageSearchBar buttonTitle="자원 추가" onEnter={getSearchResources} btnClick={moveToAdd}/>
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
                            { resources.length === 0 ? 
                            <ResourceManageTableCell>
                                <td colSpan={4}>자원 내역이 없습니다.</td>
                            </ResourceManageTableCell>
                            : resources.map((resource) => 
                                <ResourceManageTableCell key={resource.resourceId} id={resource.resourceId}  name={resource.name} category={resource.category} description={resource.description}/>
                            )}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
       </RightContainer>
    );
}

export default ResourceManage;