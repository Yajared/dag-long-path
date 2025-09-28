import { Vertex } from "../types/vertex";
import { Edge } from "../types/edge";

// Function to find the longest path in a Directed Acyclic Graph (DAG)
interface PathingService {
    longestPath(dag: Edge[], startingVertex: Vertex, useVisited?: boolean): number[];
}

export { PathingService };