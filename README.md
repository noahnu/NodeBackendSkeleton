# Template: Backend Server

This is a template for a basic backend server.

## Prerequisites

A postgreSQL instance (v9.6+) must be setup and running.

`Node ^8.0.0` and `npm ^5.5.0` is required.

## Installation

To install dependencies, use `npm`:

```shell
$ npm install
```

Once the postgreSQL instance is running, to launch the server in watch mode (restarts on change detection & crash recovery):

```shell
$ npm run watch
```

Otherwise, to run without watch:

```shell
$ CONFIG_PATH=./.env npm start
```

Please see the Configuration section below for details on configuring server settings.

### Basic PostgreSQL Configuration

After installing PostgreSQL, launch the psql shell or in a command window:

```shell
$ psql -U <root>
```

The `<root>` on a fresh installation will be `postgres`, no password. In the PostgreSQL shell:

```shell
$ CREATE DATABASE <db_name>;
$ CREATE USER <db_user>;
$ GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <db_user>;
```

Following the `.env.template`, `<db_name>=template_test` and `<db_user>=template`. The password is blank.

## Testing & Documentation

`eslint` is used for linting. No rules have been configured. To lint the codebase, run:

```shell
$ npm run lint
```

No documentation generator is included in this template, although a `docs` directory is present.

For unit and some integration testing, `mocha` is installed alongside `chai`. To run tests:

```shell
$ npm test
```

## Directory Structure

```
/
├── bin/ # executable scripts for development automation
├── docs/ # auto-generated documentation
├── tests/ # tests cases
└── src/ # root of server code
    ├── policies/ # server middleware describing how app handles data
    ├── routes/ # handlers for URI mappings for public API
    └── storage/ # database controller (dao) and orm models
```

## Configuring Server

There are two ways to pass in configuration parameters to the application. In order of greatest precedence, you can pass in parameters via environment variables:

```shell
$ PORT=1337 DB_HOST=localhost npm start
```

or via a local `.env` file of the format:

```
# comment
KEY=VALUE

PORT=1337
DB_HOST=localhost
```

A `.env.template` template is also supplied.

The application will default to the root project directory to find the `.env` file, however a path can also be supplied via the environment variable `CONFIG_PATH`.

## Security & Input Validation

[`helmet`](https://helmetjs.github.io) has been included as an express middleware to automatically enforce recommended security policies. Note that it is not a complete security solution. For user input validation, [`express-validator`](https://github.com/ctavan/express-validator) is included.

For a basic analysis of the safety of dependencies, you can use the [Node Security Platform](https://github.com/nodesecurity/nsp) tool:

```shell
$ npm install -g nsp
$ nsp check
```
