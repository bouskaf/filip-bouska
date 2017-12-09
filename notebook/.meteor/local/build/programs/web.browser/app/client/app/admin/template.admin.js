(function(){
Template.__checkName("admin");
Template["admin"] = new Template("Template.admin", (function() {
  var view = this;
  return HTML.MAIN({
    "class": "admin"
  }, "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("resetting"));
  }, function() {
    return [ "\n			", HTML.FORM({
      id: "reset"
    }, "\n				", HTML.H2("Reset password"), "\n				", HTML.P("Enter a new password below to reset your account."), "\n\n				", HTML.LABEL("Password"), "\n				", HTML.INPUT({
      type: "password",
      name: "password",
      required: ""
    }), "\n\n				", HTML.LABEL("Password again"), "\n				", HTML.INPUT({
      type: "password",
      name: "confirm",
      required: ""
    }), "\n\n				", HTML.BUTTON({
      "class": "full activate"
    }, "Reset password"), "\n			"), "\n			\n\n		" ];
  }, function() {
    return [ "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("reset"));
    }, function() {
      return [ "\n				", HTML.FORM({
        id: "start-reset"
      }, "\n					", HTML.H2("Reset password"), "\n\n					", HTML.LABEL("E-mail address"), "\n					", HTML.INPUT({
        type: "email",
        name: "email",
        required: ""
      }), "\n\n					", HTML.BUTTON({
        "class": "full send-reset"
      }, "Send recovery e-mail"), "\n					", HTML.BUTTON({
        "class": "full cancel"
      }, "Back to log-in"), "\n				"), "\n\n			" ];
    }, function() {
      return [ "\n				", HTML.FORM({
        id: "login"
      }, "\n					", HTML.H2("Log into dkoo.net"), "\n\n					", HTML.LABEL("Username"), "\n					", HTML.INPUT({
        type: "text",
        name: "user",
        required: ""
      }), "\n\n					", HTML.LABEL("Password"), "\n					", HTML.INPUT({
        type: "password",
        name: "password",
        required: ""
      }), "\n\n					", HTML.BUTTON({
        "class": "full signin"
      }, "Log in"), "\n					", HTML.BUTTON({
        "class": "full reset"
      }, "Reset password"), "\n				"), "\n			" ];
    }), "\n		" ];
  }), "\n	");
}));

}).call(this);
