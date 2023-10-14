import React from "react";
import { useState, useEffect } from "react";
import { RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import { Bar, BookedTable, BookedThead, TableContainer } from "../../booking/bookedList/BookedList";
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
            <TitleText>{props.title}</TitleText>
            <ManageSearchBar btnClick={openModalHandler} onEnter={searchUsers} buttonTitle="신규 직원 등록" />

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
                                        id={user.userId}
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