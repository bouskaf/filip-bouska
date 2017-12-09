(function(){
Template.body.addContent((function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("loading"));
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "loading"
    }), "\n	" ];
  });
}));
Meteor.startup(Template.body.renderToDocument);

}).call(this);
