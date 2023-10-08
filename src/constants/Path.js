import BookingActiveIcon from 'assets/images/sidebarIcon/bookingActive.svg'
import BookingInactiveIcon from 'assets/images/sidebarIcon/bookingInactive.svg'
import EquipmentActiveIcon from 'assets/images/sidebarIcon/equipmentActive.svg'
import EquipmentInactiveIcon from 'assets/images/sidebarIcon/equipmentInactive.svg'
import ArchivingActiveIcon from 'assets/images/sidebarIcon/archivingActive.svg'
import ArchivingInactiveIcon from 'assets/images/sidebarIcon/archivingInactive.svg'
import EmployeeActiveIcon from 'assets/images/sidebarIcon/employeeActive.svg'
import EmployeeInactiveIcon from 'assets/images/sidebarIcon/employeeInactive.svg'
import OfficeActiveIcon from 'assets/images/sidebarIcon/officeActive.svg'
import OfficeInactiveIcon from 'assets/images/sidebarIcon/officeInactive.svg'
import ResourceActiveIcon from 'assets/images/sidebarIcon/resourceActive.svg'
import ResourceInactiveIcon from 'assets/images/sidebarIcon/resourceInactive.svg'
import BookingManageActiveIcon from 'assets/images/sidebarIcon/bookingManageActive.svg'
import BookingManageInactiveIcon from 'assets/images/sidebarIcon/bookingManageInactive.svg'

export const BOOKING_MENUS = [
    { name: '회의실 예약', path: '/officeBooking' },
    { name: '자원 예약', path: '/resourceBooking' },
    { name: '예약 내역', path: '/bookings' }
]

export const MAIN_MENUS = [
    { name: '예약', path: '/officeBooking', subMenus: BOOKING_MENUS, icons: [BookingActiveIcon, BookingInactiveIcon] },
    { name: '비품 내역', path: '/resources', subMenus: null, icons: [EquipmentActiveIcon, EquipmentInactiveIcon] },
    { name: '자료 아카이빙', path: '/archiving', subMenus: null, icons: [ArchivingActiveIcon, ArchivingInactiveIcon] }
]

export const MANAGER_BOOKING_MENUS = [
    { name: '회의실 예약 내역', path: '/manage/officeBooking' },
    { name: '자원 예약 내역', path: '/manage/resourceBooking' }
]

export const MANAGER_MAIN_MENUS = [
    { name: '직원 관리', path: '/manage/employee', subMenus: null, icons: [EmployeeActiveIcon, EmployeeInactiveIcon] },
    { name: '회의실 관리', path: '/manage/offices', subMenus: null, icons: [OfficeActiveIcon, OfficeInactiveIcon] },
    { name: '자원 관리', path: '/manage/resources', subMenus: null, icons: [ResourceActiveIcon, ResourceInactiveIcon] },
    { name: '예약 관리', path: '/manage/officeBooking', subMenus: MANAGER_BOOKING_MENUS, icons: [BookingManageActiveIcon, BookingManageInactiveIcon] }
]

export const MAIN_PATH = '/officeBooking'

export const BookingCategoryPathList = [
    "offices", "resources"
]

export function getBookingCategoryPath(koreanName) {
    if (koreanName === '회의실') {
        return BookingCategoryPathList[0]
    } else if (koreanName === '자원') {
        return BookingCategoryPathList[1]
    }
}