import React from 'react';
import { styled } from 'styled-components';
import { useLocation } from "react-router-dom";
import { InActiveMenuLine, ActiveMenuLine } from './MenuLineStyle';

const SubMenuLine = styled(InActiveMenuLine)`
    margin-left: 30px;
`

const ActiveSubMenuLine = styled(ActiveMenuLine)`
    margin-left: 30px;
`

function useIsMenuActive(path) {
    if (useLocation().pathname === path)
        return true
}

function MainMenu(props) {
    return (
        <>
            {useIsMenuActive(props.path) ?
                <ActiveSubMenuLine to={props.path}>{props.name}</ActiveSubMenuLine>
                : <SubMenuLine to={props.path}>{props.name}</SubMenuLine>}
        </>
    );
}

export default MainMenu;