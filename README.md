# Impact Analyzer Client

Impact Analyzer Client is a sample web client for the [Impact Analyzer](https://github.com/saulotoledo/impact-analyzer) application. It allows tagging data in tables uploaded to the system.

## Concepts and tools

This application is written in TypeScript and uses the React framework. Some of the concepts and tools exercised here are:

- Basic React concepts
- Material UI components
- Formik for forms
- Yup for validation
- React Router
- Axios HTTP library
- Development containers using Docker and Visual Studio Code
- Husky for git hooks
- ESLint

As this is just a sample application, there are limitations:

- The supported CSV files should be comma-separated, and strings should be between double quotes.
  Any other settings will not work with this application.
- Changing the parent of a tag in the tags tree is currently not supported in the API. Therefore,
  the parent field is disabled when editing tags.
- Translations are hardcoded. Ideally, we should use a framework for internationalization, such as [react-i18next](https://react.i18next.com/), but that was unimportant for this example.
- The functionality for adding new tags is not implemented.
- Several elements are not mobile-friendly, such as tables and the floating window for adding new tags.
- We do not use libraries for state management.
- Some components can be reworked.

## Instructions for running the application

Create a copy of the `.env.example` file to `.env`. The backend application URL is defined here.

If you use Visual Studio Code, start the development container.
Instructions for setting them up are [in this link](https://code.visualstudio.com/docs/devcontainers/containers).

If you use another IDE, you must set up your React development environment.

You also need the [application API](https://github.com/saulotoledo/impact-analyzer) up and running.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
