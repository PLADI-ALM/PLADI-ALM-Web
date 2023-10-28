import React, {useState} from 'react';
import {BookedLineTr} from 'pages/booking/bookedList/BookedList';
import {RoleCapsule} from 'components/capsule/RoleCapsule';
import MoreIcon from 'assets/images/moreIcon.svg'
import {UserMoreModal} from "./UserMoreModal";
import {MoreBtn} from "../../../components/modal/MoreModal";


function UserManageLine(props) {
    const [isOpen, setIsOpen] = useState(false)

    const openModalHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <BookedLineTr>
            <td width="10%">{props.name}</td>
            <td width="15%">{props.email}</td>
            <td width="15%">{props.phone}</td>
            <td width="10%">{props.department}</td>
            <td width="5%"><RoleCapsule role={props.role}/></td>
            <td width="5%"><MoreBtn src={MoreIcon} onClick={openModalHandler}/>
                {isOpen ?
                    <UserMoreModal id={props.id} handler={openModalHandler}/>
                    : null
                }
            </td>
        </BookedLineTr>
    )
}

export default UserManageLine;