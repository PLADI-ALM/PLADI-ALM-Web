import styled from 'styled-components';

// Modal이 떴을 때의 배경
export const ModalBackdrop = styled.div`
  z-index: 3; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

// Modal창
export const ModalView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 500px;
  background-color: #ffffff;
  padding: 30px 50px;
  box-sizing: border-box;
  max-height: 98%;
  overflow-y: scroll;
`

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ModalTitle = styled.h2`
  color: #8741CB;
  margin: 0;
`

export const ExitBtn = styled.button`
  background: none;
  width: 40px;
  height: 40px;
  font-size: 40px;
  border: none;
  color: #4C4C4C;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AttrsForm = styled.form`
  width: 100%;
`

export const AttrContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  //height: 40px;
`

export const AttrLabel = styled.div`
  width: 120px;
  font-size: 20px;
  text-align: left;
`

export const AttrLabelCheckbox = styled(AttrLabel)`
  width: fit-content;
  line-height: 20px;
  font-size: 18px;
`

export const AttrInput = styled.input`
  border: 2px solid #E6E6E6;
  border-radius: 8px;
  height: 40px;
  width: 280px;
  font-size: 18px;
  color: #757575;
  padding: 0 10px;
  outline: none;
  box-sizing: border-box;
  &:disabled {
    color: #9E9E9E;
  }
`

export const AttrTextArea = styled.textarea`
  border: 2px solid #E6E6E6;
  border-radius: 8px;
  height: 80px;
  width: 280px;
  font-size: 18px;
  color: #757575;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
`

export const AttrInputCheckBox = styled(AttrInput)`
  height: 20px;
  width: 20px;
  margin-right: 20px;
`

// 하단 버튼 컨테이너
export const BottomBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`