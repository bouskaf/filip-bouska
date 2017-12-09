(function(){
Template.__checkName("editProject");
Template["editProject"] = new Template("Template.editProject", (function() {
  var view = this;
  return HTML.FORM({
    "class": "edit-project"
  }, "\n		", HTML.FIGURE("\n			", HTML.Raw('<h2><pre contenteditable="" data-name="published-date" data-placeholder="MM/DD/YYYY"></pre> at <pre contenteditable="" data-name="published-time" data-placeholder="12:00 am"></pre></h2>'), "\n\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("images"));
  }, function() {
    return [ "\n					", HTML.IMG({
      src: function() {
        return Spacebars.mustache(view.lookup("."));
      },
      alt: ""
    }), "\n			" ];
  }), "\n			\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("newProject"));
  }, function() {
    return [ "\n				", HTML.H2("Project Images"), "\n				", HTML.TEXTAREA({
      "class": "images",
      name: "images",
      placeholder: "(enter each URL on own line)"
    }), "\n			" ];
  }, function() {
    return [ "\n				", HTML.H2("Add image"), "\n				", HTML.INPUT({
      "class": "image",
      type: "text",
      name: "image",
      placeholder: "Image URL"
    }), HTML.A({
      href: "add-image",
      "class": "add-image"
    }, HTML.CharRef({
      html: "&plus;",
      str: "+"
    })), "\n			" ];
  }), "\n		"), HTML.DIV("\n			", HTML.H1(Blaze.View("lookup:projectTitle", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("projectTitle")));
  })), "\n\n			", HTML.TEXTAREA({
    "class": "content",
    name: "content",
    placeholder: "Project description",
    value: function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("content"));
      }, function() {
        return Blaze.View("lookup:content", function() {
          return Spacebars.mustache(view.lookup("content"));
        });
      });
    }
  }), "\n\n			", HTML.Raw("<h2>Thumbnail</h2>"), "\n			", HTML.INPUT({
    "class": "thumb",
    type: "text",
    name: "thumb",
    placeholder: "Thumbnail URL",
    value: function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("slug"));
      }, function() {
        return Blaze.View("lookup:thumb", function() {
          return Spacebars.mustache(view.lookup("thumb"));
        });
      });
    }
  }), "\n\n			", HTML.Raw("<h2>Slug</h2>"), "\n			", HTML.INPUT({
    "class": "slug",
    name: "slug",
    placeholder: "Project slug",
    value: function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("slug"));
      }, function() {
        return Blaze.View("lookup:slug", function() {
          return Spacebars.mustache(view.lookup("slug"));
        });
      });
    }
  }), "\n\n			", HTML.Raw("<h2>Publish Status</h2>"), "\n			", HTML.SELECT({
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
