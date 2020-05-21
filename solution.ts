class Thing {
    size: number;
    constructor(size: number) {
        this.size = size;
    }
}

class Ball extends Thing {}
class Hole extends Thing {}

interface MatchResult {
    result: [Hole, Ball][];
    unassignedHoles: Hole[];
    unassignedBalls: Ball[];
}

function findMatch(holes: Hole[], balls: Ball[]): MatchResult {
    if (!holes && !balls) {
        return;
    }

    function descSize(a: Thing, b: Thing) {
        return b.size - a.size;
    }

    const sortedHoles = holes.sort(descSize);
    const sortedBalls = balls.sort(descSize);

    let i = 0;
    let j = 0;
    let result = [];
    let unassignedBalls = [];
    let unassignedHoles = [];
    while (i < sortedHoles.length && j < sortedBalls.length) {
        if (sortedHoles[i].size >= sortedBalls[j].size) {
            result.push([sortedHoles[i], sortedBalls[j]]);
            i++;
            j++;
        } else {
            unassignedBalls.push(sortedBalls[j]);
            j++;
        }
    }
    while (i < sortedHoles.length) {
        unassignedHoles.push(sortedHoles[i++]);
    }
    while (j < sortedBalls.length) {
        unassignedBalls.push(sortedBalls[j++]);
    }
    const res: MatchResult = {
        result,
        unassignedBalls,
        unassignedHoles,
    };
    return res;
}

// Tests

// Normal
console.log(
    findMatch(
        [new Hole(1), new Hole(4), new Hole(7)],
        [new Ball(3), new Ball(8)]
    )
); // result: [3, 5], unassigned balls: [8], unassigned holes: [1, 4]

// Only Holes
console.log(findMatch([new Hole(3), new Hole(4)], [])); // unassigned holes: [3, 4]

// Only Balls
console.log(findMatch([], [new Ball(11), new Ball(12)])); // unassigned balls: [11, 12]
