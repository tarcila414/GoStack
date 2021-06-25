import React from 'react';

import GlobalStyle from './styles/global';

import Signin from './pages/Signin/index';
import Signup from './pages/Signup/index';

const App: React.FC = () => {
  return (
    <>
      <Signup />
      <GlobalStyle /> 
    </>
  );
}

export default App;
