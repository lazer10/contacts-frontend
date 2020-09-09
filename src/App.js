import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Home from './views/Home';
import MyContacts from './views/MyContatcs';
import AddContacts from './views/AddContact';
import AdminDashboard from './views/AdminDashboard';
import Login from './views/Login';
import store from './redux/store';

library.add(fab, fas);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/my-contacts" component={MyContacts} />
          <Route exact path="/add-contact" component={AddContacts} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/admin/login" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
