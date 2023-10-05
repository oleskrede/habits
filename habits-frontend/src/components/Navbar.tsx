import Lenke from "./Lenke"


function Navbar() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '5rem',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', flex: '1', flexWrap: 'wrap' }}>
        <Lenke url="/" text="Strømpriser" style={{ marginRight: '1rem' }} />
        <Lenke
          url="/varsel"
          text="Prisvarsel"
          style={{ marginRight: '1rem' }}
        />
      </div>
      <a href="/sign-in" style={{ flexShrink: '0' }}>
        Logg inn
      </a>
    </div>
  )
}

export default Navbar