import React from 'react';
import { styled } from 'styled-components';
import { useLocation } from "react-router-dom";
import { InactiveMenuLine, ActiveMenuLine } from './MenuLineStyle';

const SubMenuLine = styled(InactiveMenuLine)`
    margin-left: 30px;
`

const ActiveSubMenuLine = styled(ActiveMenuLine)`
    margin-left: 30px;
`

function useIsMenuActive(path) {
    return useLocation().pathname.startsWith(path)
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