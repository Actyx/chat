# Actyx interla chat

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

Design conventions

- Containers are only responsible for wiring UI with business logic, they accept the fish state and a pond instance when necessary, they are the only components that will receive a pond instance
- A Pond instance is passed only to a Container, so passing pond down in the components tree and emitting events from there is not allowed
- Only the business logic written in `logic.ts` can emit events to the pond

## Folder structure

### src/business-logic

Contains all fishes and related business logic.

### logic.ts

Contains business logic, can emit events to the pond.

### make-events.ts

Utility functions to create events, they do not contain any business logic.

### reducer.ts

The fish reducer user in the `onEvent` function, the logic for each event type is written in separate functions.

### types.ts

All types related to a Fish, focusing on events, state, and tags.

### your-name-fish.ts

The actual fish

### src/ui

Contains all UI React components, each subfolder represents a main screen in the app
