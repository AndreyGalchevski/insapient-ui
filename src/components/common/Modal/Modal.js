import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min';

function Modal(props) {
  useEffect(() => {
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems, {});
  });

  const { id, text } = props;
  return (
    <div id={id} className="modal">
      <div className="modal-content">
        <h5>{text}</h5>
      </div>
      <div className="modal-footer">
        <button type="button" className="modal-close btn btn-flat">
          Ok
        </button>
      </div>
    </div>
  );
}

export default Modal;
