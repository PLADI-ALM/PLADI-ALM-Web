import styled from 'styled-components';
import React from "react";

export const BookingInfoModalView = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: absolute;
  margin-top: -110px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #EFF0F6;
  box-shadow: 0 9px 26px 0 #170F490D;
  padding: 10px;
  width: fit-content;
  height: fit-content;
  z-index: 3;
`

export const BookingInfosModalView = styled(BookingInfoModalView)`
  max-height: 300px;
  position: relative;
  z-index: initial;
  margin-left: 50px;
  margin-top: initial;
  overflow-y: scroll;
`

export const BookingInfoText = styled.span`
  font-size: 15px;
  margin-bottom: 10px;
  width: fit-content;
`

export const BookingLastInfoText = styled(BookingInfoText)`
  margin-bottom: 0;
`

export const Line = styled.hr`
  margin: 10px 0;
  width: 100%;
`

export function BookingInfoModal(props) {
    return (
        <BookingInfoModalView onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
            <BookingInfoText>{props.info.reservatorName}</BookingInfoText>
            <BookingInfoText>{props.info.department}</BookingInfoText>
            <BookingLastInfoText>{props.info.reservatorPhone}</BookingLastInfoText>
        </BookingInfoModalView>
    )
}

export function BookingInfosModal(props) {
    return (
        <BookingInfosModalView x={props.x} y={props.y} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
            {props.info && props.info.map((value, index) =>
                <>
                    <BookingInfoText>{value.startDateTime} ~ {value.endDateTime}</BookingInfoText>
                    <BookingInfoText>{value.reservatorName}</BookingInfoText>
                    <BookingInfoText>{value.reservatorDepartment}</BookingInfoText>
                    <BookingLastInfoText>{value.reservatorPhone}</BookingLastInfoText>
                    {index < props.info.length - 1 ? <Line/> : null}
                </>
            )}
        </BookingInfosModalView>
    )
}