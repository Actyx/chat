# Actyx internal chat

A simplified version of Slack for internal usage (POC) based on our technology.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

ActyxOS v.1.1.2
Actyx CLI or Node Manager

## Run the app

Make sure you download ActyxOS, for docker run:

```bash
docker run --name actyxos -it --rm -e AX_DEV_MODE=1 -v actyxos-data:/data --privileged -p 4001:4001 -p 4457:4457 -p 127.0.0.1:4243:4243 -p 127.0.0.1:4454:4454 actyx/os
```

Open Node Manager or use Actyx CLI to set up the node settings, use content from file [settings/prod.actyx.os.json](./settings/prod.actyx.os.json).

In this project folder visit `src` then run `yarn start`.

Happy chatting!

## Available Scripts

In the project directory `app`, you can run the following scripts after using `nvm use`:

### `yarn install`

To install all project dependencies.

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

### `yarn storybook`

Open StoryBook with UI components in isolation visible at <http://localhost:6006/>

### `yarn build-storybook`

Build Storybook as a static web application.

### `check-deps`

Detect circular dependencies.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Design

Design conventions:

### Containers

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

## Folder structure

- src/business-logic: Contains all Fishes and related business logic

- src/business-logic/example-fish/logic: Contains business logic for a specific Fish, can emit events to the Pond

- src/business-logic/example-fish/logic/logic-types.ts: Contains types related to the result of the business logic

- src/business-logic/example-fish/events.ts: Utility functions to create events and to send them to Pond, they do not contain any business logic

- src/business-logic/example-fish/reducer.ts: The Fish reducer user in the `onEvent` function, the logic for each event type is written in separate functions

- src/business-logic/example-fish/types.ts: All types related to a Fish, focusing on events, state, and tags

- src/business-logic/example-fish/example-fish.ts: The actual Fish

## Naming conventions

- UI types should be postfixed with UI, for example, `ChannelListUI`

- React component files should be written in `CamelCase`, all other files are should be named in `kebab-case`

### src/ui

Contains all React components and related stories, it also includes Containers and related UI utilities function.

- src/ui/ExampleScreen: Each subfolder represents a main screen in the application

- src/ui/common: Reusable components like Button

## Application configurations

You can confiture several aspects of the application by using object `chat` in `package.json` file:

| Name    | Description                             |
|---------|-----------------------------------------|
| appName | Application name visible in the sidebar |

## Tips and tricks

- Click near the top/left corner of your browser viewport to open an application state inspector

## Others docs

[Events and Tags](./docs/events-tags-overview.md)

[Features and Use cases](./docs/features-use-cases.md)
