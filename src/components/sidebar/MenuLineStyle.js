import { styled } from 'styled-components';
import { Link } from "react-router-dom";

export const InActiveMenuLine = styled(Link)`
    padding: 3px 20px;
    margin-bottom: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #717171;
    font-size: 22px;
    border-left: 5px solid white;
    &:hover {
        color: #8741CB;
    }
`

export const ActiveMenuLine = styled(InActiveMenuLine)`
    color: #8741CB;
`