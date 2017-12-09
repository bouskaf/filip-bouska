(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return HTML.MAIN({
    "class": function() {
      return [ "container ", Blaze.If(function() {
        return Spacebars.call(view.lookup("viewingBlog"));
      }, function() {
        return "blog";
      }) ];
    }
  }, HTML.Raw('\n		<section class="intro">\n			<div>\n				<h1><a href="/blog">Filip\'s notebook</a></h1>\n				<ul>\n					<li><a href="https://github.com/bouska"><i class="fa fa-github"></i></a></li>\n					<li><a href="https://instagram.com/filepek/"><i class="fa fa-instagram"></i></a></li>\n					<li><a href="https://twitter.com/filiposaz"><i class="fa fa-twitter"></i></a></li>\n					<li><a href="https://www.linkedin.com/in/filip-bouška-33a12ab3"><i class="fa fa-linkedin"></i></a></li>\n					<li><a href="mailto:bouska.filip@gmail.com"><i class="fa fa-envelope-o"></i></a></li>\n				</ul>\n			</div>\n			<a class="pull" href="/blog"><i class="fa fa-angle-double-down"></i></a>\n		</section>\n		'), Spacebars.include(view.lookupTemplate("blog")), "\n	");
}));

}).call(this);
