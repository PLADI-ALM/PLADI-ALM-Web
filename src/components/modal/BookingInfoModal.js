import styled from 'styled-components';

export const BookingInfoModalView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #EFF0F6;
  box-shadow: 0 9px 26px 0 #170F490D;
  padding: 10px;
  width: fit-content;
`

export const BookingInfoText = styled.span`
  font-size: 15px;
  margin-bottom: 10px;
`

export const BookingLastInfoText = styled(BookingInfoText)`
  margin-bottom: 0;
`

//     <BookingInfoModalView>
//     <BookingInfoText>예약자</BookingInfoText>
// <BookingInfoText>예약자</BookingInfoText>
// <BookingLastInfoText>예약자</BookingLastInfoText>
// </BookingInfoModalView>