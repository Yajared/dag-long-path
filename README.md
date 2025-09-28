Environment:
I wanted to setup something simple and self-contained with some unit tests to look at different cases, so I chose a minimal Typescript project with jest unit tests.

Setup:
npm i

Run:
npm test

Solution:
After a couple initial attempts, I realized the graph could be expressed as an n-ary tree where I didn't need to worry that the DAG I'm given would have any loops or cycles. This simplified the problem quite a bit and once I began to think of it in terms of a tree, some of the basic algorithms of tree traversal seemed like the way to go. Breadth first search was the first one I thought of and tried, but didn't really make sense when applied to a longest path problem. Depth-first search on the other hand made more sense.

Questions:
1. Does the solution work for larger graphs?
I thought it might, but after reading around a bit.. for much larger graphs this type of DFS has time complexity that can grow exponentially if the number of paths is large enough.

2. Yes, I believe there's optimizations that could be made in the initial building of the tree that might allow for more efficient solutions. I dug into this a bit and it seems that there are algorithms that apply a Topological sorting that improves the order of traversal first, before using dynamic programming to achieve better time complexity with DFS. And, there also appears to be a non-DFS solution that runs in linear time.

3. For some graphs with a lot of paths, it appears that it could be as bad as O(2^n). This seems to be one primary issue for attempting to solve the problem with this solution.

4. Yes, I included a Test Case that fails with my initial naive implementation. Apparently, this naive DFS approach runs into issues with a graph that has a diamond structure, as it fails to find the correct longest path. I then implemented a visited Set which restricts the traversal from exploring paths starting from nodes that have already been visited. It appears that this solves the issue of a diamond structured graph.
