/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../assets/styles/myContacts.scss';
import fetchContactsAction from '../redux/actions/contacts/fetchContacts';

const Contacts = ({ fetchContactsAction, fetchContacts }) => {
  const [status, setStatus] = useState('initial');
  const [data, setData] = useState([]);
  useEffect(() => {
    if (status === 'initial') {
      fetchContactsAction();
      setStatus('loading');
    }
    if (fetchContacts.status === 'success') {
      setStatus('success');
      setData(fetchContacts.results);
    }
    if (fetchContacts.status === 'error') {
      setStatus('error');
    }
  }, [fetchContacts]);
  return (
    //Start
    <div>
      <h4 className="text-center text-light bg-dark mb-0 pb-1">
        Contacts List
      </h4>
      <div className="table-1">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contact) => (
              <tr>
                <td>{contact.name}</td>
                <td>{contact.phone_number}</td>
                <td>{contact.address}</td>
                <td>
                  <button type="button" className="btn btn-warning">
                    Update
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ); // End of Return
};

Contacts.propTypes = {
  fetchContactsAction: PropTypes.func.isRequired,
  fetchContacts: PropTypes.object.isRequired,
};

const mapStateToProps = ({ fetchContacts }) => ({
  fetchContacts,
});

export default connect(mapStateToProps, { fetchContactsAction })(Contacts);
