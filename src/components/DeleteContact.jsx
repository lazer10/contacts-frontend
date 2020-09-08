/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import deleteContactsAction from '../redux/actions/contacts/deleteContacts';
const Types = ({
  deleteContactsAction: deleteContacts,
  deleteContacts: deletedContacts,
  refetch,
  id,
}) => {
  const [errors, setErrors] = useState('');
  const [status, setStatus] = useState('');
  const [trigger, setTrigger] = useState(true);
  useEffect(() => {
    if (deletedContacts.status === 'success') {
      $(`#deleteContact${id}`).modal('hide');
      setStatus('success');
      setErrors('');
      if (trigger) {
        refetch();
        setTrigger(false);
      }
    }
    if (deletedContacts.status === 'error') {
      setStatus('');
      return setErrors(deletedContacts.error.message);
    }
    return undefined;
  }, [deletedContacts]);
  const handleSubmit = (e) => {
    setErrors('');
    setStatus('deleting');
    return deleteContacts(id);
  };
  console.log(id);
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-toggle="modal"
        data-target={`#deleteContact${id}`}
      >
        delete
      </button>
      <div
        className="modal fade"
        id={`deleteContact${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteContact"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0 artist-modal">
            <div className="modal-header">
              <h4
                className="section-title p-0 m-0 text-dark text-center mx-auto font-weight-bold"
                style={{ fontSize: 20.7 }}
              >
                Confirm Action
              </h4>
              <span
                data-dismiss="modal"
                className="close-button cursor-pointer text-center text-dark"
                style={{ cursor: 'pointer' }}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p className="text-center mt-4">
                Are you sure you want to delete this contact?
              </p>
              <div className="text-right mt-3">
                <button
                  type="button"
                  className="btn btn-danger px-4 py-2"
                  data-dismiss="modal"
                  style={{ borderRadius: 5 }}
                >
                  Cancel
                </button>
                {status === 'deleting' ? (
                  <button
                    className="btn btn-secondary px-3 py-2 text-white cursor-disabled"
                    style={{ borderRadius: 5 }}
                    type="button"
                    disabled
                  >
                    <span className="spinner-border spinner-border-sm mr-2" />
                    Loading
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-info px-4 py-2"
                    style={{ borderRadius: 5 }}
                    onClick={handleSubmit}
                  >
                    Proceed
                  </button>
                )}
                <p className="mt-3 text-danger text-center">{errors}</p>
              </div>
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
  deleteContactsAction: PropTypes.func.isRequired,
  deleteContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ deleteContacts }) => ({
  deleteContacts,
});
export default connect(mapStateToProps, { deleteContactsAction })(Types);
