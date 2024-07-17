import React from 'react'; 

function MessageModal(props) {
    return (
      <div className="modal-content">
        <div className="modal-body">
        <div className="text-center">
  <p>{props.message}{' '}<span className='fw-bold'>{props.varlistCode}</span>{'?'}</p>
  <button
    type="button"
    className="btn btn-warning btn-sm mx-1 w-25" 
    onClick={props.onConfirm}
  >
    Yes
  </button>
  <button
    type="button"
    className="btn btn-primary btn-sm mx-1 w-25" 
    onClick={props.onCancel}
  >
    No
  </button>
</div>
</div>
</div>
      );
    }

export default MessageModal;
