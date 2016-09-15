var Functions = {
  storeJWT: function(jwt) {
    localStorage.setItem('jwt', jwt);
  },
  getJWT: function() {
    return localStorage.getItem('jwt');
  }

}
