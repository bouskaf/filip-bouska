(function(){
Template.__checkName("single");
Template["single"] = new Template("Template.single", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.call(view.lookup("thisPost"));
  }, function() {
    return [ "\n		", Spacebars.include(view.lookupTemplate("post")), "\n	" ];
  });
}));

}).call(this);
