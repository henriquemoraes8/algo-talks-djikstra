const parseRoutes = require('./bexs-route-finder');
const Node = require('./node');
const Vertex = require('./vertex');

let actual = new Node(10, 'MIA', 'GRU - MIA');
assert(actual.cost, 10, 'test Node cost');
assert(actual.path, 'GRU - MIA', 'test Node path');
assert(actual.location, 'MIA', 'test Node location');

actual = new Vertex(10, 'MIA');
assert(actual.cost, 10, 'test Vertex cost');
assert(actual.endpoint, 'MIA', 'test Vertex endpoint');

let desc = 'GRU to CDG path';
actual = parseRoutes('input-file.txt', 'GRU', 'CDG');
let expectedPath = 'GRU - BRC - SCL - ORL - CDG';
assert(actual.path, expectedPath, desc);
desc = 'GRU to CDG cost';
assert(actual.cost, 43, desc);

desc = 'BRC to ORL path';
actual = parseRoutes('input-file.txt', 'BRC', 'ORL');
expectedPath = 'BRC - SCL - ORL';
assert(actual.path, expectedPath, desc);
desc = 'BRC to ORL cost';
assert(actual.cost, 25, desc);

desc = 'Multiple costs same route';
actual = parseRoutes('input-file-one-route.txt', 'GRU', 'BRC');
assert(actual.cost, 10, desc);

desc = 'Same starting and end point';
actual = parseRoutes('input-file.txt', 'GRU', 'GRU');
assert(actual.cost, 0, desc);

desc = 'Unknown starting point';
assertThrow(parseRoutes, ['input-file.txt', 'MIA', 'CDG'], desc);

desc = 'Unknown ending point';
assertThrow(parseRoutes, ['input-file.txt', 'MIA', 'CDG'], desc);

desc = 'No possible path';
assertThrow(parseRoutes, ['input-file-not-connected.txt', 'GRU', 'ORL'], desc);

function assert(actual, expected, desc) {
    if (actual === expected) {
        console.log('PASS: ' + desc);
    } else {
        console.log('FAIL: ' + desc + ' -> expected "' + expected + '" but got "' + actual + '"');
    }
}

function assertThrow(func, args, desc) {
    try {
        func(...args);
        console.log('FAIL: ' + desc + ' -> should throw error for args ' + args)
    } catch (e) {
        console.log('PASS: ' + desc);
    }
}