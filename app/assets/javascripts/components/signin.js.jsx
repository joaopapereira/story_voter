var SignIn = React.createClass({
  loadUser: function() {
    this.serverRequest = $.get("/person/" + this.state.signedIn, function (result) {
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
  getInitialState: function() {
    return { signedIn: null, person: null };
  },
  render: function() {
    if(this.state.signedIn === null) {
      return (
          <a href="/auth/github">Sign In with GitHub</a>
      );
    }
    else {

      return (
        <div>
          {this.state.person.name}, <a href="/signout">logout</a>
        </div>
      );
    }
  }
});
