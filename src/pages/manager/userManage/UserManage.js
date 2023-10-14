import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
import UserManageLine from "pages/manager/userManage/UserManageLine"
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import { AdminUsersAxios } from "api/AxiosApi";
import { basicError } from "utils/ErrorHandlerUtil";
import { getToken } from "utils/IsLoginUtil";


function UserManage(props) {
    const [users, setUserList] = useState([])

    const getUserList = (word) => {
        AdminUsersAxios.get(`?name=${word}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => { setUserList(response.data.data.content) })
            .catch((error) => {
                basicError(error)
            })
    }

    useEffect(() => {
        getUserList()
    }, [])

    const searchUsers = (e) => {
        getUserList(e.target.value)
    }

    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ManageSearchBar onEnter={searchUsers} buttonTitle="신규 직원 등록" />

            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="5%">성명</th>
                                <th width="5%">직위</th>
                                <th width="15%">이메일</th>
                                <th width="10%">부서</th>
                                <th width="10%">직책</th>
                                <th width="5%">권한</th>
                                <th width="5%"></th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            {users.length === 0 ?
                                <UserManageLine>
                                    <td colSpan={4}>예약 내역이 없습니다.</td>
                                </UserManageLine>
                                : users.map((user, index) =>
                                    <UserManageLine key={index}
                                        id={user.id}
                                        name={user.name}
                                        position={user.position}
                                        email={user.email}
                                        department={user.department}
                                        officeJob={user.officeJob}
                                        role={user.role}
                                    />)}
                        </tbody>
                    </BookedTable>
                </TableContainer>
            </WhiteContainer>
        </RightContainer>
    );
}

export default UserManage;