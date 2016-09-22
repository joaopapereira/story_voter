var Vote = React.createClass({
  getInitialState: function() {
    return {
      project: this.props.project,
      userStory: this.props.userStory,
      signedIn: this.props.signedIn,
      user: this.props.user,
      parent: this.props.parent
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      signedIn: nextProps.signedIn,
      user: nextProps.user,
      project: nextProps.project,
      userStory: nextProps.userStory
    });
  },
  vote: function() {
    parent = this.state.parent;
    project = this.state.project;
    $.post("/projects/" + this.state.project.id + "/user_stories/" + this.state.userStory.id + "/votes", {vote: this.refs.vote.value})
     .done(function (data) {
       parent.loadProjectIssues(project.id)
       ReactDOM.render(<Expire delay={5000} type="alert-success">Vote casted successfully, reloading issues</Expire>,
         document.getElementById("alerts"));
     })
     .fail(function (data) {
         ReactDOM.render(<Expire delay={5000} type="alert-warning">Error casting vote: {data.error}</Expire>,
           document.getElementById("alerts"));
     });
  },
  render: function() {
      return (
        <div className='form-group row'>
          <label htmlFor="points" className="col-sm-4 control-label">Points</label>
          <div className="col-sm-6">
            <select className="form-control" id="points" ref="vote" defaultValue="-1">
              <option disabled value="-1">Points</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="8">8</option>
            </select>
          </div>
          <Button onClick={this.vote} >
            <i className="fa fa-floppy-o" aria-hidden="true"></i>
          </Button>
        </div>
      )
  }
});
var ShowScore = React.createClass({
  getInitialState: function() {
    return {
      project: this.props.project,
      userStory: this.props.userStory,
      signedIn: this.props.signedIn,
      user: this.props.user,
      parent: this.props.parent
    };
  },
  render: function() {
    votes = {1: [], 2: [], 3: [], 5: [], 8: []}
    this.state.userStory.votes.map(function(vote) {
      votes[vote.vote].push(vote.person)
    })
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>
                Points
              </td>
              <td>
                Number of Votes
              </td>
              <td>
                People
              </td>
            </tr>
          </thead>
          <tbody>
                {Object.keys(votes).map(function(point){
                 return <tr key={point}>
                            <td>{point}</td>
                            <td>{votes[point].length}</td>
                            <td>
                              {votes[point].map(function(person, i){return (<span key={i}>{person.name}</span>);})}
                            </td>
                        </tr>;
               })}
            </tbody>
        </table>
      </div>
    )
  }
});
var ShowVoteSel = React.createClass({
  getInitialState: function() {
    return {
      project: this.props.project,
      userStory: this.props.userStory,
      signedIn: this.props.signedIn,
      user: this.props.user,
      parent: this.props.parent
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      signedIn: nextProps.signedIn,
      user: nextProps.user,
      project: nextProps.project,
      userStory: nextProps.userStory
    });
  },
  render: function() {
    current_user_vote = -1;
    if(this.state.signedIn) {
      this.state.userStory.votes.map(function(vote, i) {
        if(vote.person["id"] == this.state.user.id) {
          current_user_vote = vote.vote;
        }
      });

      if(current_user_vote == -1) {
        return (<Vote userStory={this.state.userStory} user={this.state.user} signedIn={this.state.signedIn} project={this.state.project} parent={this.state.parent}/>);
      } else {
        return (<ShowScore userStory={this.state.userStory} user={this.state.user} signedIn={this.state.signedIn} project={this.state.project} parent={this.state.parent}/>);
      }
    } else {
      return (<div></div>)
    }
  }
});
var Issues = React.createClass({
  loadProjectIssues: function(projectId) {
    this.serverRequest = $.get("/projects/" +projectId + "/user_stories", function (result) {
      project = result.project;
      userStories = result.user_stories;
      this.setState({
        userStories: userStories,
        project: project
      });
    }.bind(this));
  },
  getInitialState: function() {
    this.loadProjectIssues(this.props.params.projectId)
    return {
      project: null,
      userStories: null,
      signedIn: this.props.signedIn,
      user: this.props.user
    };
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      signedIn: nextProps.signedIn,
      user: nextProps.user
    });
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
    state = this.state;
    component = this;
    return (
      <div>
        <h2>Project: {project.name}</h2>
        <h3>User Stories</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>
                Title
              </td>
              <td>
                Number of voters
              </td>
              <td>
                Options
              </td>
            </tr>
          </thead>
          <tbody>
              {userStories.map(function(userStory, i){
               return <tr key={i}>
                          <td><a href={userStory.url} target="_new">{userStory.title}</a></td>
                          <td>{userStory.votes.length}</td>
                          <td>
                            <ShowVoteSel userStory={userStory} user={state.user} signedIn={state.signedIn} project={state.project} parent={component}/>
                          </td>
                      </tr>;
             })}
          </tbody>
        </table>
      </div>
    );
  }
});
