(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var check = Package.check.check;
var Match = Package.check.Match;
var robots = Package['gadicohen:robots-txt'].robots;

/* Package-scope variables */
var sitemaps, k;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/gadicohen_sitemaps/packages/gadicohen_sitemaps.js                                 //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
(function () {                                                                                // 1
                                                                                              // 2
/////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                     //     // 4
// packages/gadicohen:sitemaps/sitemaps.js                                             //     // 5
//                                                                                     //     // 6
/////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                       //     // 8
/*                                                                                     // 1   // 9
 * http://en.wikipedia.org/wiki/Site_map                                               // 2   // 10
 * http://www.sitemaps.org/index.html                                                  // 3   // 11
 */                                                                                    // 4   // 12
                                                                                       // 5   // 13
sitemaps = {                                                                           // 6   // 14
  _list: {},                                                                           // 7   // 15
  _config: {                                                                           // 8   // 16
    rootUrl: undefined                                                                 // 9   // 17
  },                                                                                   // 10  // 18
  _configHooks: {}                                                                     // 11  // 19
};                                                                                     // 12  // 20
                                                                                       // 13  // 21
function configSet(key, value) {                                                       // 14  // 22
  if (sitemaps._configHooks[key])                                                      // 15  // 23
    sitemaps._configHooks[key](key, value, sitemaps._config[key]);                     // 16  // 24
  sitemaps._config[key] = value;                                                       // 17  // 25
}                                                                                      // 18  // 26
                                                                                       // 19  // 27
sitemaps.config = function(key, value) {                                               // 20  // 28
  if (!value && _.isObject(key)) {                                                     // 21  // 29
    for (k in key)                                                                     // 22  // 30
      configSet(k, key[k]);                                                            // 23  // 31
  } else {                                                                             // 24  // 32
    configSet(key, value);                                                             // 25  // 33
  }                                                                                    // 26  // 34
};                                                                                     // 27  // 35
                                                                                       // 28  // 36
if (typeof Number.lpad === "undefined") {                                              // 29  // 37
  Number.prototype.lpad = function(length) {                                           // 30  // 38
    "use strict";                                                                      // 31  // 39
    var str = this.toString();                                                         // 32  // 40
    while (str.length < length) {                                                      // 33  // 41
      str = "0" + str;                                                                 // 34  // 42
    }                                                                                  // 35  // 43
    return str;                                                                        // 36  // 44
  };                                                                                   // 37  // 45
}                                                                                      // 38  // 46
                                                                                       // 39  // 47
var urlStart = Meteor.absoluteUrl();                                                   // 40  // 48
                                                                                       // 41  // 49
sitemaps._configHooks.rootUrl = function(key, value) {                                 // 42  // 50
  urlStart = value || Meteor.absoluteUrl();                                            // 43  // 51
};                                                                                     // 44  // 52
                                                                                       // 45  // 53
var prepareUrl = sitemaps._prepareUrl = function(url) {                                // 46  // 54
  if (url.match(/^https?:\/\//))                                                       // 47  // 55
    return url;                                                                        // 48  // 56
  else {                                                                               // 49  // 57
    return urlStart + encodeURI(url.replace(/^\//, '')).replace(/&/g, '&amp;');        // 50  // 58
  }                                                                                    // 51  // 59
};                                                                                     // 52  // 60
                                                                                       // 53  // 61
// TODO: 1) gzip, 2) sitemap index + other types + sitemap for old content             // 54  // 62
var Fiber = Npm.require('fibers');                                                     // 55  // 63
WebApp.connectHandlers.use(function(req, res, next) {                                  // 56  // 64
  new Fiber(function() {                                                               // 57  // 65
    "use strict";                                                                      // 58  // 66
    var out, pages, urls;                                                              // 59  // 67
                                                                                       // 60  // 68
    urls = _.keys(sitemaps._list);                                                     // 61  // 69
    if (!_.contains(urls, req.url))                                                    // 62  // 70
      return next();                                                                   // 63  // 71
                                                                                       // 64  // 72
    pages = sitemaps._list[req.url];                                                   // 65  // 73
    if (_.isFunction(pages))                                                           // 66  // 74
      pages = pages();                                                                 // 67  // 75
    else if (!_.isArray(pages))                                                        // 68  // 76
      throw new TypeError("sitemaps.add() expects an array or function");              // 69  // 77
                                                                                       // 70  // 78
    // The header is added later once we know which namespaces we need                 // 71  // 79
    out = '';                                                                          // 72  // 80
    var namespaces = {};                                                               // 73  // 81
                                                                                       // 74  // 82
    var w3cDateTimeTS, date;                                                           // 75  // 83
    _.each(pages, function(page) {                                                     // 76  // 84
                                                                                       // 77  // 85
      out += '  <url>\n'                                                               // 78  // 86
        + '    <loc>' + prepareUrl(page.page) + '</loc>\n';                            // 79  // 87
                                                                                       // 80  // 88
      if (page.lastmod) {                                                              // 81  // 89
        date = new Date(page.lastmod);                                                 // 82  // 90
        w3cDateTimeTS = date.getUTCFullYear() + '-'                                    // 83  // 91
          + (date.getUTCMonth()+1).lpad(2) + '-'                                       // 84  // 92
          + date.getUTCDate().lpad(2) + 'T'                                            // 85  // 93
          + date.getUTCHours().lpad(2) + ':'                                           // 86  // 94
          + date.getUTCMinutes().lpad(2) + ':'                                         // 87  // 95
          + date.getUTCSeconds().lpad(2) + '+00:00';                                   // 88  // 96
        out += '    <lastmod>' + w3cDateTimeTS + '</lastmod>\n';                       // 89  // 97
      }                                                                                // 90  // 98
                                                                                       // 91  // 99
      if (page.changefreq)                                                             // 92  // 100
        out += '    <changefreq>' + page.changefreq + '</changefreq>\n';               // 93  // 101
                                                                                       // 94  // 102
      if (page.priority)                                                               // 95  // 103
        out += '    <priority>' + page.priority + '</priority>\n';                     // 96  // 104
                                                                                       // 97  // 105
      if (page.xhtmlLinks) {                                                           // 98  // 106
        namespaces.xhtml = true;                                                       // 99  // 107
        if (!_.isArray(page.xhtmlLinks))                                               // 100
          page.xhtmlLinks = [page.xhtmlLinks];                                         // 101
        _.each(page.xhtmlLinks, function(link) {                                       // 102
          out += '    <xhtml:link \n';                                                 // 103
          if (link.href)                                                               // 104
            link.href = prepareUrl(link.href);                                         // 105
          for (var key in link)                                                        // 106
            out += '      ' + key + '="' + link[key] + '"\n';                          // 107
          out += '      />\n';                                                         // 108
        });                                                                            // 109
      }                                                                                // 110
                                                                                       // 111
      _.each(['image', 'video'], function(tag) {                                       // 112
        var tagS = tag+'s';                                                            // 113
        if (page[tagS]) {                                                              // 114
          namespaces[tag] = true;                                                      // 115
          if (!_.isArray(page[tagS]))                                                  // 116
            page[tagS] = [page[tagS]];                                                 // 117
                                                                                       // 118
          _.each(page[tagS], function(data) {                                          // 119
            out += '      <'+tag+':'+tag+'> \n';                                       // 120
                                                                                       // 121
            for (var key in data) {                                                    // 122
              if (key == 'loc' || key.match(/_loc$/))                                  // 123
                data[key] = prepareUrl(data[key]);                                     // 124
              out += '        <'+tag+':'+key+'>' + data[key] + '</'+tag+':'+key+'>\n'; // 125
            }                                                                          // 126
                                                                                       // 127
            out += '      </'+tag+':'+tag+'> \n';                                      // 128
          });                                                                          // 129
        }                                                                              // 130
      });                                                                              // 131
                                                                                       // 132
      out  += '   </url>\n\n';                                                         // 133
    });                                                                                // 134
                                                                                       // 135
    out += '</urlset>\n';                                                              // 136
                                                                                       // 137
    // We do this last so we know which namesapces to add                              // 138
    var header = '<?xml version="1.0" encoding="UTF-8"?>\n'                            // 139
      + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';                 // 140
                                                                                       // 141
    if (namespaces.xhtml)                                                              // 142
      header += '\n  xmlns:xhtml="http://www.w3.org/1999/xhtml"';                      // 143
    if (namespaces.image)                                                              // 144
      header += '\n  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';   // 145
    if (namespaces.video)                                                              // 146
      header += '\n  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"';   // 147
    header += '>\n';                                                                   // 148
                                                                                       // 149
    out = header + out;                                                                // 150
                                                                                       // 151
    res.writeHead(200, {'Content-Type': 'application/xml'});                           // 152
    res.end(out, 'utf8');                                                              // 153
    return;                                                                            // 154
  }).run();                                                                            // 155
});                                                                                    // 156
                                                                                       // 157
sitemaps.add = function(url, func) {                                                   // 158
  "use strict";                                                                        // 159
  check(url, String);                                                                  // 160
  if (url.charAt(0) !== '/')                                                           // 161
    url = '/' + url;                                                                   // 162
                                                                                       // 163
  sitemaps._list[url] = func;                                                          // 164
  robots.addLine('Sitemap: ' + prepareUrl(url));                                       // 165
};                                                                                     // 166
                                                                                       // 167
/*                                                                                     // 168
sitemaps.add('/sitemap.xml', function() {                                              // 169
  // 'page' is reqired                                                                 // 170
  // 'lastmod', 'changefreq', 'priority' are optional.                                 // 171
  return [                                                                             // 172
    { page: 'x', lastmod: new Date().getTime() },                                      // 173
    { page: 'y', lastmod: new Date().getTime(), changefreq: 'monthly' },               // 174
    { page: 'z', lastmod: new Date().getTime(), changefreq: 'monthly', priority: 0.8 } // 175
  ];                                                                                   // 176
});                                                                                    // 177
*/                                                                                     // 178
                                                                                       // 179
/////////////////////////////////////////////////////////////////////////////////////////     // 188
                                                                                              // 189
}).call(this);                                                                                // 190
                                                                                              // 191
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['gadicohen:sitemaps'] = {
  sitemaps: sitemaps
};

})();

//# sourceMappingURL=gadicohen_sitemaps.js.map
