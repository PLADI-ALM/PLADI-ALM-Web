import { removeAllCookies } from "utils/CookiesUtil"
import { navigateToLogin } from "utils/IsLoginUtil"

// 일반 예외처리
export function basicError(error) {
    try {
        var errMsg = error.response.data.message
        if (errMsg !== undefined) {
            alert(errMsg)

            // 토큰에러인 경우 쿠키 삭제
            var errCode = String(error.response.data.code)
            if (errCode.startsWith('T')) {
                removeAllCookies()
                navigateToLogin()
            }
        } else {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}
