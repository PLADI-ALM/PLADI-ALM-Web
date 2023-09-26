import styled from "styled-components"

export const RequestBookingButton = styled.button`
    borger: none;
    padding: 5px 10px;
    background-color: #A263DE;
    color: #FFF;
    width: 82px;
    height: 38px;
    border: none;
    border-radius: 20px;

    font-family: NanumSquare_ac;
    font-size: 20px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
`

function requestBookingOffice() {
    var bookingPurpose = document.getElementById("bookingPurpose").value;
    console.log("예약목적 : ", bookingPurpose);
    alert("회의실을 예약하겠습니까?");
}
export {requestBookingOffice}