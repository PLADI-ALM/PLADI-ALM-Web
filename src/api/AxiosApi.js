import axios from "axios";

const host = process.env.REACT_APP_DEV_HOST;
const image = process.env.REACT_APP_URL_HOST;

export const OfficesAxios = axios.create({
    baseURL: `${host}/offices`,
});

export const BookingsAxios = axios.create({
    baseURL: `${host}/bookings`,
});

export const UsersAxios = axios.create({
    baseURL: `${host}/users`,
});

export const ResourcesAxios = axios.create({
    baseURL: `${host}/resources`,
});

export const CarsAxios = axios.create({
    baseURL: `${host}/cars`,
});

export const EquipmentsAxios = axios.create({
    baseURL: `${host}/equipments`,
});

export const ArchivingAxios = axios.create({
    baseURL: `${host}/archives`,
});

export const AdminUsersAxios = axios.create({
    baseURL: `${host}/admin/users`,
});

export const AdminBookingAxios = axios.create({
    baseURL: `${host}/admin/bookings`,
});

export const AdminCarsAxios = axios.create({
    baseURL: `${host}/admin/cars`,
});

export const AdminResourcesAxios = axios.create({
    baseURL: `${host}/admin/resources`,
});

export const AdminOfficesAxios = axios.create({
    baseURL: `${host}/admin/offices`,
});

export  const ImageUrlAxios = axios.create({
    baseURL: `${image}`
})
