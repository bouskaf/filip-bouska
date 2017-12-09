(function(){
Template.__checkName("modal");
Template["modal"] = new Template("Template.modal", (function() {
  var view = this;
  return HTML.FIGURE({
    "class": "modal"
  }, "\n		", Spacebars.With(function() {
    return Spacebars.call(view.lookup("img"));
  }, function() {
    return [ "\n			", HTML.IMG({
      src: function() {
        return Spacebars.mustache(view.lookup("src"));
      },
      alt: function() {
        return Spacebars.mustache(view.lookup("caption"));
      }
    }), "\n			", HTML.Comment(" {{#if caption}}<figcaption>{{caption}}</figcaption>{{/if}} "), "\n		" ];
  }), "\n	");
}));

}).call(this);
