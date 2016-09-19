var Expire = React.createClass({
  getDefaultProps: function() {
    return {delay: 1000, type: "alert-success"};
  },
  getInitialState: function(){
    return {visible: true};
  },
  componentWillReceiveProps: function(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({visible: true});
    }
  },
  componentDidMount: function() {
      this.setTimer();
  },
  setTimer: function() {
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;

    // hide after `delay` milliseconds
    this._timer = setTimeout(function(){
      this.setState({visible: false});
      this._timer = null;
      ReactDOM.unmountComponentAtNode(document.getElementById('alerts'));
    }.bind(this), this.props.delay);
  },
  componentWillUnmount: function() {
    clearTimeout(this._timer);
  },
  render: function() {
    alertClass = "alert " + this.props.type
    return this.state.visible
           ? <div className={alertClass}>{this.props.children}</div>
           : <span />;
  }
});
