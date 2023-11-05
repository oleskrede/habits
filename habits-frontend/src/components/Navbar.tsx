import styled from "styled-components"

const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`

const Title = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`

export function Navbar() {
  return (
    <NavbarWrapper>
      <Title>
        <strong>Habits</strong>
        </Title>
      <div style={{ margin: '1rem', display: 'flex', gap: '1.5rem' }}>
        <strong>Edit</strong>
      </div>
    </NavbarWrapper>
  )
}
