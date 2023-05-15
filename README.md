# Project Technical Documentation

## ReactJS Front-end
React JS Project Setup with Vite and Yarn
This readme file will guide you through the steps required to run a basic React JS project using Vite and Yarn. Please ensure that you have these tools installed before proceeding.

### Installation
SKIP THIS STEP: if node js is already installed
#### Installing Node.js
1. Go to the Node.js website at https://nodejs.org and download the Windows installer for the latest LTS (Long-term Support) version.
2. Run the installer and follow the instructions to complete the installation.
3. Verify that Node.js is installed correctly by opening a command prompt and running the following command:
```
node --version
```
This should display the version of Node.js that you just installed.

#### Installing Yarn
`SKIP THIS STEP: if yarn is already installed `
1. Go to the Yarn website at https://yarnpkg.com and download the Windows installer.
2. Run the installer and follow the instructions to complete the installation.
3. Verify that Yarn is installed correctly by opening a command prompt and running the following command:
```
yarn --version
```
This should display the version of Yarn that you just installed.

That's it! Now you should have Node.js and Yarn installed on your Windows machine.

#### Running the Front-end
1. Install the project dependencies using yarn:
```
yarn
```

2. To start the development server, run the following command:
```
yarn dev
```
This will start the development server at `http://localhost:5173`

#### Project Structure

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

## Node.js Back-end
#### Node.js Project Setup 

Installation

#### Installing Node.js
`SKIP THIS STEP: if node js is already installed `
1. Go to the Node.js website at https://nodejs.org and download the Windows installer for the latest LTS (Long-term Support) version.
2. Run the installer and follow the instructions to complete the installation.
3. Verify that Node.js is installed correctly by opening a command prompt and running the following command:
```
node --version
```
This should display the version of Node.js that you just installed.

#### Running the Project

1. Install the project dependencies using npm:
```
npm i
```

2. To start the development server, run the following command:
```
node server.js
```
This will start the development server at `http://localhost:8000`


## MongoDB DataStore

https://www.mongodb.com/atlas/database
Add any new ip to network access


## IPFS Document Sharing
#### Installation
wget https://dist.ipfs.tech/kubo/v0.19.0/kubo_v0.19.0_linux-amd64.tar.gz
tar -xvzf kubo_v0.19.0_linux-amd64.tar.gz
cd kubo
sudo bash install.sh
ipfs --version

JS-IPFS is being discontinued. Helia (modern IPFS JS implementation) is still under development. So we install the Go version, which is most popular and supports RPC API

#### Installing Python IPFS-API
pip install ipfs-api

#### Initializing
ipfs init
Run the ipfs cat command suggested on the terminal, after ipfs init
In a new terminal window: 
ipfs daemon

#### Test Adding files
Refer https://pypi.org/project/ipfs-api/

#### Viewing the content
Note down the unique Content Identifier (CID) such as  QmccfwfRg4N6Jx8V33hyG3SgkXhi6EqPZPzN9CATDBv54S, 
Goto Brave browser, and type in CID format: ipfs://QmccfwfRg4N6Jx8V33hyG3SgkXhi6EqPZPzN9CATDBv54S to view the file or type in URL format: https://ipfs.io/ipfs/QmccfwfRg4N6Jx8V33hyG3SgkXhi6EqPZPzN9CATDBv54S

## Algorand

#### Installation
git clone https://github.com/algorand/sandbox.git

#### Running Algorand Node
cd sandbox
./sandbox up (or ./sandbox up testnet for running testnet)

## SoulBound Token Flask API

#### Install requirements
pip install py-algorand-sdk
pip install flask 
pip install flask_cors

#### Running the SoulBound Token Flask API
python main.py

