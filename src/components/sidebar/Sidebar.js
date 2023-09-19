import React from 'react';
import { styled } from 'styled-components';


export const Container = styled.div`
    width: 13%;
    height: 100%;
    background: white;
    display: flex;
    flex-style: column;
`


function Sidebar() {
    return (
        <Container>
            사이드바
        </Container>
    );
}

export default Sidebar;