import React from "react";
import UserItem from "./UserItem";

import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.userId}
          userId={user.userId}
          fname={user.fname}
          lname={user.lname}
          age={user.age}
          onDelete={props.onDeleteUser}
        />
      ))}
    </ul>
  );
};

export default UsersList;
