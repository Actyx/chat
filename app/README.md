# Actyx internal chat

A simplified version of Slack for internal usage (POC) based on our technology.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Design

Design conventions:

### Containers

Containers are React components responsible for wiring UI with business logic, they accept the Fish state and a Pond instance when necessary. A Pond instance is passed to Containers only, so passing Pond down in the components tree and emitting events from there is not allowed.
Only a Container can have access to the business logic and can emit events to the Pond.

There is a separation between state for UI and state for Fishes, components down in the tree can change the UI state using a convenient hook `useContext(DispatchContextUI)`, so changes to a Fish state is done only via callback to the Container by emitting events to Pond.

## Folder structure

- src/business-logic: Contains all Fishes and related business logic

- src/business-logic/example-fish/logic.ts: Contains business logic for a specific Fish, can emit events to the Pond

- src/business-logic/example-fish/events.ts: Utility functions to create events and to send them to Pond, they do not contain any business logic

- src/business-logic/example-fish/reducer.ts: The Fish reducer user in the `onEvent` function, the logic for each event type is written in separate functions

- src/business-logic/example-fish/types.ts: All types related to a Fish, focusing on events, state, and tags

- src/business-logic/example-fish/example-fish.ts: The actual Fish

### src/ui

Contains all UI React components, reusable components, and related utilities function.

- src/ui/ExampleScreen: Each subfolder represents a main screen in the application
