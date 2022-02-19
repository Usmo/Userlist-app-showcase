import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/modal/ErrorModal";
import UsersList from "../../users/components/UsersList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [userData, setUserData] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await sendRequest("/api/users/");
        setUserData(users.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]); // We can add it as dependency because useCallback will prevent a loop

  // This will handle user deletion from previously rendered userlist
  const userDeletedHandler = (deletedUserId) => {
    setUserData((prevUsers) => {
      if (!prevUsers) {
      } else {
        return prevUsers.filter((u) => u.userId !== deletedUserId);
      }
    });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userData && (
        <UsersList items={userData} onDeleteUser={userDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default Users;
