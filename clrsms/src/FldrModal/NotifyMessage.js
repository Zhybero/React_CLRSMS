import React from 'react'; 

function NotifyMessage(props) {
    return (
      <div className="modal-content">
        <div className="modal-body">
        <div className="text-center">
  <p>{props.message}</p> 
  <button
    type="button"
    className="btn btn-primary btn-sm" 
    onClick={props.onCancel}
  >
    Close
  </button>
</div>
</div>
</div>
      );
    }

export default NotifyMessage;
