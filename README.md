# Yeoman Generator: .NET Core Kata

![Build Status Badge](https://github.com/wonderbird/generator-kata-net-core/workflows/Node.js%20CI/badge.svg)

Yeoman generator for empty C# code kata using .NET Core

## Status

This is a work in progress started on July 1, 2020.
Considering the current holiday season in Germany and my development speed I suggest you come back by end of August.

## Development

### Prerequisite

The following steps only need to be executed once:

* Install the [Yeoman scaffolding tool](https://yeoman.io/) according to the instructions: `npm install -g yo`
* Link this project's base directory to your node modules as described in the [Yeoman: Creating a generator](https://yeoman.io/authoring/index.html) page: `npm link`

### Building the project

```sh
npm install
npm run test
npm run lint
```

To continuously monitor the tests while developing

```sh
npm run test -- --watch
```

## References

- https://yeoman.io/authoring/index.html
- https://github.com/yeoman