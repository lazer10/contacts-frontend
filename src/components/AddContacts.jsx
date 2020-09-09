import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../assets/styles/addContacts.scss';

import addContactsAction from '../redux/actions/contacts/addContacts';

const AddContacts = ({ addContactsAction, addContacts }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (addContacts.status === 'success') {
      setPhoneNumber('');
      setName('');
    }
    if (addContacts.status === 'error') {
      return setErrors([addContacts.error.message]);
    }
  }, [addContacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      phone_number: phoneNumber,
      address,
    };
    setErrors([]);
    addContactsAction(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="text-center mt-4 w-50">
        <form action="">
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              value={phoneNumber}
            />
          </div>

          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            />
          </div>
          <div className="form-group mt-3">
            <button
              className="btn btn-success"
              type="submit"
              onClick={handleSubmit}
            >
              Add Contact
            </button>
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
          </div>
        </form>
      </div>
    </div>
  );
};

AddContacts.propTypes = {
  addContactsAction: PropTypes.func.isRequired,
  addContacts: PropTypes.object.isRequired,
};

const mapStateToProps = ({ addContacts }) => ({
  addContacts,
});

export default connect(mapStateToProps, { addContactsAction })(AddContacts);
