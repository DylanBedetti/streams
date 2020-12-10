import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

// documentation: https://developers.google.com/identity/sign-in/web/reference#authentication

class GoogleAuth extends React.Component {
  // initialising library
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "468712730458-20n21kt2ar5e195jol4vshmq1ava9e3n.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // assigning class wide variable auth
          this.auth = window.gapi.auth2.getAuthInstance();

          // determining if logged in or not
          this.onAuthChange(this.auth.isSignedIn.get());

          // adding callback for changes
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId();
      const email = this.auth.currentUser.get().getBasicProfile().getEmail();
      this.props.signIn(userId, email);
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
