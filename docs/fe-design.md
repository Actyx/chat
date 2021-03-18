# Design

Design conventions adopted in this project:

## Containers

A Container is a React component that does data fetching, runs business logic, and then renders its corresponding sub-component.

A Container does:

- Have access to Pond and get state of one or multiple Fishes
- Pass data to business logic which if valid in return will emit events to Pond
- Dispatch UI actions to change the global UI state
- Access global UI state which can be passed to the business logic or it sub-component
- Render related sub-component
- Handle callbacks for its sub-component

A container does not:

- Contain any UI styling
- Contain any view logic

Only a Container can have access to Pond, Fish state, and business logic.
A Container can be placed anywhere in the components tree and should be self-contained.

There is a separation between state for UI and state for Fishes, components down in the tree can change the UI global state using a convenient hook `useContext(DispatchContextUI)`, so changes to a Fish state is done only via callback to the Container by emitting events to Pond.

## Presentational components

A Presentational component is concerned with how things look and view logic.
It could visualize the global UI state and Dispatch actions to change it.
It does no access directly Fish state or emits events to Pond directly, it can do that indirectly via props and callback to a corresponding Container.
