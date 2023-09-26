import React from "react";
import SearchBar from "components/searchBar/SearchBar";
import OfficeInfo from "components/officeInfo/OfficeInfo";
import { RightContainer, WhiteContainer, TitleText } from "components/rightContainer/RightContainer";

function click() {
    alert("1")
}

function SelectOffice(props) {
    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <WhiteContainer>
                <SearchBar />
                <div className="cardList">
                    <OfficeInfo click={click} />
                    <OfficeInfo click={click} />
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectOffice;