import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {AdminCarsAxios, CarsAxios} from 'api/AxiosApi';
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import {basicError} from 'utils/ErrorHandlerUtil';
import {Bar} from 'pages/basic/myBookings/BookedList';
import {RightContainer, TitleText, WhiteContainer} from 'components/rightContainer/RightContainer';
import {DetailSubTitleText, NameSubTitleText} from 'components/officeBooking/SubTitleBar';
import {getToken} from 'utils/IsLoginUtil';
import MoreButtonIcon from "assets/images/triple_dot_icon.svg";
import ResourceDetailInfo from "components/card/ResourceDetailInfo";
import ImageFullButton from "components/button/ImageFullButton";

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
  border-collapse: collapse;
  border: 1px solid #959494;
  font-size: 17px;
`

export const InfoTableData = styled.td`
  border: 1px solid #959494;
  height: 45px
`

function CarManageDetail() {
    let {carId} = useParams()

    const [isShowingOptions, setOptionViewShowing] = useState(false)
    const [carInfo, setCarInfo] = useState([])
    const [bookingsInfo, setBookingsInfo] = useState([])

    const getCarInfo = () => {
        CarsAxios.get(`/${carId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                console.log(Response.data.data)
                setCarInfo(Response.data.data)
            })
            .catch((Error) => {
                basicError(Error)
                window.alert("차량 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }

    const getCarBookingListInfo = () => {
        AdminCarsAxios.get(`${carId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                console.log(Response.data.data)
                setBookingsInfo(Response.data.data.productList)
            })
            .catch((Error) => {
                basicError(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }

    const deleteCar = () => {
        if (window.confirm("차량을 삭제하시겠습니까?")) {
            AdminCarsAxios.delete(`${carId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
                .then((Response) => {
                    if (Response.data.status === 200) {
                        alert('차량을 성공적으로 삭제하였습니다.')
                        window.location.href = `/admin/cars`
                    }
                })
                .catch((Error) => {
                    basicError(Error)
                })
            setOptionViewShowing(false)
        }
    }

    useEffect(() => {
        getCarInfo()
        getCarBookingListInfo()
    }, []);

    return (
        <RightContainer>
            <TitleText>차량 관리</TitleText>

            <WhiteContainer>
                <Bar space={true}>
                    <div>
                        <NameSubTitleText>{carInfo.name}</NameSubTitleText>
                        <DetailSubTitleText>{carInfo.location}</DetailSubTitleText>
                    </div>
                    <ImageFullButton image={MoreButtonIcon} click={() => {
                        setOptionViewShowing(!isShowingOptions)
                    }}/>
                    <OptionsView isShowing={isShowingOptions}>
                        <OptionButton onClick={() => {
                            window.location.href = `/admin/cars/edit/${carId}`
                        }}>수정</OptionButton>
                        <OptionButton isDelete={true} onClick={deleteCar}>삭제</OptionButton>
                    </OptionsView>
                </Bar>

                <ResourceDetailInfo
                    managerName={carInfo.responsibilityName}
                    managerPhone={carInfo.responsibilityPhone}
                    description={carInfo.description}
                    imgUrl={carInfo.imgUrl}/>

                <div style={{width: '150px', padding: '30px 0 0 40px'}}>
                    <Capsule color="purple" text="예약 내역"/>
                </div>

                <InfoTable>
                    <tr style={{backgroundColor: '#D0B1EE', border: '1px solid #959494', height: '45px'}}>
                        <th scope="col" style={{width: '20%', border: '1px solid #959494'}}>요청자</th>
                        <th scope="col" style={{width: '25%', border: '1px solid #959494'}}>예약일자</th>
                        <th scope="col" style={{width: '43%', border: '1px solid #959494'}}>목적</th>
                        <th scope="col" style={{width: '12%', border: '1px solid #959494'}}>상태</th>
                    </tr>
                    {bookingsInfo.map(function (info) {
                        return (
                            <tr style={{border: '1px solid #959494', height: '45px'}}>
                                <InfoTableData>{info.reservatorName} ({info.reservatorPhone})</InfoTableData>
                                <InfoTableData
                                    style={{fontWeight: 'bold'}}>{info.startDateTime} ~<br/>{info.endDateTime}
                                </InfoTableData>
                                <InfoTableData>{info.memo}</InfoTableData>
                                <InfoTableData>{info.bookingStatus}</InfoTableData>
                            </tr>
                        )
                    })}
                </InfoTable>

            </WhiteContainer>
        </RightContainer>
    )
}

export default CarManageDetail;
