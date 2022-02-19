import React, { useState } from "react";

import Card from "../../shared/components/card/Card";
import Button from "../../shared/components/button/Button";
import ErrorModal from "../../shared/components/modal/ErrorModal";
import Modal from "../../shared/components/modal/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./UserItem.css";

const UserItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteConfirmedHandler = async () => {
    setShowConfirmationModal(false);
    console.log(props);
    try {
      await sendRequest(`/api/users/${props.userId}`, "DELETE");
      props.onDelete(props.userId);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="user-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button danger onClick={deleteConfirmedHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      ></Modal>
      <li className="user-item">
        <Card className="user-item__content">
          <div className="user-item__info">
            <h2>
              {props.fname} {props.lname}
            </h2>
            <h3>
              Age: {props.age}
              <Button to={`/${props.userId}`}>Edit</Button>
              <Button danger onClick={showConfirmationHandler}>
                Delete
              </Button>
            </h3>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default UserItem;
