import React from 'react';
import { styled } from 'styled-components';
import ToggleActiveIcon from 'assets/images/sidebarIcon/toggleActive.svg'
import ToggleInactiveIcon from 'assets/images/sidebarIcon/toggleInactive.svg'
import { InactiveMenuLine, ActiveMenuLine } from './MenuLineStyle';


const ActiveMainMenuLine = styled(ActiveMenuLine)`
    border-left: 5px solid #8741CB;
`

export const Icon = styled.img`
    margin-right: 10px;
    width: 20px;
    height: 20px;
`

const ToggleIcon = styled.img`
    margin-left: auto;
    display: block;
    width: 20px;
    height: 20px;
`

function MainMenu(props) {
    return (
        <>
            {
                props.active ?
                    <ActiveMainMenuLine to={props.info.path}>
                        <Icon src={props.info.icons[0]} />
                        {props.info.name}
                        {props.info.subMenus !== null ? <ToggleIcon src={ToggleActiveIcon} /> : null}
                    </ActiveMainMenuLine>
                    :
                    <InactiveMenuLine to={props.info.path}>
                        <Icon src={props.info.icons[1]} />
                        {props.info.name}
                        {props.info.subMenus !== null ? <ToggleIcon src={ToggleInactiveIcon} /> : null}
                    </InactiveMenuLine>
            }
        </>
    );
}

export default MainMenu;