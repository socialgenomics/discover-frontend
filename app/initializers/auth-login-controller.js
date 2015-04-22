import Configuration from "simple-auth/configuration";
import Session from "simple-auth/session";

export default {  
  name: "auth-login-controller",
  after: "simple-auth",
  initialize: function(container, application) {
    // make the loginController available to the custom authenticator 
    // so that it can access the validation fields on the login controller
    application.register('controller:users/login', 'controllers.application', 'controllers:application');
    var authenticator = container.lookup("authenticator:repositive");
    var loginController = container.lookup("controller:users/login");
    authenticator.set("loginController", loginController);
  }
};
