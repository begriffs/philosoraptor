//////////// Helper function for relation domains ///////////////////////////////

function arrays_equal(a,b) { return !!a && !!b && !(a<b || b<a); }

function domain_union(a, b) {
  var r = {};
  for(var x in a) { if(a.hasOwnProperty(x)) r[x] = true; }
  for(var x in b) { if(b.hasOwnProperty(x)) r[x] = true; }
  return r;
}

function domain(a) {
  var r = {};
  for(var x in a) { if(a.hasOwnProperty(x)) r[a[x]] = true; }
  return r;
}

//////////// Relation creation //////////////////////////////////////////////////

function rel() {
  var expected = [].slice.call(arguments);
  var ret = function() {
    return arrays_equal([].slice.call(arguments), expected);
  }
  ret.domain = domain(expected);
  return ret;
}

function table() {
  var ret = rel();
  for(var r in arguments) {
    ret = or(ret, rel.apply(rel, arguments[r]));
  }
  return ret;
}

//////////// Truth table relation combinations //////////////////////////////////

function and(r, s) {
  var ret = function() { return r.apply(r, arguments) && s.apply(s, arguments); };
  ret.domain = domain_union(r.domain, s.domain);
  return ret;
}

function or(r, s) {
  var ret = function() { return r.apply(r, arguments) || s.apply(s, arguments); };
  ret.domain = domain_union(r.domain, s.domain);
  return ret;
}

function not(r) {
  var ret = function() { return !r.apply(r, arguments); };
  ret.domain = r.domain;
  return ret;
}

//////////// Argument modifiers used with all() and each() //////////////////////

function charg(r, change) {
  var ret = function() { return r.apply(r, change([].slice.call(arguments))); };
  ret.domain = r.domain;
  return ret;
}
function dbl(args) { args.push(args[0]); return args; }
function lconst(c) { return function(args) { args.unshift(c); return args; }; }
function rconst(c) { return function(args) { args.push(c); return args; }; }

//////////// Quantifiers for unary relations ////////////////////////////////////

function all(r) {
  for(var elt in r.domain) {
    if(!r(elt)) {
      return false;
    }
  }
  return true;
}

function exists(r) {
  return !all(not(r));
}

