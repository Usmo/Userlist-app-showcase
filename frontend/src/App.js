import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import AddUser from "./users/pages/AddUser";
import UpdateUser from "./users/pages/UpdateUser";
import Users from "./users/pages/Users";
import MainNavigation from "./shared/components/navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/addUser" exact>
            <AddUser />
          </Route>
          <Route path="/:uid" exact>
            <UpdateUser />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
//
