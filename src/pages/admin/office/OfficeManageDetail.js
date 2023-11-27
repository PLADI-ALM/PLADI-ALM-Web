import React from 'react';
import {OfficesAxios, AdminOfficesAxios} from 'api/AxiosApi';
import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import {basicError} from 'utils/ErrorHandlerUtil';
import {Bar} from 'pages/basic/myBookings/BookedList';
import {RightContainer, WhiteContainer, TitleText} from 'components/rightContainer/RightContainer';
import {
    MainTextContainer,
    SubTextContainer,
    NameSubTitleText,
    DetailSubTitleText
} from 'components/officeBooking/SubTitleBar';
import {getToken} from 'utils/IsLoginUtil';
import MoreButtonIcon from "../../../assets/images/button/triple_dot_icon.svg"
import {MoreButton, OptionButton, OptionsView, InfoTable, InfoTableData} from '../resource/ResourceManageDetail';
import OfficeInfo from 'components/card/OfficeInfo';
import ImageFullButton from "../../../components/button/ImageFullButton";

function OfficeManageDetail() {
    let {officeId} = useParams()

    const [isShowingOptions, setOptionViewShowing] = useState(false)
    const [officeInfo, setOfficeInfo] = useState([])
    const [bookingsInfo, setBookingsInfo] = useState([])

    const getOfficeInfo = () => {
        OfficesAxios.get(`/${officeId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setOfficeInfo(Response.data.data)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("회의실 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }

    const getOfficeBookingListInfo = () => {
        AdminOfficesAxios.get(`offices/${officeId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setBookingsInfo(Response.data.data.officesLists)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            })
    }

    const deleteResource = () => {
        if (window.confirm("회의실을 삭제하시겠습니까?")) {
            AdminOfficesAxios.delete(`${officeId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
                .then((Response) => {
                    if (Response.data.status === 200) {
                        alert('회의실을 성공적으로 삭제하였습니다.')
                        window.history.back()
                    }
                })
                .catch((Error) => {
                    basicError(Error)
                    console.log(Error)
                })
            setOptionViewShowing(false)
        }
    }

    useEffect(() => {
        getOfficeInfo()
        getOfficeBookingListInfo()
    }, []);

    return <RightContainer>
        <TitleText>회의실 관리</TitleText>

        <WhiteContainer>
            <Bar space={true}>
                <div>
                    <NameSubTitleText>{officeInfo.name}</NameSubTitleText>
                    <DetailSubTitleText>{officeInfo.location}</DetailSubTitleText>
                </div>
                <ImageFullButton image={MoreButtonIcon} click={() => {
                    setOptionViewShowing(!isShowingOptions)
                }}/>
                <OptionsView isShowing={isShowingOptions}>
                    <OptionButton onClick={() => {
                        window.location.href = `/admin/offices/${officeId}/edit`
                    }}>수정</OptionButton>
                    <OptionButton isDelete={true} onClick={deleteResource}>삭제</OptionButton>
                </OptionsView>
            </Bar>

            <OfficeInfo
                isDetailPage={true}
                isHidden={true}
                key={officeInfo.name}
                capacity={officeInfo.capacity}
                facilityList={officeInfo.facilityList}
                description={officeInfo.description}
                imgUrl={officeInfo.imgUrl}
            />

            <div style={{width: '150px', padding: '30px 0 0 40px'}}>
                <Capsule color="purple" text="예약 내역"/>
            </div>

            <InfoTable>
                <tr style={{backgroundColor: '#D0B1EE', border: '1px solid #959494', height: '45px'}}>
                    <th scope="col" style={{width: '20%', border: '1px solid #959494'}}>요청자</th>
                    <th scope="col" style={{width: '28%', border: '1px solid #959494'}}>예약일자</th>
                    <th scope="col" style={{width: '40%', border: '1px solid #959494'}}>목적</th>
                    <th scope="col" style={{width: '12%', border: '1px solid #959494'}}>상태</th>
                </tr>
                {bookingsInfo.map(function (info) {
                    return (
                        <tr style={{border: '1px solid #959494', height: '45px'}}>
                            <InfoTableData>{info.reservatorName} ({info.reservatorPhone})</InfoTableData>
                            <InfoTableData
                                style={{fontWeight: 'bold'}}>{info.startDateTime} ~ {info.endDateTime}</InfoTableData>
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
