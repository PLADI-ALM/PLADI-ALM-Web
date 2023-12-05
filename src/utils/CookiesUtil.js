import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option })
}

export const getCookie = (name) => {
    return cookies.get(name)
}

export const removeCookie = (name, option) => {
    return cookies.remove(name, { ...option })
}

export const removeAllCookies = () => {
    const cookieKeys = cookies.getAll()

    Object.keys(cookieKeys).forEach(key => {
        cookies.remove(key)
    })

    window.location.replace('/')
}