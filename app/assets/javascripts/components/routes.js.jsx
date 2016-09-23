var Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;

this.MyRoutes = (
  <Route handler={App}>
    <DefaultRoute handler={Projects} />
    <Route handler={Projects} path='projects'/>
    <Route handler={Issues} path='/project/:projectId/issues'/>
  </Route>
);

/*ReactRouter.run(this.MyRoutes, function (Handler) {
  ReactDOM.render(<Handler/>, document.body);
});*/
