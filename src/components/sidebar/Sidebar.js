import React from 'react';
import { styled } from 'styled-components';
import { useLocation, Link } from "react-router-dom";
import logo from 'assets/images/imgNameLogo.svg';
import MainMenu from "components/sidebar/MainMenu";
import SubMenu from "components/sidebar/SubMenu";
import { MAIN_MENUS, MAIN_PATH, MANAGER_MAIN_MENUS } from "constants/Path";
import { Icon } from 'components/sidebar/MainMenu';
import MyInfoIcon from 'assets/images/sidebarIcon/myInfoIcon.svg'
import LogoutIcon from 'assets/images/sidebarIcon/logoutIcon.svg'
// import { UsersAxios } from 'api/AxiosApi';
import { removeAllCookies } from 'utils/CookiesUtil';
import { isManager, navigateToLogin } from 'utils/IsLoginUtil';

const Container = styled.div`
    width: 250px;
    min-width: 250px;
    height: 100%;
    background: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

export const LogoName = styled.h2`
    margin-top: 10px;
    color: #640FAF;
    text-align: center;
`

const SubMenus = styled.div`
    display: ${props => props.active ? 'block' : 'none'}
`

const MyBox = styled.div`
    margin-bottom: 20px;
`

const MyInfo = styled.div`
    padding: 3px 0;
    margin: 0 20px 18px 20px;
    width: fit-content;
    display: flex;
    align-items: center;
    color: #717171;
    font-size: 20px;
    border-left: 5px solid white;
`

const Logout = styled(MyInfo)`
    color: #A65959;
    cursor: pointer;
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

function logout() {
    removeAllCookies()
    navigateToLogin()
    // UsersAxios.patch("logout")
    //     .then((response) => {  })
    //     .catch((error) => { alert(error.response.data.code) })
}

function Sidebar() {
    // todo: 다음에 제대로 적용
    navigateToLogin()
    return (
        <Container>
            <div>
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
            </div>

            <MyBox>
                {/* 사원 정보 */}
                <MyInfo><Icon src={MyInfoIcon} />직원명 직급</MyInfo>
                {/* 로그아웃 */}
                <Logout onClick={logout}><Icon src={LogoutIcon} />로그아웃</Logout>
            </MyBox>
        </Container >
    )
}

export default Sidebar;