import styled, {css} from "styled-components";
import {useState} from "react";

const ToggleBtn = styled.button`
    width: 50px;
    height: 30px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    background-color: ${(props) => (!props.toggle ? "#2A3042" : "#8741CB")};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    margin: 0 auto;
`;

const Circle = styled.div`
    background-color: white;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    position: absolute;
    left: 10%;
    transition: all 0.3s ease-in-out;
    ${(props) =>
    props.toggle &&
    css`
      transform: translate(20px, 0);
      transition: all 0.3s ease-in-out;
    `}
`;

export function Toggle(props) {
    const [toggle, setToggle] = useState(props.isEnable);
    const clickedToggle = () => {
        setToggle((prev) => !prev);
        props.click(!toggle);
    };
    return (
        <ToggleBtn onClick={clickedToggle} toggle={toggle}>
            <Circle toggle={toggle} />
        </ToggleBtn>
    );
}