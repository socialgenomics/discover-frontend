export default {  
  name: "auth-login-controller",
  before: "simple-auth",
  initialize: function(container, application) {
    container.injection('authenticator:repositive', 'controller', 'controller:users/login');
  }
};
