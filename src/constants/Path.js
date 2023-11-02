import BookingActiveIcon from 'assets/images/sidebarIcon/BookingActive.svg'
import BookingInactiveIcon from 'assets/images/sidebarIcon/BookingInactive.svg'
import MyBookingActiveIcon from 'assets/images/sidebarIcon/MyBookingActive.svg'
import MyBookingInactiveIcon from 'assets/images/sidebarIcon/MyBookingInactive.svg'
import EquipmentActiveIcon from 'assets/images/sidebarIcon/EquipmentActive.svg'
import EquipmentInactiveIcon from 'assets/images/sidebarIcon/EquipmentInactive.svg'
import ArchivingActiveIcon from 'assets/images/sidebarIcon/ArchivingActive.svg'
import ArchivingInactiveIcon from 'assets/images/sidebarIcon/ArchivingInactive.svg'
import AdminActiveIcon from 'assets/images/sidebarIcon/AdminActive.svg'
import AdminInactiveIcon from 'assets/images/sidebarIcon/AdminInactive.svg'

export const BOOKING_MENUS = [
    { name: '회의실 예약', path: '/officeBooking' },
    { name: '장비 예약', path: '/resourceBooking' },
    { name: '차량 내역', path: '/carBooking' }
]

export const MY_BOOKING_MENUS = [
    { name: '회의실 예약 내역', path: '/my/bookings/offices' },
    { name: '장비 예약 내역', path: '/my/bookings/resources' },
    { name: '차량 내역 내역', path: '/my/bookings/cars' }
]

export const MAIN_MENUS = [
    { name: '예약', path: '/officeBooking', subMenus: BOOKING_MENUS, icons: [BookingActiveIcon, BookingInactiveIcon] },
    { name: 'My 예약', path: '/my/bookings/offices', subMenus: MY_BOOKING_MENUS, icons: [MyBookingActiveIcon, MyBookingInactiveIcon] },
    { name: '비품 내역', path: '/equipments', subMenus: null, icons: [EquipmentActiveIcon, EquipmentInactiveIcon] },
    { name: '자료 아카이빙', path: '/archiving', subMenus: null, icons: [ArchivingActiveIcon, ArchivingInactiveIcon] }
]

export const ADMIN_MENUS = [
    { name: '직원 관리', path: '/admin/users' },
    { name: '회의실 관리', path: '/admin/offices' },
    { name: '장비 관리', path: '/admin/resources' },
    { name: '회의실 예약 관리', path: '/admin/officeBooking' },
    { name: '장비 예약 관리', path: '/admin/resourceBooking' },
    { name: '차량 예약 관리', path: '/admin/carBooking' }
]

export const ADMIN_MAIN_MENUS = [
    { name: '관리자', path: '/admin/users', subMenus: ADMIN_MENUS, icons: [AdminActiveIcon, AdminInactiveIcon] }
]

export const MAIN_PATH = '/officeBooking'

export const BookingCategoryPathList = [
    "offices", "resources"
]

export function getBookingCategoryPath(koreanName) {
    if (koreanName === '회의실') {
        return BookingCategoryPathList[0]
    } else if (koreanName === '장비') {
        return BookingCategoryPathList[1]
    }
}