import styled from "styled-components"
import { IconButton } from "./IconButton"

const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

export function Navbar() {
  return (
    <NavbarWrapper>
      <div style={{ margin: '1rem', fontSize: '1.3rem' }} ><strong>Habits</strong></div>
      <div style={{ flexShrink: '0', margin: '1rem' }}><IconButton /></div>
    </NavbarWrapper>
  )
}
