# Install dependencies
npm install

# Run dev
npm run dev

# Detail
The original repo: https://github.com/murongqimiao/DAG-diagram
This repo is pure dag, which only focus on dag interaction and layout. The difference is listed below.
Thanks murongqimiao for creating such great repo!

This repo uses vue to build page and handle events, vuex to deal with data, iview to use components, dagre to calculate layout for nodes and edges.

# Difference from the original repo
1. Remove irrelevant code which has nothing to do with dag itself.
2. Remove multiple ports, which means each node has only one in-port and one out-port.
3. Abstract Node component, move from the origin index.vue
4. Using enum for dag events and component type.
5. Detect redundant edges between two nodes, rewrite circle detection.(Using queue)
6. Fix id generating bug, use hash instead.
7. Remove session storage stuff, using vuex store instead.
8. Update file structure.
9. Adjust Node bus size according to current svg scale.
10. Add auto layout for nodes and edges.
11. Add expand and shrink limit of svg.
12. Refactor a lot of code to make it more readable and clear.

