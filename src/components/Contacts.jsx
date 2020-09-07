/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  // const contactsItems = data.map((contact) => (
  //   <div key={contact._id}>
  //     <h3>{contact.name}</h3>
  //     <p>{contact.phone_number}</p>
  //     <p>{contact.address}</p>
  //   </div>
  // ));
  return (
    //Start
    <>
    {data.map((contact) => (
      <div key={contact._id}>
        <div className="container">
  <table className="table table-dark">
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
    <td>{contact.name}</td>
    <td>{contact.phone_number}</td>
    <td>{contact.address}</td>
      </tr>
    </tbody>
  </table>
</div>
<div className="button-section text-center">
<button type="button" className="btn btn-success">Update</button>
<button type="button" className="btn btn-warning">Delete</button>
</div>
      </div>
    ))}
    </>
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
