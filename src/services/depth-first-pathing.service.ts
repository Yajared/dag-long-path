import { Edge } from "../types/edge";
import { Vertex } from "../types/vertex";
import { PathingService } from "./pathing.service";

class DepthFirstPathingService implements PathingService {
    longestPath(dag: Edge[], startingVertex: Vertex, useVisited: boolean = false): number[] {
        const nodeMap = new Map<number, Vertex[]>();

        // Traverse the DAG and assemble something like an n-ary tree
        for(let edge of dag) {
            if (!nodeMap.has(edge.from.id)) {
                nodeMap.set(edge.from.id, [edge.to]);
            }
            else {
                nodeMap.get(edge.from.id)!.push(edge.to);
            }
        }

        // Once the tree is created we can find the longest path, DFS seems suitable for that since we now have a tree
        return depthFirstTraversal(nodeMap, startingVertex, useVisited);
    }
}

function depthFirstTraversal(nodeMap: Map<number, Vertex[]>, startingVertex: Vertex, useVisited: boolean = false) {
    let traversalPath: number[] = [];
    let currentPath: number[] = []
    let traversalStack: number[] = [];
    let visited: Set<number> = new Set<number>();

    if(startingVertex) {
        traversalStack.push(startingVertex.id);
    }

    while(traversalStack?.length) {
        let expandNode: number = traversalStack.pop()!;
        if(useVisited) {
            visited.add(expandNode);
        }
        currentPath.push(expandNode);

        // Check Adjacent Nodes from node to expand
        const adjacentNodes = !visited.has(expandNode) && nodeMap.get(expandNode);
        if(adjacentNodes && adjacentNodes.length) {
            // It's important to push these in the correct (reverse) order to maintain our traversal path and keep our longest path intact
            for(let i = adjacentNodes.length - 1; i >= 0; i--) {
                traversalStack.push(adjacentNodes[i].id);
            }
        }
        else { // if nothing to expand check if this is a new longest path and update
            if(currentPath.length > traversalPath.length) {
                traversalPath = currentPath;
            }

            currentPath = []; // reset current path before looping
        }
    }

    return traversalPath;
}

export { DepthFirstPathingService };
