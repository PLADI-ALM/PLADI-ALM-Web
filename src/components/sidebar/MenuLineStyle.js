import { styled } from 'styled-components';
import { Link } from "react-router-dom";

export const InactiveMenuLine = styled(Link)`
    padding: 3px 20px;
    margin-bottom: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #717171;
    font-size: 20px;
    border-left: 5px solid white;
    &:hover {
        color: #8741CB;
    }
`

export const ActiveMenuLine = styled(InactiveMenuLine)`
    color: #8741CB;
`