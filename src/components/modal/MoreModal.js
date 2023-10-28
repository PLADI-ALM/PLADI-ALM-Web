import styled from 'styled-components';

export const MoreBtn = styled.img`
  cursor: pointer;
  display: flex;
  margin: auto;
`
export const MoreModalView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  right: 30px;
  border-radius: 10px;
  width: 90px;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #EFF0F6;
  box-shadow: 0 9px 26px 0 #170F490D;
`

export const NormalDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #545F71;
  
`

export const RedDiv = styled(NormalDiv)`
  color: #A65959;
`

export const MenuText = styled.span`
  font-size: 15px;
  cursor: pointer;
`