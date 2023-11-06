import styled from "styled-components"
import { Page } from "../types/Types"

const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`

const Title = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
`

const NavbarButtons = styled.div`
  margin: 1rem; 
  display: flex; 
  gap: 1.5rem;
`

const NavbarButton = styled.button`
  font-weight: bold;
`

type Props = {
  setContent: (display: Page) => void
}

export function Navbar({ setContent: setDisplay }: Props) {
  return (
    <NavbarWrapper>
      <Title onClick={() => setDisplay(Page.MAIN)}>
        Habits
      </Title>
      <NavbarButtons>
        <NavbarButton onClick={() => setDisplay(Page.EDIT)}>Edit</NavbarButton>
      </NavbarButtons>
    </NavbarWrapper>
  )
}
