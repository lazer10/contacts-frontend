/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../assets/styles/myContacts.scss';
import fetchContactsAction from '../redux/actions/contacts/fetchContacts';
import UpdateContact from '../components/UpdateContact';
import DeleteContact from '../components/DeleteContact';

const Contacts = ({ fetchContactsAction, fetchContacts }) => {
  const [status, setStatus] = useState('initial');
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (status === 'initial') {
      fetchContactsAction();
      setStatus('fetching');
    }
    if (fetchContacts.status === 'success') {
      setStatus('success');
      setData(fetchContacts.results);
    }
    if (fetchContacts.status === 'error') {
      const { error } = fetchContacts;
      if (error.status === '404') {
        setStatus('no_data');
      }
      if (error.status === '500') {
        setStatus('network_error');
      } else {
        setStatus('unknown_error');
      }
    }
  }, [fetchContacts]);

  const refetch = () => {
    fetchContactsAction();
    setStatus('fetching');
  };

  const contacts =
    data && searchValue
      ? data.filter((contact) =>
          contact.name.toUpperCase().includes(searchValue.toUpperCase()) || contact.address.toUpperCase().includes(searchValue.toUpperCase())
        )
      : data;

  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = (
          <div className="text-center mt-4">
            <span className="spinner-border text-dark" />
          </div>
        );
        break;
      case 'no_data':
        data = <h3>No data found</h3>;
        break;
      case 'network_error':
        data = <h3>No Network G</h3>;
        break;
      case 'unknown_error':
        data = <h3>Unexpected error occured</h3>;
        break;
      default:
        data = <h3>Loading...</h3>;
        break;
    }
    return data;
  };

  return (
    //Start
    <div>
      <h4 className="text-center text-light bg-dark mb-0 pb-1">
        Contacts List
      </h4>

      <div className="col-4 mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              id="searchValue"
              className="form-control adminAuthInput"
              placeholder="Search contact"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
            />
          </div>
        </form>
      </div>

      <DisplayData>
        <div className="table-1">
          <table className="table table-stripped">
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
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.phone_number}</td>
                  <td>{contact.address}</td>
                  <td>
                    <UpdateContact
                      refetch={refetch}
                      data={contact}
                      id={contact._id}
                    />
                  </td>
                  <td>
                    <DeleteContact refetch={refetch} id={contact._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {contacts.length === 0 && searchValue ? (
          <div className="text-center text-dark">
            <h3>No Search Results Found</h3>
          </div>
        ) : null}
      </DisplayData>
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
