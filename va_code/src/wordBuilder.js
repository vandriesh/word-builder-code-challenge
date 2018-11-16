var ids = 0

function GraphBuilder() {

  var graph = {};


  function addNode(node) {
    graph[node.getId()] = node;
  }

  return {
    addNode: addNode,
    addNodes: function (nodes) {
      nodes.forEach(function (node) {
        addNode(node);
      });
    },

    buildWord: function (path) {
      var word = '';

      path.forEach(function (id) {
        word += graph[id].getName();
      });

      return word;
    },
    reset: function () {
      graph = {}
    }
  }
}

function resetCounter() {
  ids = 0
}


function NodeBuilder() {
  ids = 0;

  return {
    getNode: function (name) {
      return buildNode(name, ids++);
    },
    reset: function () {
      ids = 0;
    },
    linkNodes: function (node, links) {
      node.linkToNeighbors(links);

      links.forEach(function (neighbor) {
        neighbor.linkToNeighbor(node);
      })
    }
  }
}

var theGraph = GraphBuilder();

function showNeighbors(neighbors) {
  return neighbors.map(function (n) {
    return n.getName()
  }).join('|')
}

function buildNode(name, id) {
  var _neighborsIds = [];
  var _neighbors = {};
  var _visitorId = null;
  var _visited = false;
  var _id = id;


  return {

    getId: function () {
      return _id;
    },
    getName: function () {
      return name;
    },
    reset: function () {
      _visitorId = null;
      _visited = false;
    },
    visit: function () {
      _visited = true;
    },
    visitedBy: function (visitorId) {
      _visitorId = visitorId
    },
    toString: function () {
      return (name + '[' + this.getId() + ']');
    },
    linkToNeighbors(neighbors) {
      var api = this;

      neighbors.forEach(function (neighbor) {
        api.linkToNeighbor(neighbor)
      });
    },
    linkToNeighbor: function (neighbor) {
      var id = neighbor.getId();

      if (_neighbors[id]) {
        return;
      }

      _neighborsIds.push(id);
      _neighbors[id] = neighbor;
    },
    getNeighbors: function () {
      return _neighborsIds.map(function (id) {
        return _neighbors[id]
      });
    },
    // isVisited: function () {
    //   return _visited;
    // },
    // getVisitorId() {
    //   return _visitorId;
    // }
  }
}

var Util = {
  getNeighborsIds: function (node) {
    return node.getNeighbors().map(function (n) {
      return n.getId()
    });
  },
  getNeighborsInfo: function (node) {
    return node.getNeighbors().map(function (n) {
      return n.getName()
    }).join('|');
  },
};


function showIds(nodes) {
  return nodes.map(function (n) {
    return n.getId()
  }).join('|')
}


function linkBuilder(nodeStart, neighbors) {
  nodeStart.linkToNeighbors(neighbors);

  neighbors.forEach(function (node) {
    node.linkToNeighbor(nodeStart);
  })
}

function generateWordStartingWith(node, accumulator, dictionary) {
  node.visit();
  var word = node.getName();
  var nextNodes = node.getNeighbors();
  accumulator += word;

  if (nextNodes.length === 0) {
    dictionary.addWord(accumulator);
    //node.reset();
    return
  }

  //console.log(node.getId(), '->', nextNodes.map(function(node){ return node.getId()}).join('|'));

  nextNodes.forEach(function (nextNode) {
    if (!nextNode.isVisited()) {
      generateWordStartingWith(nextNode, accumulator, dictionary)
    }
    nextNode.reset();
  });

  // var nextNode = whereToGoNext(node);
  //
  // if (nextNode) {
  //   console.log('next', nextNode.getName());
  // } else {
  //   console.log('done');
  // }
  //
  // if (word.length > 1) {
  //   // TODO: add to dictionary
  // }

}

var globalDictionay = ['a', 'bc', 'porn', 'por'];

function hasWord(word) {
  return globalDictionay.indexOf(word) !== -1;
}

function getDictionary() {
  var dictArray = [];
  var dict = {};


  return {
    reset: function () {
      dictArray = [];
      dict = {}
    },
    addWord: function (word) {
      if (dict[word]) {
        return false;
      }

      dict[word] = true;
      dictArray.push(word);
    },
    getWordsAsArray: function () {
      return dictArray;
    }
  }
}

var dictionary = getDictionary();


function generateWords(nodes) {
  nodes.forEach(function (node) {
    var word = generateWordStartingWith(node,);
    reset(nodes);
    dictionary.addWord(word);
  })
}
