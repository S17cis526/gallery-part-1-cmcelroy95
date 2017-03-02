/** @module router */

module.exports = Router;

var url = require('url');

function Router() {
  this._getRoutes = [];
  this._getActions = [];

}

function pathToRegularExpression(path) {
  var tokens = path.split('/');
  var keys = [];
  var parts = tokens.map(function(token) {
    if(token.charAt(0) == ":"){
      keys.push(token.slice(1));
      return "(\\w+)"
    }
    else {
      return token;
    }
  });
  var regexp = new RegExp('^' + parts.join('/') + '/?$');\
  return {
    regexp: regexp,
    keys: keys
  }
}

Router.prototype.get = function(path, handler){
  var path = pathToRegularExpression(path);
  route.handler = handler;
  this._getRoutes.push(route);

}

Router.prototype.post = function(path, handler){
  var path = pathToRegularExpression(path);
  route.handler = handler;
  this._getRoutes.push(route);
}

Router.prototype.route = function(req, res) {
  var urlParts = url.parse(req.url);
  switch(req.method) {
    case 'get':
    var route = this._getRoutes;
      for(var i = 0; i < this._getRoutes.length; i++){
        var match = route.regexp.exec(urlParts.pathname);
        if(match) {
          req.paramas = {};
          for(var j = 1; j < match.length; j++) {
            req.params[route.keys[j-1]] = match[j];
          }
          return this._getAction[i].handler(req, res);
        }
      }
      res.statusCode = 404;
      res.statusMessage = "resource not found";
      res.end();
      break;
    case 'post':
    for(var i = 0; i < this._postRoutes.length; i++){
      var match = this._postRoutes[i].exec(urlParts.pathname);
      if(match) {
        return this._getAction[i](req, res);
      }
    }
    default:
      res.statusCode = 400;
      res.statusMessage = "Unknown method " + req.method;
      console.error("Unknown method " + req.method);
      res.end("Unknown method " + req.method);
  }
}
