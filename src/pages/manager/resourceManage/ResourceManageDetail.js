import React from 'react';
import styled from "styled-components"
import { ResourcesAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import { basicError } from 'utils/ErrorHandlerUtil';
import { Bar } from 'pages/booking/bookedList/BookedList';
import { RightContainer, WhiteContainer,TitleText } from 'components/rightContainer/RightContainer';
import { MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText, SubTitleContainer } from 'components/officeBooking/SubTitleBar';
import ResourceInfo from 'components/resourceInfo/ResourceInfo';

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
    let { resourceId } = useParams();

    const [resourceInfo, setResourceInfo] = useState([]);
    const getResourceInfo = () => {
        // ResourcesAxios.get(`/${resourceId}`)
        ResourcesAxios.get(""+1)
        .then((Response)=>{ setResourceInfo(Response.data.data) })
        .catch((Error)=>{ 
            basicError(Error) 
            console.log(Error)
            window.alert("자원 정보를 불러올 수 없습니댜.")
            // window.history.back()
        });
    };

    useEffect(() => {
        getResourceInfo();
    }, []);

    return <RightContainer>
        <TitleText>자원 예약</TitleText>

        <WhiteContainer style={{display:'inline'}}>
            <Bar style={{position:'static'}}>
                <MainTextContainer>
                    <SelectedSubTitleText>{resourceInfo.name}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{resourceInfo.category}</UnselectedSubTitleText>
                </SubTextContainer>
                {/* TODO: 우측에 더보기 버튼 추가 */}
            </Bar>

            <ResourceInfo description={resourceInfo.description} />

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
                <tr style={{border: '1px solid #959494', height:'45px'}}>
                    <InfoTableData>김초원 (대리)</InfoTableData>
                    <InfoTableData style={{fontWeight:'bold'}}>2023.10.02 ~ 2023.10.08</InfoTableData>
                    <InfoTableData>코딩용</InfoTableData>
                    <InfoTableData>반납완료</InfoTableData>
                </tr>
            </InfoTable>

        </WhiteContainer>
    </RightContainer>
}
export default ResourceManageDetail;