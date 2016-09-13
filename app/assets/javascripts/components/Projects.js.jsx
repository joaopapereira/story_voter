var Projects = React.createClass({
  getInitialState: function() {
    return {t: this.props.projects};
  },
  getDefaultProps: function() {
    return {}
  },
  render: function() {
    return (
      <div>
        <h3>All Projects</h3>
      </div>
    );
  }
});
