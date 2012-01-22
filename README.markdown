JavaScript cogitat, ergo est.

Example interaction in Node.js:

	> r = table(['a','b'], ['a','c'])                      // r relates a,b and a,c
	{ [Function] domain: { a: true, b: true, c: true } }
	> r('a','c')                                           // are a and c related?
	true
	> r('a','d')                                           // how about a and d?
	false
	> r = or(r, rel('a','d'))                              // add an extra relation to r
	{ [Function] domain: { a: true, b: true, c: true, d: true } }
	> r('a','d')                                           // see, it was added
	true
	> s = charg(r, lconst('a'))                            // new unary relation based on r
	{ [Function] domain: { a: true, b: true, c: true, d: true } }
	> s('b')                                               // lconst('a') maps 'b' -> ['a','b']
	true
	> exists(s)                                            // does r('a',x) for some x?
	true
	> all(s)                                               // how about for all x?
	false
	> all( charg(or(r, rel('a','a')), lconst('a')) )       // but true when r relates a to itself as well
	true
	> exists( charg(r, dbl) )                              // does r(x,x) for some x?
	false
	> // you get the idea...

