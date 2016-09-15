var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var App = React.createClass({
  componentWillMount: function() {
    $.ajax({
      method: "GET",
      url: "/auth/signedin.json"
    })
    .done(function(data){
      this.setState({ signedIn: data.signed_in });
    }.bind(this));
  },
  getInitialState: function() {
    return { signedIn: null };
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
              <SignIn />
            </li>
          </ul>
        </nav>
        <RouteHandler {...this.props} signedIn={this.state.signedIn}/>
      </div>
    );
  }
});
