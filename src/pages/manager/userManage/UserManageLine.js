import React, { useState } from 'react';
import { BookedLineTr } from 'pages/booking/bookedList/BookedList';
import { RoleCapsule } from 'components/capsule/RoleCapsule';
import MoreIcon from 'assets/images/moreIcon.svg'
import styled from 'styled-components';
import { UserModal } from './UserModal';


const MoreBtn = styled.img`
    cursor: pointer;
    display: flex;
    margin: auto;
`

function UserManageLine(props) {
    const [isOpen, setIsOpen] = useState(false)

    const openModalHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <BookedLineTr>
                <td width="5%">{props.name}</td>
                <td width="5%">{props.position}</td>
                <td width="15%">{props.email}</td>
                <td width="10%">{props.department}</td>
                <td width="10%">{props.officeJob}</td>
                <td width="5%"><RoleCapsule role={props.role} /></td>
                <td width="5%"><MoreBtn src={MoreIcon} onClick={openModalHandler} /></td>

            </BookedLineTr>
            {isOpen ?
                <UserModal id={props.id} handler={openModalHandler} />
                : null
            }
        </>
    )
}

export default UserManageLine;