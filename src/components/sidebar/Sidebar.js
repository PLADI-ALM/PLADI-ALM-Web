import React from 'react';
import { styled } from 'styled-components';
import { useLocation, Link } from "react-router-dom";
import logo from 'assets/images/fullNameLogo.png';
import MainMenu from "components/sidebar/MainMenu";
import SubMenu from "components/sidebar/SubMenu";
import { MAIN_MENUS, MAIN_PATH } from "constants/Path";

const Container = styled.div`
    width: 250px;
    min-width: 250px;
    height: 100%;
    background: white;
    flex-style: column;
    text-align: center;
`

const Logo = styled(Link)`
    display: block;
    cursor: pointer;
    margin: 35px 0 35px auto;
`

const LogoImg = styled.img.attrs({ src: `${logo}` })`
    width: 132px;
    height: 52px;
`

const LogoName = styled.h2`
    color: #8741CB;
    text-align: center;
`

const SubMenus = styled.div`
    display: ${props => props.active ? 'block' : 'none'}
`

// 해당 상위 메뉴의 하위 메뉴 활성화 여부
function useIsSubMenuActive(subMenuList) {
    var currentPath = useLocation().pathname
    for (var i = 0; i < subMenuList.length; i++) {
        if (subMenuList[i].path === currentPath)
            return true
    }
    return false
}

// 해당 메뉴의 활성화 여부
function useIsMenuActive(path) {
    if (useLocation().pathname === path)
        return true
    return false
}

function Sidebar() {
    return (
        <Container>
            <Logo to={MAIN_PATH}>
                <LogoImg />
                <LogoName>사내 관리 시스템</LogoName>
            </Logo>

            <MainMenu info={MAIN_MENUS[0]} active={useIsSubMenuActive(MAIN_MENUS[0].subMenus)} />
            <SubMenus active={useIsSubMenuActive(MAIN_MENUS[0].subMenus)}>
                {MAIN_MENUS[0].subMenus.map(sub => { return (<SubMenu path={sub.path} name={sub.name} />) })}
            </SubMenus>

            <MainMenu info={MAIN_MENUS[1]} active={useIsMenuActive(MAIN_MENUS[1].path)} />

            <MainMenu info={MAIN_MENUS[2]} active={useIsMenuActive(MAIN_MENUS[2].path)} />
        </Container>
    );
}

export default Sidebar;