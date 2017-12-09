(function(){
Template.__checkName("projects");
Template["projects"] = new Template("Template.projects", (function() {
  var view = this;
  return [ HTML.MAIN({
    "class": function() {
      return [ "projects ", Blaze.If(function() {
        return Spacebars.call(view.lookup("currentUser"));
      }, function() {
        return "logged-in";
      }), " ", Blaze.If(function() {
        return Spacebars.call(view.lookup("viewingProject"));
      }, function() {
        return "active";
      }) ];
    }
  }, "\n		", HTML.Raw('<header>\n			<h2>\n				<a class="logo" href="/">dkoo</a>\n				<a href="/blog">blog</a>\n				<a href="/about">about</a>\n			</h2>\n		</header>'), "\n\n		", HTML.SECTION("\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("projects"));
  }, function() {
    return HTML.FIGURE("\n				", HTML.A({
      href: function() {
        return [ "/projects/", Spacebars.mustache(view.lookup("slug")) ];
      }
    }, "\n					", HTML.IMG({
      src: function() {
        return Spacebars.mustache(view.lookup("thumb"));
      },
      alt: function() {
        return Spacebars.mustache(view.lookup("title"));
      }
    }), "\n					", HTML.ASIDE("\n						", HTML.H3(Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    })), "\n					"), "\n				"), "\n			");
  }), "\n		"), "\n	"), "\n	", HTML.ARTICLE({
    "class": function() {
      return [ "project ", Blaze.If(function() {
        return Spacebars.call(view.lookup("viewingProject"));
      }, function() {
        return "active";
      }), " ", Blaze.If(function() {
        return Spacebars.call(view.lookup("currentUser"));
      }, function() {
        return "logged-in";
      }) ];
    }
  }, "\n		", Spacebars.With(function() {
    return Spacebars.call(view.lookup("thisProject"));
  }, function() {
    return [ "\n			", Spacebars.include(view.lookupTemplate("project")), "\n		" ];
  }), "\n	"), "\n\n	", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n		", HTML.NAV({
      id: "toolbar"
    }, "\n			", HTML.A({
      href: "/projects/new",
      "class": "new-project"
    }, "New Project"), "\n			", HTML.A({
      href: "/projects",
      "class": "logout"
    }, "Log out"), "\n		"), "\n	" ];
  }) ];
}));

}).call(this);
