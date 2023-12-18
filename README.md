# (주)플래디 사내 관리 페이지 Web
<br>

![image](https://github.com/PLADI-ALM/PLADI-ALM-Web/assets/62008784/0ecb70cf-fcae-461e-8dcd-d2d612fee0e3)

## Tech Stack
### Web
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/node.js-6DB33F?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> 

### Deploy
<img src="https://img.shields.io/badge/Github Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"> <img src="https://img.shields.io/badge/S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/> <img src="https://img.shields.io/badge/CloudFront-8C4FFF?style=for-the-badge&logoColor=white"/>
<img src="https://img.shields.io/badge/Route53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white"/>

### Develop Tool
<img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/InteliJ-0071C5?style=for-the-badge&logo=intellijidea&logoColor=white">
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"/>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

### Etc.
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/> <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
<br>

## Project Architecture
![image](https://github.com/PLADI-ALM/PLADI-ALM-Web/assets/62008784/eb4db699-8420-4dbd-a3b3-523761cea49d)

<br>

## Project Structure

<details>
<summary>Details</summary>

```jsx
src
 ┣ api
 ┃ ┗ AxiosApi.js
 ┣ assets
 ┃ ┣ fonts
 ┃ ┃ ┣ font.css
 ┃ ┃ ┣ NanumSquare_acB.woff
 ┃ ┃ ┣ NanumSquare_acEB.woff
 ┃ ┃ ┣ NanumSquare_acL.woff
 ┃ ┃ ┗ NanumSquare_acR.woff
 ┃ ┗ images
 ┃ ┃ ┣ button
 ┃ ┃ ┣ sidebarIcon
 ┃ ┃ ┃ ┣ AdminActive.svg
 ┃ ┃ ┃ ┣ AdminInactive.svg
 ┃ ┃ ┃ ┣ ArchivingActive.svg
 ┃ ┃ ┃ ┣ ArchivingInactive.svg
 ┃ ┃ ┃ ┣ BookingActive.svg
 ┃ ┃ ┃ ┣ BookingInactive.svg
 ┃ ┃ ┃ ┣ EquipmentActive.svg
 ┃ ┃ ┃ ┣ EquipmentInactive.svg
 ┃ ┃ ┃ ┣ LogoutIcon.svg
 ┃ ┃ ┃ ┣ MyBookingActive.svg
 ┃ ┃ ┃ ┣ MyBookingInactive.svg
 ┃ ┃ ┃ ┣ MyInfoIcon.svg
 ┃ ┃ ┃ ┣ ToggleActive.svg
 ┃ ┃ ┃ ┗ ToggleInactive.svg
 ┃ ┃ ┣ arrowDown.svg
 ┃ ┃ ┣ EmptyImg.svg
 ┃ ┃ ┣ imgLogo.svg
 ┃ ┃ ┣ imgNameLogo.svg
 ┃ ┃ ┣ kor_nameLogo.svg
 ┃ ┃ ┣ Location.svg
 ┃ ┃ ┣ moreIcon.svg
 ┃ ┃ ┣ RangeArrow.svg
 ┃ ┃ ┣ Search.svg
 ┃ ┃ ┣ SearchInput.svg
 ┃ ┃ ┣ SearchPlus.svg
 ┃ ┃ ┣ SelectArrow.svg
 ┃ ┃ ┣ triple_dot_icon.svg
 ┃ ┃ ┗ triple_dot_icon_black.svg
 ┣ components
 ┃ ┣ booking
 ┃ ┃ ┗ StatusTag.js
 ┃ ┣ button
 ┃ ┃ ┣ BigSquareButton.js
 ┃ ┃ ┣ ImageFullButton.js
 ┃ ┃ ┣ ImagePaddingButton.js
 ┃ ┃ ┗ SmallButton.js
 ┃ ┣ capsule
 ┃ ┃ ┣ Capsule.js
 ┃ ┃ ┣ DropBox.js
 ┃ ┃ ┣ FacilityCapsule.js
 ┃ ┃ ┗ RoleCapsule.js
 ┃ ┣ card
 ┃ ┃ ┣ Card.js
 ┃ ┃ ┣ EquipmentInfo.js
 ┃ ┃ ┣ OfficeInfo.js
 ┃ ┃ ┣ ResourceDetailInfo.js
 ┃ ┃ ┗ ResourceInfo.js
 ┃ ┣ modal
 ┃ ┃ ┣ BigModal.js
 ┃ ┃ ┣ BookingInfoModal.js
 ┃ ┃ ┣ CarReturnModal.js
 ┃ ┃ ┣ EquipmentMoreModal.js
 ┃ ┃ ┣ MoreModal.js
 ┃ ┃ ┣ ResourceReturnModal.js
 ┃ ┃ ┣ UserModal.js
 ┃ ┃ ┗ UserMoreModal.js
 ┃ ┣ officeBooking
 ┃ ┃ ┣ BookedTimeBar.js
 ┃ ┃ ┣ BookingOfficeInfo.js
 ┃ ┃ ┣ BookingPurpose.js
 ┃ ┃ ┣ BookingTimeBar.js
 ┃ ┃ ┗ SubTitleBar.js
 ┃ ┣ resourceBooking
 ┃ ┃ ┗ TimeSelector.js
 ┃ ┣ rightContainer
 ┃ ┃ ┗ RightContainer.js
 ┃ ┣ searchBar
 ┃ ┃ ┣ ManageSearchBar.js
 ┃ ┃ ┗ SearchBar.js
 ┃ ┣ sidebar
 ┃ ┃ ┣ MainMenu.js
 ┃ ┃ ┣ MenuLineStyle.js
 ┃ ┃ ┣ Sidebar.js
 ┃ ┃ ┗ SubMenu.js
 ┃ ┗ toggle
 ┃ ┃ ┗ Toggle.js
 ┣ constants
 ┃ ┣ BookingStatus.js
 ┃ ┣ Path.js
 ┃ ┗ ToggleList.js
 ┣ pages
 ┃ ┣ admin
 ┃ ┃ ┣ car
 ┃ ┃ ┃ ┣ CarManage.js
 ┃ ┃ ┃ ┣ CarManageAdd.js
 ┃ ┃ ┃ ┣ CarManageDetail.js
 ┃ ┃ ┃ ┗ CarManageTableCell.js
 ┃ ┃ ┣ carBookings
 ┃ ┃ ┃ ┣ CarBookingManage.js
 ┃ ┃ ┃ ┗ CarBookingManageCell.js
 ┃ ┃ ┣ office
 ┃ ┃ ┃ ┣ OfficeManage.js
 ┃ ┃ ┃ ┣ OfficeManageAdd.js
 ┃ ┃ ┃ ┣ OfficeManageDetail.js
 ┃ ┃ ┃ ┗ OfficeManageTableCell.js
 ┃ ┃ ┣ officeBookings
 ┃ ┃ ┃ ┣ OfficeBookingManage.js
 ┃ ┃ ┃ ┗ OfficeBookingManageCell.js
 ┃ ┃ ┣ resource
 ┃ ┃ ┃ ┣ ResourceManage.js
 ┃ ┃ ┃ ┣ ResourceManageAdd.js
 ┃ ┃ ┃ ┣ ResourceManageDetail.js
 ┃ ┃ ┃ ┗ ResourceManageTableCell.js
 ┃ ┃ ┣ resourceBookings
 ┃ ┃ ┃ ┣ ResourceBookingManage.js
 ┃ ┃ ┃ ┗ ResourceBookingManageCell.js
 ┃ ┃ ┗ user
 ┃ ┃ ┃ ┣ UserManage.js
 ┃ ┃ ┃ ┗ UserManageLine.js
 ┃ ┗ basic
 ┃ ┃ ┣ booking
 ┃ ┃ ┃ ┣ car
 ┃ ┃ ┃ ┃ ┣ CarBooking.js
 ┃ ┃ ┃ ┃ ┣ CarBookingCheck.js
 ┃ ┃ ┃ ┃ ┗ SelectCar.js
 ┃ ┃ ┃ ┣ office
 ┃ ┃ ┃ ┃ ┣ OfficeBooking.js
 ┃ ┃ ┃ ┃ ┣ OfficeBookingCheck.js
 ┃ ┃ ┃ ┃ ┗ SelectOffice.js
 ┃ ┃ ┃ ┗ resource
 ┃ ┃ ┃ ┃ ┣ CustomCalendar.css
 ┃ ┃ ┃ ┃ ┣ ResourceBooking.js
 ┃ ┃ ┃ ┃ ┣ ResourceBookingCheck.js
 ┃ ┃ ┃ ┃ ┗ SelectResource.js
 ┃ ┃ ┣ equipment
 ┃ ┃ ┃ ┣ EquipmentAdd.js
 ┃ ┃ ┃ ┗ EquipmentList.js
 ┃ ┃ ┣ myBookings
 ┃ ┃ ┃ ┣ BookedLine.js
 ┃ ┃ ┃ ┗ BookedList.js
 ┃ ┃ ┗ user
 ┃ ┃ ┃ ┣ EmailCheck.js
 ┃ ┃ ┃ ┣ Login.js
 ┃ ┃ ┃ ┗ ResetPassword.js
 ┣ utils
 ┃ ┣ CookiesUtil.js
 ┃ ┣ ErrorHandlerUtil.js
 ┃ ┣ ImageUtil.js
 ┃ ┗ IsLoginUtil.js
 ┣ App.css
 ┣ App.js
 ┣ App.test.js
 ┣ index.css
 ┣ index.js
 ┣ reportWebVitals.js
 ┗ setupTests.js
```
</details>
<br>

## Commit/PR Convention
**Commit**
```
[PDW-1] feat: 회의실 예약 UI
```
- [지라티켓] 커밋 태그: 커밋 설명
<br>

**Pull Request**
```
[PDW-1/feat] 회의실 예약
```
- [지라티켓/커밋태그]  설명
<br>

## Branch Strategy
- main
    - 배포 이력 관리 목적
- develop
    - feat 병합용 브랜치
    - 배포 전 병합 브랜치
- feat
    - develop 브랜치를 베이스로 기능별로 feat 브랜치 생성해 개발
- test
    - 테스트가 필요한 코드용 브랜치
- fix
    - 배포 후 버그 발생 시 버그 수정 
<br>

- feat branch의 경우, feat/지라티켓-기능설명 형태로 작성
```md
feat/PDW-1-office-booking
```
<br>

## Member
|[박서연](https://github.com/psyeon1120)|[차유상](https://github.com/chayoosang)|[김초원](https://github.com/ryr0121)|
|:---:|:---:|:---:|
|<img src="https://github.com/psyeon1120.png" width="180" height="180" >|<img src="https://github.com/chayoosang.png" width="180" height="180" >|<img src="https://github.com/ryr0121.png" width="180" height="180">|
| **Web Architecture**| **Web Developer** | **Web Developer** |
