import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import loginAction from '../redux/actions/admin/login';

const Login = ({ loginAction, login }) => {
  const [submiting, setSubmiting] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (login.status === 'success') {
      setSubmiting(false);
      setUserName('');
      setPassword('');
      console.log(login);
      localStorage.setItem('CONTACTS_TEST', login.token);
    }
    if (login.status === 'failed') {
      setSubmiting(false);
    }
  }, [login]);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    setSubmiting(true);
    loginAction(data);
  };

  return (
    <div>
      <h3 className="text-center text-dark mt-3">Admin Login</h3>
      <div className="d-flex justify-content-center">
        <div className="text-center w-50">
          <form action="">
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={username}
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div className="form-group mt-3">
              {submiting ? (
                <button className="btn btn-secondary" type="button" disabled>
                  <span className="spinner-border text-dark mr-2" />
                  Logging in
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
};

const mapStateToProps = ({ login }) => ({
  login,
});

export default connect(mapStateToProps, { loginAction })(Login);
