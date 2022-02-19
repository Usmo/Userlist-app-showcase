import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/modal/ErrorModal";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";

import "../components/UserForm.css";

const UpdateUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const ID = useParams().uid;
  const [formState, inputHandler, setFormData] = useForm(
    {
      fname: {
        value: "",
        isValid: false,
      },
      lname: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await sendRequest(`/api/users/${ID}`);
        setLoadedUser(response.user);
        setFormData(
          {
            fname: {
              value: response.user.fname,
              isValid: true,
            },
            lname: {
              value: response.user.lname,
              isValid: true,
            },
            age: {
              value: response.user.age,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, ID, setFormData]);

  const history = useHistory();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `/api/users/${ID}`,
        "PATCH",
        JSON.stringify({
          fname: formState.inputs.fname.value,
          lname: formState.inputs.lname.value,
          age: formState.inputs.age.value,
        }),
        { "Content-type": "application/json" }
      );
      history.push("/");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && (
        <form className="user-form" onSubmit={onSubmitHandler}>
          <Input
            id="fname"
            element="input"
            type="text"
            label="First name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter first name."
            onInput={inputHandler}
            initialValue={loadedUser.fname}
            initialValid={true}
          />
          <Input
            id="lname"
            element="input"
            label="Last name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter last name."
            onInput={inputHandler}
            initialValue={loadedUser.lname}
            initialValid={true}
          />
          <Input
            id="age"
            element="input"
            label="Age"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter age."
            onInput={inputHandler}
            initialValue={loadedUser.age}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update user
          </Button>
          <Button to="/">Cancel</Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateUser;
