import { DepthFirstPathingService } from "../../src/services/depth-first-pathing.service";
import { PathingService } from "../../src/services/pathing.service";

describe("Depth-First Pathing Service", () => {
    let pathingService: PathingService;

    beforeEach(() => {
        pathingService = new DepthFirstPathingService();
    });

  const basicDAG = [
    { from: { id: 1 }, to: { id: 2 } },
    { from: { id: 2 }, to: { id: 3 } }
  ];

  const smallDAG = [
    { from: { id: 1 }, to: { id: 2 } },
    { from: { id: 2 }, to: { id: 3 } },
    { from: { id: 3 }, to: { id: 5 } },
    { from: { id: 3 }, to: { id: 4 } },
    { from: { id: 5 }, to: { id: 7 } }
  ];

  const nonDeterministicDAG = [
    { from: { id: 1 }, to: { id: 2 } },
    { from: { id: 1 }, to: { id: 3 } },
    { from: { id: 3 }, to: { id: 5 } },
    { from: { id: 3 }, to: { id: 4 } },
    { from: { id: 2 }, to: { id: 7 } },
    { from: { id: 7 }, to: { id: 8 } },
    { from: { id: 8 }, to: { id: 9 } },
    { from: { id: 9 }, to: { id: 10 } },
    { from: { id: 9 }, to: { id: 11 } },
    { from: { id: 9 }, to: { id: 12 } }
  ];

  const diamondDAG = [
    { from: {id: 1 }, to: {id: 2 } },
    { from: {id: 1 }, to: {id: 3 } },
    { from: {id: 2 }, to: {id: 4 } },
    { from: {id: 3 }, to: {id: 4 } },
    { from: {id: 3 }, to: {id: 5 } },
    { from: {id: 4 }, to: {id: 6 } },
    { from: {id: 5 }, to: {id: 6 } },
    { from: {id: 6 }, to: {id: 7 } },
    { from: {id: 6 }, to: {id: 8 } },
    { from: {id: 8 }, to: {id: 9 } },
  ];
  
  it("should return a path", () => {
    const startingVertex = { id: 1 };
    expect(pathingService.longestPath(basicDAG, startingVertex)).toBeDefined();
  });

  it("should return the longest path in a simple DAG", () => {
    const startingVertex = { id: 1 };
    const result = pathingService.longestPath(basicDAG, startingVertex);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should return the longest path starting from an arbitrary vertex (in the middle)", () => {
    const startingVertex = { id: 2 };
    const result = pathingService.longestPath(basicDAG, startingVertex);
    expect(result).toEqual([2, 3]);
  });

  it("should return the longest path in a small DAG with a couple paths", () => {
    const startingVertex = { id: 1 };
    const result = pathingService.longestPath(smallDAG, startingVertex);

    expect(result).toEqual([1, 2, 3, 5, 7]);
  });

  it("should return a correct path even in a non-deterministic case where the order of the edges would likely determine the resulting longest path", () => {
    const startingVertex = { id: 1 };
    const ACCEPTABLE_VALUES = [[1, 2, 7, 8, 9, 10], [1, 2, 7, 8, 9, 11], [1, 2, 7, 8, 9, 12]];

    const result = pathingService.longestPath(nonDeterministicDAG, startingVertex);
    expect(ACCEPTABLE_VALUES).toContainEqual(result);
  });

  // Edge Case: Diamond Structured graph is problematic for naive implementation
  it("should not return the correct path for a diamond structure when a visited set is not utilized", () => {
    const startingVertex = { id: 1 };

    const result = pathingService.longestPath(diamondDAG, startingVertex);
    expect(result).not.toEqual([1, 2, 4, 6, 8, 9]);
  });

  it("should return the correct path for a diamond structure when a visited set *is* utilized", () => {
    const startingVertex = { id: 1 };

    const result = pathingService.longestPath(diamondDAG, startingVertex, true);
    expect(result).not.toEqual([1, 2, 4, 6, 8, 9]);
  });
});
