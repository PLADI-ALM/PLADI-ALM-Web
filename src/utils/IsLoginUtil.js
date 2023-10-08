import { getCookie } from 'utils/CookiesUtil';

export function getToken() {
    return getCookie('Authorization')
}

export function isLogin() {
    return getCookie('Authorization') != null
}

export function isManager() {
    var role = getCookie('Role')
    if (role == null) return false
    return getCookie('Role') === 'MANAGER'
}

export function navigateToLogin() {
    if (!isLogin()) window.location.replace('/')
}