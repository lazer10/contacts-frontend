import React from 'react';

const Login = () => {
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
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => {}}
              />
            </div>
            <div className="form-group mt-3">
              <button className="btn btn-success" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
