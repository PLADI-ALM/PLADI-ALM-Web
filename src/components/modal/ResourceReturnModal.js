import React from 'react';
import {AdminBookingAxios, BookingsAxios} from 'api/AxiosApi';
import {getToken, isManager} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {
    AttrContainer,
    AttrInput, AttrInputCheckBox,
    AttrLabel, AttrLabelCheckbox,
    AttrsForm, AttrTextArea,
    BottomBtnContainer,
    ModalBackdrop,
    ModalTitle,
    ModalView,
    TitleContainer
} from 'components/modal/BigModal';
import BigSquareButton, {InputPurpleButton} from 'components/button/BigSquareButton';

export function ResourceReturnModal(props) {
    const returnResource = (e) => {
        e.preventDefault()
        const inputLocation = e.target.location.value
        const inputEtc = e.target.etc.value
        const isChecked = e.target.check.checked

        if (inputLocation === "") {
            alert("반납장소를 입력해주세요.")
        } else if (!isChecked) {
            alert("장비를 실제로 반납하시고 반납 처리해주세요.")
        } else {
            if (window.confirm(`${props.name}(${props.info}) ${props.start} ~ ${props.end}을(를) 반납하시겠습니까?`)) {
                if (isManager()) { // 관리자 반납
                    AdminBookingAxios.patch(`/resources/${props.id}/return`, {
                        returnLocation: inputLocation,
                        remark: inputEtc
                    }, {
                        headers: {
                            Authorization: getToken()
                        }
                    })
                        .then((response) => {
                            alert("반납되었습니다.")
                            window.location.reload();
                        })
                        .catch((error) => {
                            basicError(error)
                        })
                } else { // 일반 사용자 반납
                    BookingsAxios.patch(`/resources/${props.id}/return`, {
                        returnLocation: inputLocation,
                        remark: inputEtc
                    }, {
                        headers: {
                            Authorization: getToken()
                        }
                    })
                        .then((response) => {
                            alert("반납되었습니다.")
                            window.location.reload();
                        })
                        .catch((error) => {
                            basicError(error)
                        })
                }
            }
        }
    };

    return (
        <ModalBackdrop onClick={props.handler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
                <TitleContainer>
                    <ModalTitle>장비 반납</ModalTitle>
                </TitleContainer>
                <AttrsForm method="post" id="return-form" onSubmit={returnResource}>
                    <AttrContainer>
                        <AttrLabel>반납장소<br/>(현재위치)</AttrLabel>
                        <AttrInput type='text' name='location'/>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>파손 및<br/>특이사항</AttrLabel>
                        <AttrTextArea name='etc' maxLength={100}/>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrInputCheckBox type='checkbox' name='check'/>
                        <AttrLabelCheckbox>
                            반납장소에 반납하셨나요?
                        </AttrLabelCheckbox>
                    </AttrContainer>
                    <BottomBtnContainer>
                        <InputPurpleButton value={'반납'}/>
                        <BigSquareButton name={"취소"} color={"white"} click={props.handler}/>
                    </BottomBtnContainer>
                </AttrsForm>
            </ModalView>
        </ModalBackdrop>
    );
}