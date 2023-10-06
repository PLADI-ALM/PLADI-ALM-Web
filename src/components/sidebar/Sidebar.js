import React from 'react';
import { styled } from 'styled-components';
import { useLocation, Link } from "react-router-dom";
import logo from 'assets/images/fullNameLogo.svg';
import MainMenu from "components/sidebar/MainMenu";
import SubMenu from "components/sidebar/SubMenu";
import { MAIN_MENUS, MAIN_PATH, MANAGER_MAIN_MENUS } from "constants/Path";

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
    margin: 25px auto;
`

const LogoImg = styled.img.attrs({ src: `${logo}` })`
    width: 132px;
    height: 52px;
`

const LogoName = styled.h2`
    margin-top: 10px;
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
        if (currentPath.startsWith(subMenuList[i].path))
            return true
    }
    return false
}

// 해당 메뉴의 활성화 여부
function useIsMenuActive(path) {
    return useLocation().pathname.startsWith(path)
}

function Sidebar() {
    return (
        <Container>
            <Logo to={MAIN_PATH}>
                <LogoImg />
                <LogoName>사내 관리 시스템</LogoName>
            </Logo>

            {/* 일반 사원 메뉴 */}
            <MainMenu info={MAIN_MENUS[0]} active={useIsSubMenuActive(MAIN_MENUS[0].subMenus)} />
            <SubMenus active={useIsSubMenuActive(MAIN_MENUS[0].subMenus)}>
                {MAIN_MENUS[0].subMenus.map(sub => { return (<SubMenu path={sub.path} name={sub.name} />) })}
            </SubMenus>
            <MainMenu info={MAIN_MENUS[1]} active={useIsMenuActive(MAIN_MENUS[1].path)} />
            <MainMenu info={MAIN_MENUS[2]} active={useIsMenuActive(MAIN_MENUS[2].path)} />

            {/* 관리자 메뉴 */}
            <MainMenu info={MANAGER_MAIN_MENUS[0]} active={useIsMenuActive(MANAGER_MAIN_MENUS[0].path)} />
            <MainMenu info={MANAGER_MAIN_MENUS[1]} active={useIsMenuActive(MANAGER_MAIN_MENUS[1].path)} />
            <MainMenu info={MANAGER_MAIN_MENUS[2]} active={useIsMenuActive(MANAGER_MAIN_MENUS[2].path)} />
            <MainMenu info={MANAGER_MAIN_MENUS[3]} active={useIsMenuActive(MANAGER_MAIN_MENUS[3].path)} />
            <SubMenus active={useIsSubMenuActive(MANAGER_MAIN_MENUS[3].subMenus)}>
                {MANAGER_MAIN_MENUS[3].subMenus.map(sub => { return (<SubMenu path={sub.path} name={sub.name} />) })}
            </SubMenus>
        </Container>
    )
}

export default Sidebar;