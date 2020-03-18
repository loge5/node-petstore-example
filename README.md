# Example implementation of the openapi/swagger petstore

This is just an example for a node.js microservice using express.

* [Installation](#Installation)
* [API-Documentation](#API-Documentation)
* [Unit-Tests](#Unit-Tests)
* [Development](#Development)
  * [Style Guide](#Style-Guide)
  * [Commit Messages](#Commit-Messages)
  * [Releasing](#Releasing)

# Installation

Download required modules:

`npm install`

Start service:

`npm start`

# API Documentation

* We use OpenAPI Specification (swagger): https://www.openapis.org/
* The specification is in this file: [openapi.yaml](swaggerui-dist/openapi.yaml)
* This project also includes swagger-ui wich is using the root-route (`/index.html`)

# Unit-Tests

Used Modules:
* https://mochajs.org/
* http://chaijs.com
* https://github.com/istanbuljs/nyc

Tests are defined in:

`/test.js`

Add tests:

```
//...
mocha.addFile('lib/logger.spec');
//...
```

Run tests:

`npm test`

Check code coverage (creates "./coverage/index.html"):

`npm run-script cover`

# Development

## Style Guide

We use this linter: https://github.com/standard/standard

Auto-Format:

`npm run-script format`

## Commit Messages

We use [standard-version](https://github.com/conventional-changelog/standard-version), please format your commit messages like this:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### Types

1. `fix`: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
2. `feat`: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
3. `BREAKING CHANGE`: a commit that has the text BREAKING CHANGE: at the beginning of its optional body or footer section introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of commits of any type.
4. Others: commit types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends `chore`, `docs`, `style`, `refactor`, `perf`, `test`, and others.

## Releasing
For creating a new release, checkout the `master` branch and run:

`npm run release`

or for first:

`npm run release -- --first-release`
