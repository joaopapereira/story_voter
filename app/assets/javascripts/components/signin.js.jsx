var SignIn = React.createClass({
  loadUser: function() {
    this.serverRequest = $.get("/person/" + this.state.user, function (result) {
      person = result.person;
      userStories = result.userStories;
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
          {this.state.user.name}, <a onClick={this.logout}>logout</a>
        </div>
      );
    }
  }
});
