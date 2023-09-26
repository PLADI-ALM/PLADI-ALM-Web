import React, { useEffect } from "react";
import SearchBar from "components/searchBar/SearchBar";
import OfficeInfo from "components/officeInfo/OfficeInfo";
import { RightContainer, WhiteContainer, TitleText } from "components/rightContainer/RightContainer";
import axios from "axios";
import { useState } from "react";

function SelectOffice(props) {

    const [offices, setOffices] = useState([]);

    const getOfficeList = () => {
        axios.get("http://13.124.122.173/offices")
            .then((Response)=>{setOffices(Response.data.data.content)})
            .catch((Error)=>{alert(Error)})

        console.log(offices)
        
    };

    useEffect(()=> {
        getOfficeList();
    }, []);


    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <WhiteContainer>
                <SearchBar />
                <div className="cardList">
                    {offices.map((office) => <OfficeInfo key={office.name} 
                                                         name={office.name}
                                                         location={office.location}
                                                         capacity={office.capacity}
                                                         facilityList={office.facilityList}
                                                         description={office.description}
                                                         />)}
                </div>
            </WhiteContainer>
        </RightContainer>
    );
}

export default SelectOffice;