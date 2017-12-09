(function(){
Template.__checkName("project");
Template["project"] = new Template("Template.project", (function() {
  var view = this;
  return [ HTML.Raw('<a href="#" class="close">&times;</a>\n		'), HTML.SECTION(Blaze.If(function() {
    return Spacebars.call(view.lookup("editingProject"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("editProject"));
  }, function() {
    return [ HTML.FIGURE("\n		", Blaze.Each(function() {
      return Spacebars.call(view.lookup("images"));
    }, function() {
      return [ "\n				", HTML.IMG({
        src: function() {
          return Spacebars.mustache(view.lookup("."));
        },
        alt: ""
      }), "\n		" ];
    }), "\n			"), HTML.DIV("\n				", HTML.H1(Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    })), "\n\n				", Spacebars.include(view.lookupTemplate("markdown"), function() {
      return Blaze.View("lookup:content", function() {
        return Spacebars.mustache(view.lookup("content"));
      });
    }), "\n				\n				", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return [ "\n					", HTML.H2(HTML.STRONG("Publish Status:"), " ", Blaze.View("lookup:status", function() {
        return Spacebars.mustache(view.lookup("status"));
      })), "\n					", HTML.A({
        href: "/edit-project",
        "class": "action edit"
      }, "Edit"), "\n					", HTML.A({
        href: "/delete-project",
        "class": "action delete"
      }, "Delete"), "\n				" ];
    }), "\n			") ];
  })) ];
}));

}).call(this);
