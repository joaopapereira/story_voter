var StoryVotterApp = React.createClass({
  getInitialState: function() {
    return {projects: this.props.data, text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <Projects items={this.state.projects} />
      </div>
    );
  }
});
