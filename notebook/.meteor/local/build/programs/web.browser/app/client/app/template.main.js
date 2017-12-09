(function(){
Template.__checkName("main");
Template["main"] = new Template("Template.main", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("loading"));
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "loading"
    }), "\n	" ];
  }), "\n\n	", Blaze.If(function() {
    return Spacebars.call(view.lookup("modalExists"));
  }, function() {
    return [ "\n		", Spacebars.include(view.lookupTemplate("modal")), "\n	" ];
  }), "\n	\n	", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("content"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }) ];
}));

}).call(this);
