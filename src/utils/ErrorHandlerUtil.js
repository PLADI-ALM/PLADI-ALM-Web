import { removeTokenAndNavigate, isLogin } from "utils/IsLoginUtil"

// 일반 예외처리
export function basicError(error) {
    try {
        const errMsg = error.response.data.message;
        if (errMsg !== undefined) {
            // 토큰에러가 아닌 경우 일단 alert
            if (!String(error.response.data.code).startsWith('T') && isLogin()) {
                alert(errMsg)
            }

            // 토큰에러인 경우 쿠키 삭제 (토큰 에러를 두번 alert 하지 않기 위해 토큰 존재 여부 판단)
            if (String(error.response.data.code).startsWith('T')) {
                alert(errMsg)
                removeTokenAndNavigate()
            }
        } else {
            console.log(error)
            alert("서버 오류입니다.")
        }
    } catch (error) {
        console.log(error)
        alert("서버 오류입니다.")
    }
}

// 로그인하지 않은 상태일 때 예외처리
export function notLogInError(error) {
    try {
        const errMsg = error.response.data.message;
        if (errMsg !== undefined) {
            // 토큰에러가 아닌 경우 일단 alert
            if (!String(error.response.data.code).startsWith('T')) {
                alert(errMsg)
            }

            // 토큰에러인 경우 쿠키 삭제 (토큰 에러를 두번 alert 하지 않기 위해 토큰 존재 여부 판단)
            if (String(error.response.data.code).startsWith('T') && isLogin()) {
                alert(errMsg)
                removeTokenAndNavigate()
            }
        } else {
            console.log(error)
            alert("서버 오류입니다.")
        }
    } catch (error) {
        console.log(error)
        alert("서버 오류입니다.")
    }
}
