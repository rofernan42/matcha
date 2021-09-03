import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <h1>{props.data.title}</h1>
        <p>{props.data.content}</p>
        <div className="modal__footer">
          <div className="option-yes" onClick={props.onConfirm}>
            yes
          </div>
          <div className="option-no" onClick={props.onCloseModal}>
            no
          </div>
        </div>
        <div className="modal__close" onClick={props.onCloseModal}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Modal;
