class PriorityQueue {
    constructor() {
        this.queue = [null];
    }

    push(element) {
        this.queue.push(element);
        this.heapify_up(this.queue.length - 1);
    }

    pop() {
        if (this.queue.length <= 1) return null;
        this.swap(1, this.queue.length - 1);
        let max = this.queue.pop();
        this.heapify_down(1);
        return max;
    }

    length() {
        return this.queue.length - 1;
    }

    heapify_up(index) {
        let parentIndex = Math.floor(index / 2);
        if (index <= 1 || this.queue[parentIndex] >= this.queue[index]) {
            return
        }
        this.swap(index, parentIndex);
        this.heapify_up(parentIndex);
    }

    heapify_down(index) {
        let { queue } = this;
        let left = index * 2;
        let right = index * 2 + 1;
        if (left > this.queue.size - 1) {
            return;
        }
        if (queue[left] > queue[index] && queue[left] > queue[right]) {
            this.swap(left, index);
            this.heapify_down(left);
        } else if (queue[right] && queue[right] > queue[index] && queue[right] > queue[index]) {
            this.swap(right, index);
            this.heapify_down(right);
        }
    }

    swap(index1, index2) {
        [this.queue[index1], this.queue[index2]] = [this.queue[index2], this.queue[index1]];
    }
}

module.exports = PriorityQueue;