import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../assets/styles/addContacts.scss';

import addContactsAction from '../redux/actions/contacts/addContacts';

const AddContacts = ({ addContactsAction, addContacts }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (addContacts.status === 'success') {
      setPhoneNumber('');
      setName('');
    }
    if (addContacts.status === 'error') {
      // setStatus('error');
      console.log(addContacts.error);
    }
  }, [addContacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      phone_number: phoneNumber,
      address: 'Bigogwe',
    };
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
            <button
              className="btn btn-success"
              type="submit"
              onClick={handleSubmit}
            >
              Add Contact
            </button>
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
