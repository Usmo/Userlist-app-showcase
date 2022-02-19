import React from "react";
import { useHistory } from "react-router-dom";
import ErrorModal from "../../shared/components/modal/ErrorModal";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";

import "../components/UserForm.css";

const AddUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
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

  const history = useHistory();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "/api/users/",
        "POST",
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="user-form" onSubmit={onSubmitHandler}>
        {isLoading && <LoadingSpinner />}
        <Input
          id="fname"
          element="input"
          type="text"
          label="First name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter first name."
          onInput={inputHandler}
        />
        <Input
          id="lname"
          element="input"
          label="Last name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter last name."
          onInput={inputHandler}
        />
        <Input
          id="age"
          element="input"
          label="Age"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter age."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add user
        </Button>
        <Button to="/">Cancel</Button>
      </form>
    </React.Fragment>
  );
};

export default AddUser;
