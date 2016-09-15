var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var App = React.createClass({
  componentWillMount: function() {
    $.ajax({
      method: "GET",
      url: "/auth/signedin.json"
    })
    .done(function(data){
      this.setState({ signedIn: data.signed_in, user: data.user, app: this });
    }.bind(this));
  },
  getInitialState: function() {
    return { signedIn: null, user: null };
  },
  logout: function() {
      this.setState({ signedIn: null, user: null, app: this });
  },
  render: function() {
    return (
      <div>
        Story Voter Application
        <nav>
          <ul>
            <li>
              <Link to='/'>Projects</Link>
            </li>
            <li>
              <SignIn signedIn={this.state.signedIn} user={this.state.user} app={this}/>
            </li>
          </ul>
        </nav>
        <RouteHandler {...this.props} signedIn={this.state.signedIn}/>
      </div>
    );
  }
});
