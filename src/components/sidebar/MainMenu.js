import React from 'react';
import { styled } from 'styled-components';
import ToggleActiveIcon from 'assets/images/sidebarIcon/toggleActive.png'
import ToggleInactiveIcon from 'assets/images/sidebarIcon/toggleInactive.png'
import { InActiveMenuLine, ActiveMenuLine } from './MenuLineStyle';


const ActiveMainMenuLine = styled(ActiveMenuLine)`
    border-left: 5px solid #8741CB;
`

const Icon = styled.img`
    margin-right: 10px;
`

const ToggleIcon = styled.img`
    margin-left: auto;
    display: block;
`

function MainMenu(props) {
    return (
        <>
            {
                props.active ?
                    <ActiveMainMenuLine to={props.info.path}>
                        <Icon src={props.info.icons[0]} />
                        {props.info.name}
                        <ToggleIcon src={props.info.subMenus !== null ? ToggleActiveIcon : null} />
                    </ActiveMainMenuLine>
                    :
                    <InActiveMenuLine to={props.info.path}>
                        <Icon src={props.info.icons[1]} />
                        {props.info.name}
                        <ToggleIcon src={props.info.subMenus !== null ? ToggleInactiveIcon : null} />
                    </InActiveMenuLine>
            }
        </>
    );
}

export default MainMenu;