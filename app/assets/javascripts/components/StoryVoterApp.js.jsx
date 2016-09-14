var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var StoryVoterApp = React.createClass({
  render: function() {
    return (
      <div>
        <Menu/>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
