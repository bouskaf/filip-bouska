(function(){
Template.__checkName("blog");
Template["blog"] = new Template("Template.blog", (function() {
  var view = this;
  return HTML.SECTION({
    "class": function() {
      return [ "blog ", Blaze.If(function() {
        return Spacebars.call(view.lookup("singlePost"));
      }, function() {
        return "post";
      }) ];
    }
  }, "\n		", HTML.DIV({
    "class": "posts"
  }, "\n			", HTML.Raw('<a class="back" href="/"><i class="fa fa-angle-double-up"></i></a>'), "\n			", HTML.A({
    "class": "search",
    href: "#"
  }, HTML.I({
    "class": function() {
      return [ "fa ", Blaze.If(function() {
        return Spacebars.call(view.lookup("searching"));
      }, function() {
        return "fa-search-minus";
      }, function() {
        return "fa-search";
      }) ];
    }
  })), "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("searching"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("search"));
  }), "\n\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("posts"));
  }, function() {
    return [ "\n				", Blaze.Each(function() {
      return Spacebars.call(view.lookup("posts"));
    }, function() {
      return [ "\n					", HTML.Comment(" post excerpt "), "\n					", HTML.ARTICLE({
        "class": "excerpt"
      }, "\n						", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        href: function() {
          return [ "/blog/", Spacebars.mustache(view.lookup("slug")) ];
        }
      }, "\n							", HTML.HEADER("\n								", Blaze.If(function() {
        return Spacebars.call(view.lookup("published"));
      }, function() {
        return [ "\n									", HTML.H2(Blaze.View("lookup:date", function() {
          return Spacebars.mustache(view.lookup("date"));
        })), "\n								" ];
      }), "\n							"), HTML.DIV("\n								", HTML.H1(Blaze.If(function() {
        return Spacebars.call(view.lookup("private"));
      }, function() {
        return [ HTML.EM("Draft:"), " " ];
      }), Blaze.View("lookup:title", function() {
        return Spacebars.mustache(view.lookup("title"));
      })), "\n								", Spacebars.include(view.lookupTemplate("markdown"), function() {
        return Blaze.View("lookup:excerpt", function() {
          return Spacebars.mustache(view.lookup("excerpt"));
        });
      }), "\n							"), "\n						"), "\n\n						", Blaze.If(function() {
        return Spacebars.call(view.lookup("tags"));
      }, function() {
        return [ "\n							", HTML.UL({
          "class": "tags"
        }, "\n								", Blaze.Each(function() {
          return Spacebars.call(view.lookup("tags"));
        }, function() {
          return HTML.LI(HTML.A({
            href: function() {
              return Spacebars.mustache(view.lookup("uri"), view.lookup("."));
            }
          }, Blaze.View("lookup:.", function() {
            return Spacebars.mustache(view.lookup("."));
          })));
        }), "\n							"), "\n						" ];
      }), "\n						\n						", Blaze.If(function() {
        return Spacebars.call(view.lookup("currentUser"));
      }, function() {
        return [ "\n							", HTML.Comment(' <a href="/edit-post" class="action edit">Edit</a> '), "\n							", HTML.A({
          href: "#",
          "class": "action delete"
        }, "Delete"), "\n						" ];
      }), "\n					"), "\n				" ];
    }), "\n			" ];
  }, function() {
    return [ "\n				", HTML.ARTICLE({
      "class": "excerpt"
    }, "\n					", HTML.P(HTML.EM("No posts found.")), "\n				"), "\n			" ];
  }), "\n\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("more"));
  }, function() {
    return HTML.A({
      "class": "more",
      href: "#"
    }, "more");
  }), "\n		"), "\n		", HTML.DIV({
    "class": "single"
  }, "\n			", HTML.ARTICLE("\n				", Spacebars.include(view.lookupTemplate("single")), "\n			"), "\n		"), "\n\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n			", HTML.NAV({
      id: "toolbar"
    }, "\n				", HTML.A({
      href: "/blog/new",
      "class": "new-post"
    }, "New Post"), "\n				", HTML.A({
      href: "/",
      "class": "logout"
    }, "Log out"), "\n			"), "\n		" ];
  }), "\n	");
}));

}).call(this);
