export const WAITING = {
    name: "예약대기",
    background: "#EBEBEB",
    color: "#4C4C4C"
}
export const BOOKED = {
    name: "예약중",
    background: "#FFF0D7",
    color: "#F19B0A"
}
export const USING = {
    name: "사용중",
    background: "#DAE6FF",
    color: "#2A63F6"
}
export const FINISHED = {
    name: "사용완료",
    background: "#ECFDF3",
    color: "#027A48"
}
export const CANCELED = {
    name: "예약취소",
    background: "#FFDFD7",
    color: "#EC6240"
}

export function findStatus(statusName) {
    switch (statusName) {
        case WAITING.name:
            return WAITING;
        case BOOKED.name:
            return BOOKED;
        case USING.name:
            return USING;
        case FINISHED.name:
            return FINISHED;
        case CANCELED.name:
            return CANCELED;
        default:
            return BOOKED;
    }
}