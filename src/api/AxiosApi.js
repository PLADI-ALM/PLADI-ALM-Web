import axios from "axios";

const host = process.env.REACT_APP_DEV_HOST

export const OfficesAxios = axios.create({
    baseURL: `${host}/offices/`,
});

export const BookingsAxios = axios.create({
    baseURL: `${host}/bookings/`,
});

export const UsersAxios = axios.create({
    baseURL: `${host}/users/`,
});

export const ResourcesAxios = axios.create({
    baseURL: `${host}/resources/`,
});

export const EquipmentsAxios = axios.create({
    baseURL: `${host}/equipments/`,
});

export const ArchivingssAxios = axios.create({
    baseURL: `${host}/archivings/`,
});

export const AdminBookingAxios = axios.create({
    baseURL: `${host}/admin/bookings/`,
});