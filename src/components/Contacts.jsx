/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
            setData(fetchContacts.results.data);
        }
        if (fetchContacts.status === 'error') {
            setStatus('error');
        }
    }, [fetchContacts]);
    const contactsItems = data.map((contact) => (
        <div key={contact._id}>
            <h3>{contact.name}</h3>
            <p>{contact.phone_number}</p>
        </div>
    ));
        return (
            <div>
                <h1>Contatc</h1>
                {contactsItems}
            </div>
        )
};

Contacts.propTypes = {
    fetchContactsAction : PropTypes.func.isRequired,
    fetchContacts: PropTypes.object.isRequired
}

const mapStateToProps = ({ fetchContacts }) => ({
    fetchContacts
});

export default connect(mapStateToProps, { fetchContactsAction })(Contacts)