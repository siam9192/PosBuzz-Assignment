import React from 'react'
import Provider from './providers/Provider';
import Router from './router';

const App: React.FC = () => (
  <Provider>
   <Router/>
  </Provider>
);

export default App;