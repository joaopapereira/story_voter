var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var App = React.createClass({
  render: function() {
    return (
      <div>
        Story Voter Application
        <nav>
          <ul>
            <li>
              <Link to='/'>Projects</Link>
            </li>
          </ul>
        </nav>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
