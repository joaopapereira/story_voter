var Issues = React.createClass({
  loadProjectIssues: function(projectId) {
    this.serverRequest = $.get("/projects/" +projectId + "/user_stories", function (result) {
      project = result.project;
      userStories = result.userStories;
      this.setState({
        userStories: userStories,
        project: project
      });
    }.bind(this));
  },
  getInitialState: function() {
    this.loadProjectIssues(this.props.params.projectId)
    return {
      project: null
    };
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    if(this.state.project == null) {
      return (<div>Loading ...</div>);
    }
    if(this.state.userStories === undefined || this.state.userStories.length == 0) {
      return (<div>
        <h2>Project: {project.name}</h2>
        <h4>No issues defined</h4>
      </div>);
    }
    userStories = this.state.userStories;
    return (
      <div>
        <h2>Project: {project.name}</h2>
        <h3>User Stories</h3>
        <table>
          <thead>
            <tr>
              <td>
                Title
              </td>
              <td>
                Number of voters
              </td>
              <td>
                Description
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
});
