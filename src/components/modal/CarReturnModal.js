import React from 'react';
import {AdminBookingAxios} from 'api/AxiosApi';
import {getToken} from 'utils/IsLoginUtil';
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

export function CarReturnModal(props) {
    const returnCar = (e) => {
        e.preventDefault()
        const inputLocation = e.target.location.value
        const inputEtc = e.target.etc.value
        const isChecked = e.target.check.checked

        if (inputLocation === "") {
            alert("반납장소를 입력해주세요.")
        } else if (!isChecked) {
            alert("차량과 차키를 실제로 반납하시고 반납 처리해주세요.")
        } else {
            AdminBookingAxios.patch(`/cars/${props.id}/return`, {
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
    };

    return (
        <ModalBackdrop onClick={props.handler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
                <TitleContainer>
                    <ModalTitle>차량 반납</ModalTitle>
                </TitleContainer>
                <AttrsForm method="post" id="return-form" onSubmit={returnCar}>
                    <AttrContainer>
                        <AttrLabel>반납장소<br/>(주차위치)</AttrLabel>
                        <AttrInput type='text' name='location'/>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>파손 및<br/>특이사항</AttrLabel>
                        <AttrTextArea name='etc'/>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrInputCheckBox type='checkbox' name='check'/>
                        <AttrLabelCheckbox>
                            반납장소에 반납하셨나요?<br/>차키 반납까지 완료 후, 작성해주세요.
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