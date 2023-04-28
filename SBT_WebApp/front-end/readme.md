# React JS Project Setup with Vite and Yarn

This readme file will guide you through the steps required to run a basic React JS project using Vite and Yarn. Please ensure that you have these tools installed before proceeding.

# Installation
`SKIP THIS STEP: if node js is already installed `
### Installing Node.js
1. Go to the Node.js website at https://nodejs.org and download the Windows installer for the latest LTS (Long-term Support) version.
2. Run the installer and follow the instructions to complete the installation.
3. Verify that Node.js is installed correctly by opening a command prompt and running the following command:
```
node --version
```
This should display the version of Node.js that you just installed.

### Installing Yarn
`SKIP THIS STEP: if yarn is already installed `
1. Go to the Yarn website at https://yarnpkg.com and download the Windows installer.
2. Run the installer and follow the instructions to complete the installation.
3. Verify that Yarn is installed correctly by opening a command prompt and running the following command:
```
yarn --version
```
This should display the version of Yarn that you just installed.

`That's it! Now you should have Node.js and Yarn installed on your Windows machine.`


# Running the Project

1. Install the project dependencies using yarn:
```
yarn
```

2. To start the development server, run the following command:
```
yarn dev
```
This will start the development server at `http://localhost:5173`


# Project Structure

The project structure for a basic React JS project using Vite and Yarn is as follows:
```
    project-directory/
    ├── node_modules/
    ├── public/
    │   ├── index.html
    ├── src/
    ├── .gitignore
    ├── package.json
    ├── README.md
    ├── vite.config.js
    └── yarn.lock
```

- `node_modules/`: Directory containing the project dependencies.
- `public/`: Directory containing the public assets of the project.
- `index.html`: HTML file that will be served by the development server.
- `src/`: Directory containing the source code of the project.
- `.gitignore`: File specifying which files and directories should be ignored by Git.
- `package.json`: File specifying the project dependencies, scripts and metadata.
- `README.md`: This file.
- `vite.config.js`: Configuration file for Vite.
- `yarn.lock`: File specifying the exact versions of the project dependencies installed.


## Connecting to Flask

`services/` have all the APIs configurations and functions that are responsible to connect to backend server for CRUD operations.

1. Define the Flask server's base URL in src/services/config.js using the following syntax: 
```export const PY_BASE_URL = "FLASK_BASE_URL"```

2. Create a separate file for each backend resource (e.g., mint.js for MINT_SBT and revoke.js for REVOKE_SBT) in the services/ folder. These files should contain all the necessary API operation functions.

3. To connect the API functions to the view, navigate to the relevant component's file (e.g., src/Pages/mint/index.jsx).

4. Define a function that will handle the button click event, for example:
```
function handleSave() {
  // call the saveMintSBT() function here
}
```
5. Call the relevant API function (e.g., saveMintSBT()) inside the handleSave() function to perform the CRUD operation.
6. Ensure that the handleSave() function is called when the user clicks the button. For example:
```
<div className="page-footer-action">
  <Button onClick={handleSave}>Mint SBT</Button>
</div>
```