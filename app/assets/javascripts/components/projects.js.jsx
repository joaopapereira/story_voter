var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Overlay = ReactBootstrap.Overlay;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Popover = ReactBootstrap.Popover;

var ProjectsSelect = React.createClass({
  getInitialState: function() {
    return {
      signedIn: this.props.allprojects,
      showModal: false,
      showAddToolTip: false
    };
  },
  componentDidMount: function() {
    this.serverRequest = $.get('/projects/new', function (result) {
      var projects = result.projects;
      this.setState({
        projects: projects
      });
    }.bind(this));
  },
  onChange: function(){
    this.props.app.setState({newProject: this.refs.project_select.value})
  },
  renderSelect: function(id, label, values) {
    if(values === undefined) {
      return <div>Loading project....</div>;
    }
    var i = 0;
    var options = values.map(function(value) {
      i++;
      return <option value={value.id} key={i}>{value.repo_name}</option>
    })
    return this.renderField(id, label,
      <select className="form-control" id={id} ref={id} onChange={this.onChange} defaultValue="-1">
        <option disabled value="-1"> -- select an option -- </option>
        {options}
      </select>
    )
  },
  renderField: function(id, label, field) {
    return (
      <div className='form-group row'>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className="col-sm-6">
        {field}
      </div>
    </div>
    );
  },
  render: function() {
    return (
      <div>
        {this.renderSelect("project_select", "Project", this.state.projects)}
      </div>
    );
  }
});

var Projects = React.createClass({
  getInitialState: function() {
    return {
      allprojects: this.props.allprojects,
      showModal: false,
      showAddToolTip: false,
      project_select: null
    };
  },
  componentDidMount: function() {
    var component = this;
    this.serverRequest = $.get('/projects/', function (result) {
      var projects = result.projects;
      component.setState({
        allprojects: projects
      });
    }.bind(this));
  },
  close: function() {
    this.setState({ showModal: false });
  },
  open: function(e) {
    if(this.state.signedIn) {
      this.setState({ showModal: true, showAddToolTip: false });
    }else {
      this.setState({ showModal: false, showAddToolTip: !this.state.showAddToolTip, target: e.target})
    }
  },
  addProject: function(){
    if(this.state.newProject !== undefined) {
      
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      signedIn: nextProps.signedIn,
      user: nextProps.user
    });
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    projects = this.state.allprojects || [];
    return (
      <div className="row">
        <h5>Projects</h5>
        <div ref="dest">
          <Button onClick={this.open} >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Button>
          <Overlay
            show={this.state.showAddToolTip}
            target={this.state.target}
            placement="right"
            container={this}
            containerPadding={50}
          >
            <Popover id="popover-contained" title="Login Required">
              You need to login to add new projects
            </Popover>
          </Overlay>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Number of issues</td>
            </tr>
          </thead>
          <tbody>
              {projects.map(function(project, i){
               return <tr key={i}>
                          <td><Link to={`/project/${project.id}/issues`}>{project.name}</Link></td>
                          <td>{project.num_of_user_stories}</td>
                      </tr>;
             })}
          </tbody>
        </table>
        <Modal
          show={this.state.showModal}
          onHide={this.close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add new project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Add one project from the list below
            <ProjectsSelect app={this}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addProject}>Add</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
