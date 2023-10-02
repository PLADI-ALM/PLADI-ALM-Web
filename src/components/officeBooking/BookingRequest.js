import styled from "styled-components"
import axios from "axios";

export const RequestButtonContainer = styled.div`
    width: 100%
    height: 50px;
    float: right;
`

export const RequestBookingButton = styled.button`
    borger: none;
    padding: 5px 10px;
    margin-right: 60px;
    margin-top: 15px;
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

function getStartTime() {
    // var temp = '';
    // for(var i=0; i<24; i++) {
    //     if (selectedCheckList[i]) {
    //         if(i<10) { temp += '0' }
    //         temp += i.toString() + ':00'
    //     }
    //     console.log('getStartTime :: temp -> ', temp)
    // }
    // return temp
}

function getEndTime() {
    // var temp = '';
    // for(var i=23; i>-1; i--) {
    //     if (selectedCheckList[i]) {
    //         if(i<10) { temp += '0' }
    //         temp += i.toString() + ':00'
    //     }
    //     console.log('getEndTime :: temp -> ', temp)
    // }
    // return temp
}

function requestBookingOffice() {
    var bookingPurpose = document.getElementById("bookingPurpose").value;
    console.log("예약목적 : ", bookingPurpose);

    // console.log("시작시간 : ", getStartTime());
    // console.log("마감시간 : ", getEndTime());


    axios.post("http://13.124.122.173/offices/1/booking", 
        {
            date: '2023-09-28',
            startTime: '10:00',
            endTime: '13:00',
            memo: bookingPurpose
        }
    )
    .then(function (response) { 
        if (response.data.status == '200') {
            alert('예약에 성공하였습니다!')
            return 
        }
    })
    .catch(function (error) { alert(error); });

}
export {requestBookingOffice}