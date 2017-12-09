(function(){
Template.__checkName("edit");
Template["edit"] = new Template("Template.edit", (function() {
  var view = this;
  return HTML.FORM({
    "class": "edit-post"
  }, HTML.Raw('\n		<header>\n			<h2><pre contenteditable="" data-name="published-date" data-placeholder="MM/DD/YYYY"></pre> at <pre contenteditable="" data-name="published-time" data-placeholder="12:00 am"></pre></h2>\n		</header>'), HTML.DIV("\n			", HTML.Raw('<h1><pre contenteditable="" data-name="title" data-placeholder="Post title"></pre></h1>'), "\n			", HTML.H3({
    "class": "dek"
  }, HTML.PRE({
    contenteditable: "",
    "data-name": "excerpt",
    "data-placeholder": "Post excerpt"
  }, Blaze.View("lookup:excerpt", function() {
    return Spacebars.mustache(view.lookup("excerpt"));
  }))), "\n			", HTML.SECTION({
    "class": "content"
  }, "\n				", HTML.TEXTAREA({
    name: "content",
    placeholder: "Post content",
    value: function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("content"));
      }, function() {
        return Blaze.View("lookup:content", function() {
          return Spacebars.mustache(view.lookup("content"));
        });
      });
    }
  }), "\n			"), "\n\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("tags"));
  }, function() {
    return [ "\n				", HTML.UL({
      "class": "tags"
    }, "\n					", Blaze.Each(function() {
      return Spacebars.call(view.lookup("tags"));
    }, function() {
      return HTML.LI(HTML.A({
        href: "/remove-tag",
        "class": "remove-tag",
        title: "Remove this tag"
      }, Blaze.View("lookup:.", function() {
        return Spacebars.mustache(view.lookup("."));
      }), " ", HTML.CharRef({
        html: "&times;",
        str: "×"
      })));
    }), "\n				"), "\n			" ];
  }), "\n			\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("newPost"));
  }, function() {
    return [ "\n				", HTML.TEXTAREA({
      "class": "tags",
      name: "tags",
      placeholder: "Post tags (enter each on own line)"
    }), "\n			" ];
  }, function() {
    return [ "\n				", HTML.LABEL("Add tag"), "\n				", HTML.INPUT({
      "class": "tags",
      type: "text",
      name: "tags",
      placeholder: "Tag"
    }), HTML.A({
      href: "add-tag",
      "class": "add-tag"
    }, HTML.CharRef({
      html: "&plus;",
      str: "+"
    })), "\n			" ];
  }), "\n\n			", HTML.Raw("<label>Slug</label>"), "\n			", HTML.INPUT({
    "class": "slug",
    name: "slug",
    placeholder: "Post slug",
    value: function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("slug"));
      }, function() {
        return Blaze.View("lookup:slug", function() {
          return Spacebars.mustache(view.lookup("slug"));
        });
      });
    }
  }), "\n\n			", HTML.Raw("<label>Publish Status</label>"), "\n			", HTML.SELECT({
    name: "visibility"
  }, "\n				", HTML.OPTION({
    value: "public",
    selected: function() {
      return Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("statusIs"), "public");
      }, function() {
        return "true";
      });
    }
  }, "Published"), "\n				", HTML.OPTION({
    value: "private",
    selected: function() {
      return Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("statusIs"), "private");
      }, function() {
        return "true";
      });
    }
  }, "Draft"), "\n			"), "\n			\n			", HTML.Raw('<button class="save">Save</button>'), "\n			", HTML.Raw('<button class="cancel">Cancel</button>'), "\n		"), "\n	");
}));

}).call(this);
