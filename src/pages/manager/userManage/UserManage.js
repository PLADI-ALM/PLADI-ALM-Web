import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import {Bar, BookedTable, BookedThead, NoLineTr, TableContainer} from "../../booking/bookedList/BookedList";
import UserManageLine from "pages/manager/userManage/UserManageLine"
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import { AdminUsersAxios } from "api/AxiosApi";
import { basicError } from "utils/ErrorHandlerUtil";
import { getToken } from "utils/IsLoginUtil";
import { UserModal } from "./UserModal";

function UserManage(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [users, setUserList] = useState([])

    // 유저 목록 조회
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
        getUserList("")
    }, [])

    const searchUsers = (e) => {
        getUserList(e.target.value)
    }

    // 모달 핸들러
    const openModalHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <RightContainer>
            {isOpen ?
                <UserModal id={props.id} handler={openModalHandler} />
                : null
            }
            <TitleText>직원 관리</TitleText>
            <ManageSearchBar btnClick={openModalHandler} onEnter={searchUsers} buttonTitle="신규 직원 등록" />

            <WhiteContainer>
                <Bar />
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="10%">성명</th>
                                <th width="15%">이메일</th>
                                <th width="15%">연락처</th>
                                <th width="10%">부서</th>
                                <th width="5%">권한</th>
                                <th width="5%"></th>
                            </tr>
                        </BookedThead>
                        <tbody>
                            {users.length === 0 ?
                                <NoLineTr>
                                    <td colSpan={6}>직원이 없습니다.</td>
                                </NoLineTr>
                                : users.map((user) =>
                                    <UserManageLine
                                        key={user.id}
                                        id={user.userId}
                                        name={user.name}
                                        email={user.email}
                                        phone={user.phone}
                                        department={user.department}
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