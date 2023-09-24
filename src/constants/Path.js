import BookingActiveIcon from 'assets/images/sidebarIcon/bookingActive.png'
import BookingInactiveIcon from 'assets/images/sidebarIcon/bookingInactive.png'
import ResourceActiveIcon from 'assets/images/sidebarIcon/resourceActive.png'
import ResourceInactiveIcon from 'assets/images/sidebarIcon/resourceInactive.png'
import ArchivingActiveIcon from 'assets/images/sidebarIcon/archivingActive.png'
import ArchivingInactiveIcon from 'assets/images/sidebarIcon/archivingInactive.png'

export const BOOKING_MENUS = [
    { name: '회의실 예약', path: '/officeBooking' },
    { name: '비품 예약', path: '/resourceBooking' },
    { name: '예약 내역', path: '/bookings' }
]

export const MAIN_MENUS = [
    { name: '예약', path: '/officeBooking', subMenus: BOOKING_MENUS, icons: [BookingActiveIcon, BookingInactiveIcon] },
    { name: '비품 관리', path: '/resources', subMenus: null, icons: [ResourceActiveIcon, ResourceInactiveIcon] },
    { name: '자료 아카이빙', path: '/archiving', subMenus: null, icons: [ArchivingActiveIcon, ArchivingInactiveIcon] }
]

export const MAIN_PATH = '/officeBooking'