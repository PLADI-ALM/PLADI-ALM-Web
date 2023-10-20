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

export const EquipmentsAxios = axios.create({
    baseURL: `${host}/equipments`,
});

export const ArchivingssAxios = axios.create({
    baseURL: `${host}/archivings`,
});

export const AdminUsersAxios = axios.create({
    baseURL: `${host}/admin/users`,
});

export const AdminBookingAxios = axios.create({
    baseURL: `${host}/admin/bookings`,
});

export const AdminBookingResourceAxios = axios.create({
    baseURL: `${host}/admin/resources`,
});

export const AdminBookingOfficeAxios = axios.create({
    baseURL: `${host}/admin/offices`,
});

export  const ImageUrlAxios = axios.create({
    baseURL: `${image}`
})
