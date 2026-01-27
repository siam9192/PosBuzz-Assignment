import React from 'react'
import Provider from './providers/Provider';
import Container from './components/Container';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => (
 
  <Provider>
   <Container>
    {/* <RegistrationPage/> */}
    <LoginPage/>
   </Container>
  </Provider>

);

export default App;