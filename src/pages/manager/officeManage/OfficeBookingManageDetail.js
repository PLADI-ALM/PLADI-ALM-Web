import React from 'react';
import { OfficesAxios, AdminBookingOfficeAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import { basicError } from 'utils/ErrorHandlerUtil';
import { Bar } from 'pages/booking/bookedList/BookedList';
import { RightContainer, WhiteContainer,TitleText } from 'components/rightContainer/RightContainer';
import { MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { getToken } from 'utils/IsLoginUtil';
import MoreButtonIcon from "../../../assets/images/button/triple_dot_icon.svg"
import { MoreButton, OptionButton, OptionsView, InfoTable, InfoTableData } from '../resourceManage/ResourceManageDetail';
import OfficeInfo from 'components/officeInfo/OfficeInfo';

function OfficeManageDetail() {
    let { officeId } = useParams()

    const [isShowingOptions, setOptionViewShowing] = useState(false)
    const [officeInfo, setOfficeInfo] = useState([])
    const [bookingsInfo, setBookingsInfo] = useState([])

    const getResourceInfo = () => {
        OfficesAxios.get(`/${officeId}`)
        .then((Response)=>{ setOfficeInfo(Response.data.data) })
        .catch((Error)=>{ 
            basicError(Error) 
            console.log(Error)
            window.alert("회의실 정보를 불러올 수 없습니댜.")
            window.history.back()
        })
    }

    const getResourceBookingListInfo = () => {
        AdminBookingOfficeAxios.get(`offices/${officeId}`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response)=>{ 
            setBookingsInfo(Response.data.data.officesLists) 
            console.log(Response.data.data)
        })
        .catch((Error)=>{ 
            basicError(Error) 
            console.log(Error)
            window.alert("예약 정보를 불러올 수 없습니댜.")
            window.history.back()
        })
    }

    const deleteResource = () => {
        if (window.confirm("회의실을 삭제하시겠습니까?")) {
            AdminBookingOfficeAxios.delete(`${officeId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response)=>{ 
                if(Response.data.status === 200) {
                    alert('회의실을 성공적으로 삭제하였습니다.')
                    window.history.back()
                } 
            })
            .catch((Error)=>{ 
                basicError(Error) 
                console.log(Error)
            })
            setOptionViewShowing(false)
        } 
    }

    useEffect(() => {
        getResourceInfo()
        getResourceBookingListInfo()
    }, []);

    return <RightContainer>
        <TitleText>회의실 관리</TitleText>

        <WhiteContainer style={{display:'inline'}}>
            <Bar style={{position:'static'}}>
                <MainTextContainer>
                    <SelectedSubTitleText>{officeInfo.name}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{officeInfo.location}</UnselectedSubTitleText>
                </SubTextContainer>
                <MoreButton onClick={() => { setOptionViewShowing(!isShowingOptions) }}> 
                    <img src={MoreButtonIcon} alt="더보기" />
                </MoreButton>
                <OptionsView isShowing={isShowingOptions}>
                    <OptionButton onClick={() => {  }}>수정</OptionButton>
                    <OptionButton isDelete={true} onClick={ deleteResource }>삭제</OptionButton>
                </OptionsView>
            </Bar>

            <OfficeInfo isDetailPage={true}
                    key={officeInfo.name}
                    capacity={officeInfo.capacity}
                    facilityList={officeInfo.facilityList}
                    description={officeInfo.description}
                    imgUrl={officeInfo.imgUrl}
                />

            <div style={{width:'150px', padding:'30px 0 0 40px'}}>
                <Capsule color="purple" text="예약 내역"/>
            </div>
            
            <InfoTable>
                <tr style={{backgroundColor:'#D0B1EE', border: '1px solid #959494', height:'45px'}}>
                    <th scope="col" style={{width: '15%', border:'1px solid #959494'}} >요청자</th>
                    <th scope="col" style={{width: '30%', border:'1px solid #959494'}} >예약일자</th>
                    <th scope="col" style={{width: '43%', border:'1px solid #959494'}} >목적</th>
                    <th scope="col" style={{width: '12%', border:'1px solid #959494'}} >상태</th>
                </tr>
                {bookingsInfo.map(function(info){
                    return (
                        <tr style={{border: '1px solid #959494', height:'45px'}}>
                            <InfoTableData>{info.requester} ({info.position})</InfoTableData>
                            <InfoTableData style={{fontWeight:'bold'}}>{info.startDateTime} ~ {info.endDateTime}</InfoTableData>
                            <InfoTableData>{info.goal}</InfoTableData>
                            <InfoTableData>{info.bookingStatus}</InfoTableData>
                        </tr>
                    )
                })}
            </InfoTable>

        </WhiteContainer>
    </RightContainer>
}
export default OfficeManageDetail;