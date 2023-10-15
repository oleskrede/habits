import styled from "styled-components"
import { IconButton } from "./IconButton"
import { ArrowTrendingUpIcon, PlusCircleIcon } from "@heroicons/react/24/solid"

const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

export function Navbar() {
  return (
    <NavbarWrapper>
      <div style={{ margin: '1rem', fontSize: '1.3rem' }} ><strong>Habits</strong></div>
      <div style={{ flexShrink: '0', margin: '1rem' }}>
        <IconButton icon={<ArrowTrendingUpIcon />} />
        <IconButton icon={<PlusCircleIcon />} />
      </div>
    </NavbarWrapper>
  )
}
