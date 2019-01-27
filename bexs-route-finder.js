const fs = require("fs");
const Vertex = require("./vertex");
const PriorityQueue = require('./priority-queue');
const Node = require('./node');

function main() {
    if (!process.argv[2]) return;
    let result = parseRoutes(process.argv[2], process.argv[3], process.argv[4]);
    console.log('Best route: ' + result.path + ' at cost of: ' + result.cost);
}

function parseRoutes(fileName, start, end) {
    const text = fs.readFileSync(fileName, "utf-8");

    let graph = {};
    text.split("\n").forEach(line => parseLine(line.split(',')));

    return calculateMinimumPath(graph, start, end);

    function parseLine(line) {
        if (line.length !== 3) {
            return;
        }
        //sanitize data
        let location1 = line[0].match(/[A-Z]+/)[0];
        let location2 = line[1].match(/[A-Z]+/)[0];
        let cost = parseInt(line[2].match(/[0-9]+/)[0]);

        if (!graph[location1]) { graph[location1] = [] }
        if (!graph[location2]) { graph[location2] = [] }

        graph[location1].push(new Vertex(cost, location2));
        graph[location2].push(new Vertex(cost, location1));
    }
}

function calculateMinimumPath(graph, start, end) {
    if (!graph[start]) throw 'Invalid starting point';
    if (!graph[end]) throw 'Invalid ending point';

    let priorityQueue = new PriorityQueue();
    priorityQueue.push(new Node(0, start, start));
    let costs = {};
    let seen = new Set();
    initializeCosts();

    while (priorityQueue.length() > 0) {
        let node = priorityQueue.pop();
        for (let vertex of graph[node.location]) {
            if (seen.has(vertex.endpoint)) { continue }

            let newCost = costs[node.location].cost + vertex.cost;
            let nextNode = costs[vertex.endpoint];
            if (nextNode.cost > newCost) {
                nextNode.cost = newCost;
                nextNode.path = node.path + ' - ' + nextNode.location;
                priorityQueue.push(nextNode);
            }
        }

        seen.add(node.location);
        if (node.location === end) {
            return node;
        }
    }

    throw 'No route available to this destination';

    function initializeCosts() {
        for (let key of Object.keys(graph)) {
            costs[key] = new Node(key === start ? 0 : Number.POSITIVE_INFINITY, key, '');
        }
    }
}

main();

module.exports = parseRoutes;
