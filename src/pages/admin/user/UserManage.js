import React, {useEffect, useRef, useState} from "react";
import {RightContainer, TitleText, WhiteContainer} from "components/rightContainer/RightContainer";
import {Bar, BookedTable, BookedThead, NoLineTr, TableContainer} from "../../basic/myBookings/BookedList";
import UserManageLine from "pages/admin/user/UserManageLine"
import ManageSearchBar from "components/searchBar/ManageSearchBar";
import {AdminUsersAxios} from "api/AxiosApi";
import {basicError} from "utils/ErrorHandlerUtil";
import {getToken} from "utils/IsLoginUtil";
import {UserModal} from "../../../components/modal/UserModal";
import {AffiliationList} from "../../../constants/ToggleList";
import styled from "styled-components";

const UserNumDiv = styled.div`
  text-align: left;
  margin-bottom: 10px;
  margin-left: 5px;
`

function UserManage(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [users, setUserList] = useState([])
    const [userNum, setUserNum] = useState(0)
    const [departmentOptionList, setDepartmentOptionList] = useState([]);
    const [affiliationOptionList, setAffiliationOptionList] = useState([]);
    const currentAffiliation = useRef("");
    const currentDepartment = useRef("");
    const currentSearchWord = useRef("");
    let departments;

    // 유저 목록 조회
    const getUserList = (word, affiliation, department) => {
        AdminUsersAxios.get(`?name=${word}&affiliation=${affiliation}&department=${department}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                setUserList(response.data.data.content);
                setUserNum(response.data.data.totalElements)
            })
            .catch((error) => {
                basicError(error)
            })
    }

    // 부서 리스트
    function getDepartmentList() {
        AdminUsersAxios.get("/departments", {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                departments = response.data.data.departmentList
                if (departmentOptionList.length === 0) {
                    departmentOptionList.push(<option value="">부서</option>)
                    departments.map((department) =>
                        departmentOptionList.push(<option value={department}>{department}</option>))
                }
            })
            .catch((error) => {
                basicError(error)
            })
    }

    useEffect(() => {
        getUserList("", "", "")
    }, [])

    useEffect(() => {
        getDepartmentList()
        // 소속 드롭박스 초기 구성
        if (affiliationOptionList.length === 0) {
            affiliationOptionList.push(<option value="">소속</option>)
            AffiliationList.map((affiliation) =>
                affiliationOptionList.push(<option value={affiliation}>{affiliation}</option>))
        }
    }, [])

    const searchUsers = (e) => {
        currentSearchWord.current = e.target.value
        getUserList(currentSearchWord.current, currentAffiliation.current, currentDepartment.current)
    }

    // 소속 드롭박스 변경
    const onSelectedAffiliationChange = (e) => {
        currentAffiliation.current = e.target.value
        getUserList(currentSearchWord.current, currentAffiliation.current, currentDepartment.current)
    }

    // 부서 드롭박스 변경
    const onSelectedDepartmentChange = (e) => {
        currentDepartment.current = e.target.value
        getUserList(currentSearchWord.current, currentAffiliation.current, currentDepartment.current)
    }

    // 모달 핸들러
    const openModalHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <RightContainer>
            {isOpen ?
                <UserModal id={props.id} handler={openModalHandler} title={"신규 직원 등록"}/>
                : null
            }
            <TitleText>직원 관리</TitleText>
            <ManageSearchBar selectOptions={[affiliationOptionList, departmentOptionList]} onSelectedChange={[onSelectedAffiliationChange, onSelectedDepartmentChange]}
                             btnClick={openModalHandler} onEnter={searchUsers} buttonTitle="신규 직원 등록"/>
            <UserNumDiv>검색 인원: {userNum}명</UserNumDiv>
            <WhiteContainer>
                <Bar/>
                <TableContainer>
                    <BookedTable>
                        <BookedThead>
                            <tr>
                                <th width="7%">성명</th>
                                <th width="17%">이메일</th>
                                <th width="10%">연락처</th>
                                <th width="10%">부여자산</th>
                                <th width="10%">소속</th>
                                <th width="10%">부서</th>
                                <th width="5%">권한</th>
                                <th width="3%"></th>
                            </tr>
                        </BookedThead>
                        <tbody>
                        {users.length === 0 ?
                            <NoLineTr>
                                <td colSpan={8}>직원이 없습니다.</td>
                            </NoLineTr>
                            : users.map((user) =>
                                <UserManageLine
                                    key={user.userId}
                                    id={user.userId}
                                    name={user.name}
                                    email={user.email}
                                    asset={user.asserts}
                                    phone={user.phone}
                                    affiliation={user.affiliation}
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