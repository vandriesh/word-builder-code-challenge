var p = buildNode('p');
var o = buildNode('o');
var r = buildNode('r');
// var n4 = buildNode('n');
// var n5 = buildNode('p');
// var n6 = buildNode('o');
// var n7 = buildNode('c');
// var n8 = buildNode('c');

// linkBuilder(n1, [n2, n3, n4]);
// linkBuilder(n2, [n1, n3, n5]);
// linkBuilder(n3, [n1, n5, n4]);

linkBuilder(p, [r]);
linkBuilder(r, [o]);

var nodes = [p,o,r];




// assert('not visited should be false', p.isVisited(), false);

// assert('next should be o', whereToGoNext(p).getName(), o.getName());
// p.visit()
// assert('not visited should be true', p.isVisited(), true);

// var result = addLetter(o);
// assert('shold return name and make node visigted', result, 'o');
// assert('and make node visigted', o.isVisited(), true);


// var res = generateWordStartingWith(p);


var res = generateWords(nodes);

console.log('res:', res);
