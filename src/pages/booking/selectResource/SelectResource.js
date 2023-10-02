import ImageButton from "components/button/ImageButton";
import { ResourceSearchBar, RightContainer, TitleText, WhiteContainer } from "components/rightContainer/RightContainer";
import SearchButtonImg from '../../../assets/images/button/searchButton.png'
import React from "react";
import styled from "styled-components";
import ResourceInfo from "components/resourceInfo/ResourceInfo";


function SelectResource(props) {
    return(
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <ResourceSearchBar>
                <div>
                    예약 가능 자원 검색
                </div>

                <input type="text" placeholder="자원명 검색"/>
                
                <div>
                    <input type="date"/>
                    ~
                    <input type="date"/>
                </div>

                <ImageButton image={SearchButtonImg} width={"49px"} height={"49px"} click={props.search} />
            </ResourceSearchBar>

            <WhiteContainer>
                <div className="cardList">
                    {/* {offices.length == 0 ? <label>예약 가능한 회의실이 없습니다.</label>  : offices.map((office) => <OfficeInfo key={office.name} 
                                                         name={office.name}
                                                         location={office.location}
                                                         capacity={office.capacity}
                                                         facilityList={office.facilityList}
                                                         description={office.description}
                                                         />)} */}

                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                    <ResourceInfo title="자원명"  category="카테고리" description="이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......" />
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectResource;