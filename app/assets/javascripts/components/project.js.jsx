var Project = React.createClass({
  getInitialState: function() {
    return {
      project: this.props.info
    };
  },

  render: function() {
    project = this.state.project;
    return (
      <tr>
          <td>{project.name}</td>
      </tr>
    );
  }
});
