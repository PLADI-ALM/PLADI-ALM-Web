import React from 'react';
import styled from "styled-components"
import { ResourcesAxios, AdminBookingResourceAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import { basicError } from 'utils/ErrorHandlerUtil';
import { Bar } from 'pages/booking/bookedList/BookedList';
import { RightContainer, WhiteContainer,TitleText } from 'components/rightContainer/RightContainer';
import { MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import ResourceInfo from 'components/resourceInfo/ResourceInfo';
import { getToken } from 'utils/IsLoginUtil';
import MoreButtonIcon from "../../../assets/images/button/triple_dot_icon.svg"

export const MoreButton = styled.button`
    border: none;
    background-color: #2A3042;
    float: right;
    margin: 15px; 10px; 5px; 0;
`
export const OptionsView = styled.div`
    display: ${props => props.isShowing ? 'table-cell' : 'none'};
    width: 85px;
    height: 96px;
    background: white;
    border: 1px solid #545F71;
    border-radius: 12px;
    position: absolute;
    top: 35px;
    right: 30px;
    vertical-align: middle;
`

export const OptionButton = styled.button`
    width: 85px;
    height: 48px;
    background: none;
    border: none;
    color: ${props => props.isDelete ? '#A65959' : '#545F71'};
    font-size: 16px;
`

export const InfoTable = styled.table`
    width: 94%;
    margin: 40px 0 40px 40px;
    border-collapse : collapse;
    border: 1px solid #959494;
    font-size: 17px;
    align: center;
`

export const InfoTableData = styled.td`
    border: 1px solid #959494;
    height: 45px
`

function ResourceManageDetail() {
    let { resourceId } = useParams()

    const [isShowingOptions, setOptionViewShowing] = useState(false)
    const [resourceInfo, setResourceInfo] = useState([])
    const [bookingsInfo, setBookingsInfo] = useState([])

    const getResourceInfo = () => {
        ResourcesAxios.get(`/${resourceId}`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response)=>{ setResourceInfo(Response.data.data) })
        .catch((Error)=>{
            basicError(Error)
            console.log(Error)
            window.alert("자원 정보를 불러올 수 없습니댜.")
            window.history.back()
        })
    }

    const getResourceBookingListInfo = () => {
        AdminBookingResourceAxios.get(`resources/${resourceId}`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((Response)=>{ setBookingsInfo(Response.data.data.resourcesLists) })
        .catch((Error)=>{
            basicError(Error)
            console.log(Error)
            window.alert("예약 정보를 불러올 수 없습니댜.")
            window.history.back()
        })
    }

    const deleteResource = () => {
        if (window.confirm("자원을 삭제하시겠습니까?")) {
            AdminBookingResourceAxios.delete(`${resourceId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response)=>{
                if(Response.data.status === 200) {
                    alert('자원을 성공적으로 삭제하였습니다.')
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
        <TitleText>자원 관리</TitleText>

        <WhiteContainer style={{display:'inline'}}>
            <Bar style={{position:'static'}}>
                <MainTextContainer>
                    <SelectedSubTitleText>{resourceInfo.name}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{resourceInfo.category}</UnselectedSubTitleText>
                </SubTextContainer>
                <MoreButton onClick={() => { setOptionViewShowing(!isShowingOptions) }}>
                    <img src={MoreButtonIcon} alt="더보기" />
                </MoreButton>
                <OptionsView isShowing={isShowingOptions}>
                    <OptionButton onClick={() => { window.location.href = `/manage/resources/edit/${resourceId}` }}>수정</OptionButton>
                    <OptionButton isDelete={true} onClick={ deleteResource }>삭제</OptionButton>
                </OptionsView>
            </Bar>

            <ResourceInfo detail={false}
                        description={resourceInfo.description}
                        imgUrl={resourceInfo.imgUrl} />

            <div style={{width:'150px', padding:'30px 0 0 40px'}}>
                <Capsule color="purple" text="예약 내역"/>
            </div>

            <InfoTable>
                <tr style={{backgroundColor:'#D0B1EE', border: '1px solid #959494', height:'45px'}}>
                    <th scope="col" style={{width: '15%', border:'1px solid #959494'}} >요청자</th>
                    <th scope="col" style={{width: '25%', border:'1px solid #959494'}} >예약일자</th>
                    <th scope="col" style={{width: '48%', border:'1px solid #959494'}} >목적</th>
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
export default ResourceManageDetail;
