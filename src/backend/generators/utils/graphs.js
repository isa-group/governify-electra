'use strict';

const logger = require('./../../logger');

function paths({
    graph = [],
    from,
    to
}, path = []) {
    const linkedNodes = save(nodes.bind(null, graph));
    return explore(from, to);

    function explore(currNode, to, paths = []) {
        path.push(currNode);
        for (let linkedNode of linkedNodes(currNode)) {
            if (linkedNode === to) {
                let result = path.slice(); // copy values
                result.push(to);
                paths.push(result);
                continue;
            }
            // do not re-explore edges
            if (!hasEdgeBeenFollowedInPath({
                    edge: {
                        from: currNode,
                        to: linkedNode
                    },
                    path
                })) {
                explore(linkedNode, to, paths);
            }
        }
        path.pop(); // sub-graph fully explored            
        return paths;
    }
}

/** 
 * Get all nodes linked 
 * to from `node`.
 */
function nodes(graph, node) {
    return graph.reduce((p, c) => {
        (c[0] === node) && p.push(c[1]);
        return p;
    }, []);
}

/**
 * Has an edge been followed 
 * in the given path?
 */
function hasEdgeBeenFollowedInPath({
    edge,
    path
}) {
    var indices = allIndices(path, edge.from);
    return indices.some(i => path[i + 1] === edge.to);
}

/**
 * Utility to get all indices of 
 * values matching `val` in `arr`.
 */
function allIndices(arr, val) {
    var indices = [],
        i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            indices.push(i);
        }
    }
    return indices;
}

/**
 * Avoids recalculating linked 
 * nodes.
 */
function save(fn) {
    const cache = new Map();
    return function () {
        var key = JSON.stringify(arguments);
        var cached = cache.get(key);
        if (cached) {
            return cached;
        }
        cached = fn.apply(this, arguments)
        cache.set(key, cached);
        return cached;
    };
}


module.exports = {
    "paths": paths,
    "nodes": nodes
}