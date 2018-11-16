function getNodes() {
  var testNodeBuilder = NodeBuilder();

  var p = testNodeBuilder.getNode('p');
  var r = testNodeBuilder.getNode('r');
  var a = testNodeBuilder.getNode('a');
  var o = testNodeBuilder.getNode('o');

  // p <----> r <----> a
  // ^        ^
  // |        |
  // +------> o
  testNodeBuilder.linkNodes(p, [r, o]);
  testNodeBuilder.linkNodes(r, [a, o]);
  testNodeBuilder.linkNodes(o, [r]);

  // return [p, r, o];
  return [p, r, a, o];
}

function deadEnd(path) {
  console.log('_______');
  console.log(path.join('-'));
}

function tmpDeadEnd(path) {
  console.log('------- tre ?');
  console.log(path.join('-'));
}

function visited(node, path){
  var found = path.indexOf(node.getId())  !== -1;

  return found;
}

function buildPath(currentNode, path, possibleCombinations, level) {

  if (!level) {
    level = 0;
  }

  var adjacentNodes = currentNode.getNeighbors();

//  console.log(level, 'from ', currentNode.getId(), '-> ', Util.getNeighborsIds(currentNode).join('|'));

    adjacentNodes = adjacentNodes.filter(function(n){
      return !visited(n, path)
    });

  if (path) {
    path.push(currentNode.getId())
  }

  if (!adjacentNodes.length) {
    //deadEnd(path);
    possibleCombinations.push(path);
    return;
  }

  adjacentNodes.forEach(function (n) {
    buildPath(n, path.slice(0), possibleCombinations, level + 1);
  })
}

describe("wordBuilder", function () {


  var nodes;
  var dictionary;

  beforeEach(function () {
    nodes = getNodes();
    dictionary = getDictionary();
  });

  afterEach(function () {
    resetCounter();
    dictionary.reset();
  });


  describe("Node builder", function () {

    it('should build linkage', function () {
      var r = nodes[1];

      expect(r.getName()).toEqual('r');
      expect(r.getId()).toEqual(1);
      expect(Util.getNeighborsIds(r)).toEqual([0,2,3]);
    });
  });

  describe("Dictionary", function () {
    it('should add word to dictionary', function () {
      dictionary.addWord('qwe');

      expect(dictionary.getWordsAsArray()).toEqual(['qwe']);

      dictionary.addWord('qwe1');
      expect(dictionary.getWordsAsArray()).toEqual(['qwe', 'qwe1']);
      dictionary.addWord('qwe');
      expect(dictionary.getWordsAsArray()).toEqual(['qwe', 'qwe1']);

      dictionary.reset();
      expect(dictionary.getWordsAsArray()).toEqual([]);
    });
  });


  fit('should return letter sequence and mark node as visited', function () {
    var possibleCombinations = [];
    var possibleWords = [];
    var graph = GraphBuilder();
    graph.addNodes(nodes);
    var expectedWords = ['pra', 'pro', 'pora'];

    buildPath(nodes[0], [], possibleCombinations);

    possibleCombinations.forEach(function (path, i) {
      let word = graph.buildWord(path);
      console.log(i, path.join('|'), word);
      possibleWords.push(word)
    });


    expectedWords.forEach(function (word) {
       expect(possibleWords.indexOf(word) !== -1).toBeTruthy();
    })

  });

  describe("GraphBuilder", function () {

    var graph;

    beforeEach(function () {
      graph = GraphBuilder();
    });

    it('should add nodes and compose a word from a path', function () {
      graph.addNodes(nodes);

      expect(graph.buildWord([0, 1, 3])).toEqual('pro');
      expect(graph.buildWord([0, 3, 1, 2])).toEqual('pora');
    });
  });
});
