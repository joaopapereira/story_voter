var SignIn = React.createClass({
  loadUser: function() {
    this.serverRequest = $.get("/person/" + this.state.user, function (result) {
      person = result.person;
      userStories = result.userStories;
      app.setSate({signedIn: this.state.signedIn})
      this.setState({
        signedIn: this.state.signedIn,
        person: person
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      signedIn: nextProps.signedIn,
      user: nextProps.user,
      app: nextProps.app
    });
  },
  getInitialState: function() {
    return { signedIn: null, person: null, app: null };
  },
  logout: function() {
    this.serverRequest = $.get("/signout", function (result) {
      this.state.app.logout();
      this.setState({
        signedIn: null,
        person: null
      });
    }.bind(this));
    return false;
  },
  render: function() {
    if(this.state.signedIn === null || this.state.signedIn == false) {
      return (
          <a href="/auth/github">Sign In with GitHub</a>
      );
    }
    else {

      return (
        <div>
          {this.state.user.name}, <Link to="/" onClick={this.logout}>logout</Link>
        </div>
      );
    }
  }
});
