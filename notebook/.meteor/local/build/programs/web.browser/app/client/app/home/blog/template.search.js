(function(){
Template.__checkName("search");
Template["search"] = new Template("Template.search", (function() {
  var view = this;
  return HTML.NAV({
    "class": "search"
  }, "\n		", HTML.INPUT({
    "class": "search",
    type: "text",
    name: "search",
    placeholder: "search",
    value: function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("query"));
      }, function() {
        return Blaze.View("lookup:query", function() {
          return Spacebars.mustache(view.lookup("query"));
        });
      });
    }
  }), HTML.Raw('\n		<a href="#" class="close">&times;</a>\n	'));
}));

}).call(this);
