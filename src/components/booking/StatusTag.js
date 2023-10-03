import styled from "styled-components"

// 상태 태그 컨테이너
export const StatusContainer = styled.div`
    width: 100px;
    height: 25px;
    padding: 8px;
    background: ${props => props.background};
    border-radius: 20px;
    display: ${props => (props.isCheck !== 'true') ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    margin: auto;
`

// 상태 태그 점
export const StatusCircle = styled.div`
    width: 10px;
    height: 10px;
    background: ${props => props.color};
    border-radius: 100px;
    margin-right: 8px;
`

// 상태 태그 텍스트
export const StatusText = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.color};
`