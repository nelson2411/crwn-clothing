import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import { Switch, Route, Redirect } from "react-router-dom";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-pages/SignInSignUp";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/Checkout";
import Styled from "styled-components";
import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
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
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
