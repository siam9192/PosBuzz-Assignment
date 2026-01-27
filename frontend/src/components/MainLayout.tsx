
import Container from './Container'
import { Outlet } from 'react-router-dom'
import Header from './Header'

function MainLayout() {
  return (
    <div>
     <Header/>
     <Container>
     <Outlet/>
    </Container>
    </div>
  )
}

export default MainLayout