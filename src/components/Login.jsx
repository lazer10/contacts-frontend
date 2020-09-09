/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loginAction from '../redux/actions/admin/login';

const Login = ({ loginAction, login }) => {
  const [submiting, setSubmiting] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoginPasswordShown, setIsLoginPasswordShown] = useState(false);
  // const [successfulLoginMessage, setSuccessfulLoginMessage] = useState('');

  const history = useHistory();
  console.log(history);

  useEffect(() => {
    if (login.status === 'success') {
      setSubmiting(false);
      setUserName('');
      setPassword('');
      localStorage.setItem('CONTACTS_TEST', login.token);
      return history.push('/admin');
    }
    if (login.status === 'error') {
      setSubmiting(false);
      return setErrors([login.error.message]);
    }
  }, [login]);

  const showLoginPassword = () => {
    setIsLoginPasswordShown(!isLoginPasswordShown);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    setErrors([]);
    setSubmiting(true);
    loginAction(data);
  };

  const togglEye2 = isLoginPasswordShown ? 'eye-slash' : 'eye';
  const slashColor2 = isLoginPasswordShown ? '#83bb44' : '#545458';

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
                className={
                  isLoginPasswordShown
                    ? 'form-control dark-pwd'
                    : 'form-control'
                }
                type={isLoginPasswordShown ? 'text' : 'password'}
                style={{
                  border: isLoginPasswordShown ? '3px' : '3px',
                  borderRightColor: '#202020',
                }}
                id="login"
                // type="text"
                // className="form-control"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
              />
              <div className="input-group-append">
                <span className="input-group-text dark-group-text">
                  <FontAwesomeIcon
                    icon={['fas', togglEye2]}
                    className="pass-icon cursor-pointer"
                    onClick={showLoginPassword}
                    style={{ color: slashColor2 }}
                  />
                </span>
              </div>
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
              {errors.map((error, index) => (
                <div
                  className="alert alert-danger py-2 mt-2 font-smooth"
                  role="alert"
                  key={index}
                  style={{ fontSize: 13 }}
                >
                  {error}
                  <button
                    type="button"
                    className="close"
                    onClick={() => setErrors([])}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ))}
              {/* <p className="alert alert-danger py-2 mt-2 font-smooth">
                {successfulLoginMessage}
              </p> */}
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
