(function(){
Template.__checkName("post");
Template["post"] = new Template("Template.post", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("editing"));
  }, function() {
    return [ "\n		", HTML.A({
      "class": "back static",
      href: "/blog"
    }, HTML.I({
      "class": "fa fa-angle-double-left"
    })), "\n		", Spacebars.include(view.lookupTemplate("edit")), "\n	" ];
  }, function() {
    return [ "\n		", HTML.A({
      "class": "back",
      href: function() {
        return Spacebars.mustache(view.lookup("back"));
      }
    }, HTML.I({
      "class": "fa fa-angle-double-left"
    })), "\n		", HTML.HEADER("\n			", HTML.H2(Blaze.If(function() {
      return Spacebars.call(view.lookup("published"));
    }, function() {
      return Blaze.View("lookup:date", function() {
        return Spacebars.mustache(view.lookup("date"));
      });
    })), "\n		"), HTML.DIV("\n			", HTML.H1(Blaze.If(function() {
      return Spacebars.call(view.lookup("private"));
    }, function() {
      return [ HTML.EM("Draft:"), " " ];
    }), Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    })), "\n\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("excerpt"));
    }, function() {
      return [ "\n				", HTML.H3({
        "class": "dek"
      }, Blaze.View("lookup:excerpt", function() {
        return Spacebars.mustache(view.lookup("excerpt"));
      })), "\n			" ];
    }), "\n\n			", HTML.SECTION({
      "class": "content"
    }, "\n				", Spacebars.include(view.lookupTemplate("markdown"), function() {
      return Blaze.View("lookup:content", function() {
        return Spacebars.mustache(view.lookup("content"));
      });
    }), "\n			"), "\n\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("tags"));
    }, function() {
      return [ "\n				", HTML.UL({
        "class": "tags"
      }, "\n					", Blaze.Each(function() {
        return Spacebars.call(view.lookup("tags"));
      }, function() {
        return HTML.LI(HTML.A({
          href: function() {
            return Spacebars.mustache(view.lookup("uri"), view.lookup("."));
          }
        }, Blaze.View("lookup:.", function() {
          return Spacebars.mustache(view.lookup("."));
        })));
      }), "\n				"), "\n			" ];
    }), "\n\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return [ "\n\n				", HTML.H2(HTML.STRONG("Publish Status:"), " ", Blaze.View("lookup:status", function() {
        return Spacebars.mustache(view.lookup("status"));
      })), "\n				", HTML.A({
        href: "/edit-post",
        "class": "action edit"
      }, "Edit"), "\n				", HTML.A({
        href: "/delete-post",
        "class": "action delete"
      }, "Delete"), "\n			" ];
    }), "\n		"), "\n	" ];
  });
}));

}).call(this);
