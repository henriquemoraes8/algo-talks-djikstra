class Vertex {
    constructor(cost, endpoint) {
        this.cost = cost;
        this.endpoint = endpoint;
    }
}

Vertex.prototype.valueOf = function() {
    return -this.cost;
};

module.exports = Vertex;