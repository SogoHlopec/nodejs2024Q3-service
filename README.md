# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- DOcker - [Download & Install Docker](https://docs.docker.com/get-started/get-docker/).

## Downloading

```
git clone https://github.com/SogoHlopec/nodejs2024Q3-service.git
get checkout part-2
```

## Installing NPM modules

```
npm install
```

## Working with application
Start docker app

```
npm run start:docker
```

Stop docker app
```
npm run stop:docker
```

Vulnerabilities scanning
First dowdload a package for Docker ([Docs](https://docs.docker.com/scout/install/))
```
curl -fsSL https://raw.githubusercontent.com/docker/scout-cli/main/install.sh -o install-scout.sh
sh install-scout.sh
```
Then start script
```
npm run scan:docker
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
