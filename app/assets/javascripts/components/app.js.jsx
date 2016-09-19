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
  _backHome: function() {
    window.location.href = '/#/'
  },
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <Link className="navbar-brand" to="/">Story Voter</Link>
          <ul className="nav navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to='/'>Projects</Link>
            </li>
            <li className="nav-item pull-xs-right">
              <SignIn signedIn={this.state.signedIn} user={this.state.user} app={this}/>
            </li>
          </ul>
        </nav>
        <div className="container">
          <div id="alerts"></div>
          <RouteHandler {...this.props} signedIn={this.state.signedIn} user={this.state.user}/>
        </div>
      </div>
    );
  }
});
