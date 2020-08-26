import React from 'react';
import { Provider } from "react-redux";

import Home from './views/Home';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
