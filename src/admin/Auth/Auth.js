import auth0 from "auth0-js";

const REDIRECT_ON_LOGIN = "redirect_on_login";

// Private variables for storing authentication based info in memory
// eslint-disable-next-line
let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;
let _isEnabled = false;
let _isSuperadmin = false;

export class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email read:courses";
    // this.authResult = null;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: this.requestedScopes,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  handleAuthentication = (callback) => {
    this.auth0.parseHash(async (err, authResult) => {
      const redirectLocation =
        localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
          ? "/"
          : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // check if the user is enabled
        await callback();
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/admin");
        alert(`Error: ${err.error}. Check the console for further details!`);
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  // handleSecurity = callback => {
  //   this.auth0.parseHash((err, authResult) => {

  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.authResult = authResult;
  //       // set the private property _accessToken
  //       _accessToken = authResult.accessToken;
  //       // set the profile
  //       this.getProfile(callback);
  //     } else if (err) {
  //       this.history.push(`/${admin_uri}`);
  //       alert(`Error: ${err.error}. Check the console for further details!`);
  //       console.log(err);
  //     }
  //   });
  // }

  setSession = (authResult) => {
    //Set the time that the access token will expire
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    // If there is a value on the 'scope' param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested, If no scopes were requested,
    // set it to nothing
    _scopes = authResult.scope || this.requestedScopes || "";

    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;
  };

  isAuthenticated = () => {
    return new Date().getTime() < _expiresAt;
  };

  logout = () => {
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: process.env.REACT_APP_LOGOUT_REDIRECT_URL,
    });
  };

  getAccessToken = () => {
    if (!_accessToken) {
      throw new Error("No access token found!");
    }
    return _accessToken;
  };

  getProfile = async (cb) => {
    if (this.userProfile) cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };

  isEnabled = () => {
    return _isEnabled;
  };

  setEnabled = (status) => {
    _isEnabled = status;
  };

  isSuperadmin = () => {
    return _isSuperadmin;
  };

  setSuperadmin = (status) => {
    _isSuperadmin = status;
  };

  userHasScopes(scopes) {
    const grantedScopes = (_scopes || "").split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope));
  }
}
