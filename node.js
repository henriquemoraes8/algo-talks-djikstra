class Node {
    constructor(cost, location, path) {
        this.cost = cost;
        this.location = location;
        this.path = path;
    }
}

Node.prototype.valueOf = function() {
    return -this.cost;
};

module.exports = Node;