import React from 'react';

import GlobalStyle from './styles/global';

import Signin from './pages/Signin/index';
// import Signup from './pages/Signup/index';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Signin />
      </AppProvider>

      
      <GlobalStyle /> 
    </>
  );
}

export default App;
