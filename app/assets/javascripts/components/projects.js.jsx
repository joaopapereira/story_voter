var Projects = React.createClass({
  getInitialState: function() {
    return {
      allprojects: this.props.allprojects
    };
  },
  componentDidMount: function() {
    var component = this;
    this.serverRequest = $.get('/projects/', function (result) {
      var projects = result;
      component.setState({
        allprojects: projects
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    projects = this.state.allprojects || [];
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
              {projects.map(function(project, i){
               return <tr className={"row"} key={i}>
                          <td><Link to={`/project/${project.id}/issues`}>{project.name}</Link></td>
                      </tr>;
             })}
          </tbody>
        </table>
      </div>
    );
  }
});
