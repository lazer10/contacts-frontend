/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import updateContactsAction from '../redux/actions/contacts/updateContacts';
const Types = ({
  updateContactsAction: updateContacts,
  updateContacts: updatedContacts,
  refetch,
  id,
  data,
}) => {
  const [errors, setErrors] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [trigger, setTrigger] = useState(true);
  useEffect(() => {
    setName(data.name);
    setPhoneNumber(data.phone_number);
    setAddress(data.address);
    if (updatedContacts.status === 'success') {
      $(`#updateContact${id}`).modal('hide');
      setStatus('success');
      setErrors('');
      if (trigger) {
        refetch();
        setTrigger(false);
      }
    }
    if (updatedContacts.status === 'error') {
      setStatus('');
      return setErrors(updatedContacts.error.message);
    }
    return undefined;
  }, [updatedContacts]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !phoneNumber) {
      return setErrors('All fields are required!');
    }
    let payload;
    if (
      name !== data.name ||
      address !== data.address ||
      phoneNumber !== data.phone_number
    ) {
      payload = { name, address, phoneNumber };
    }
    if (payload) {
      updateContacts(payload, id);
    } else {
      return setErrors('Change something to update!');
    }
    setErrors('');
    return setStatus('submitting');
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#updateContact${id}`}
      >
        Update
      </button>
      <div
        className="modal fade"
        id={`updateContact${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="updateContact"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0 artist-modal">
            <div className="modal-header">
              <h4
                className="section-title p-0 m-0 text-dark text-center mx-auto font-weight-bold"
                style={{ fontSize: 20.7 }}
              >
                Edit Contact&#39;s info.
              </h4>
              <span
                data-dismiss="modal"
                className="close-button cursor-pointer text-center text-dark"
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="modal-form-div"></div>
              <form className="mt-4 px-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor={`name${id}`} className="modal-label">
                      Contact Names
                    </label>
                    <input
                      type="text"
                      id={`name${id}`}
                      className="form-control dash-gray-input "
                      placeholder="Enter Contact's Names"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor={`address${id}`} className="modal-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id={`address${id}`}
                      className="form-control dash-gray-input "
                      placeholder="Enter Address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor={`phoneNumber${id}`} className="modal-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id={`phoneNumber${id}`}
                      className="form-control dash-gray-input "
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group mt-4 text-center">
                  {status === 'submitting' ? (
                    <button
                      className="btn btn-secondary px-5 py-2 text-white cursor-disabled"
                      style={{ borderRadius: 20 }}
                      type="button"
                      disabled
                    >
                      <span className="spinner-border spinner-border-sm mr-2" />
                      Loading
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-info px-4 py-2"
                      style={{ borderRadius: 20 }}
                      onClick={handleSubmit}
                    >
                      Update Contact
                    </button>
                  )}
                </div>
                <p className="mt-3 text-danger text-center">{errors}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Types.propTypes = {
  id: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  updateContactsAction: PropTypes.func.isRequired,
  updateContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ updateContacts }) => ({
  updateContacts,
});
export default connect(mapStateToProps, { updateContactsAction })(Types);
