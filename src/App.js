import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import MyContacts from './views/MyContatcs';
import AddContacts from './views/AddContact';
import Login from './views/Login';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/my-contacts" component={MyContacts} />
          <Route exact path="/add-contact" component={AddContacts} />
          <Route exact path="/admin/login" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
