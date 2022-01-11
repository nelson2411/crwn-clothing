import React, { useEffect } from "react";
import HomePage from "./pages/homepage/homepage.component";
import { Switch, Route, Redirect } from "react-router-dom";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import { useSelector, useDispatch } from "react-redux";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-pages/SignInSignUp";
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/Checkout";
import { checkUserSession } from "./redux/user/user.actions";

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={Shop} />
        <Route path="/checkout" component={CheckoutPage} />

        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
