//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var EJSON = Package.ejson.EJSON;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

/* Package-scope variables */
var InjectData;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteorhacks_inject-data/lib/namespace.js                 //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
InjectData = {};                                                     // 1
///////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteorhacks_inject-data/lib/utils.js                     //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
InjectData._encode = function(ejson) {                               // 1
  var ejsonString = EJSON.stringify(ejson);                          // 2
  return encodeURIComponent(ejsonString);                            // 3
};                                                                   // 4
                                                                     // 5
InjectData._decode = function(encodedEjson) {                        // 6
  var decodedEjsonString = decodeURIComponent(encodedEjson);         // 7
  if(!decodedEjsonString) return null;                               // 8
                                                                     // 9
  return EJSON.parse(decodedEjsonString);                            // 10
};                                                                   // 11
                                                                     // 12
///////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteorhacks_inject-data/lib/client.js                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.startup(function() {                                          // 1
  var dom = $('script[type="text/inject-data"]', document);          // 2
  var injectedDataString = $.trim(dom.text());                       // 3
  InjectData._data = InjectData._decode(injectedDataString) || {};   // 4
});                                                                  // 5
                                                                     // 6
InjectData.getData = function(key, callback) {                       // 7
  Meteor.startup(function() {                                        // 8
    callback(InjectData._data[key]);                                 // 9
  });                                                                // 10
};                                                                   // 11
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:inject-data'] = {
  InjectData: InjectData
};

})();
