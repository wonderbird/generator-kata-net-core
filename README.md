# Yeoman Generator: .NET Core Kata

![Build Status Badge](https://github.com/wonderbird/generator-kata-net-core/workflows/Node.js%20CI/badge.svg)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/wonderbird/generator-kata-net-core)](https://codeclimate.com/github/wonderbird/generator-kata-net-core)
[![Code Maintainability](https://img.shields.io/codeclimate/maintainability-percentage/wonderbird/generator-kata-net-core)](https://codeclimate.com/github/wonderbird/generator-kata-net-core)
[![Issues in Code](https://img.shields.io/codeclimate/issues/wonderbird/generator-kata-net-core)](https://codeclimate.com/github/wonderbird/generator-kata-net-core/issues)
[![Technical Debt](https://img.shields.io/codeclimate/tech-debt/wonderbird/generator-kata-net-core)](https://codeclimate.com/github/wonderbird/generator-kata-net-core)

[Yeoman](https://yeoman.io) generator for empty C# code kata using .NET Core

This generator creates a C# .NET Core solution with the following projects:

* a library project (DLL),
* an associated [xUnit](https://xunit.github.io) test project,
* a console application with a reference to the library project,
* a `tools` folder with a shortcut to [JetBrains dupfinder](https://www.jetbrains.com/help/resharper/dupFinder.html) for checking code duplication
* static files: `README.md`, `.gitignore`
* if desired: `LICENSE` (MIT)

The generator asks for the solution name interactively. From that name it derives the names of the generated projects.

## Thanks

Many thanks to [JetBrains](https://www.jetbrains.com/?from=generator-kata-net-core) who provide an [Open Source License](https://www.jetbrains.com/community/opensource/) for this project ❤️.

## Installation and Usage

### Installation

You need Node.js (LTS or current version) to run the generator.

After you have cloned this repository, execute the following steps once in a command terminal:

* Install the [Yeoman scaffolding tool](https://yeoman.io/) according to the instructions: `npm install -g yo`
* Clone this repository and navigate into the cloned folder
  * Install the required npm packages: `npm install`
  * Check whether everything works: `npm run test`
  * Link the cloned directory to your node modules: `npm link` (see [Yeoman: Creating a generator](https://yeoman.io/authoring/index.html))

### Usage

From any directory execute

```sh
yo kata-net-core
```

Yeoman will prompt for the solution name. Then the generator will create a folder with the specified name. Inside it will create the solution and the projects mentioned above.

To build and test your project

```sh
cd <solution folder>
dotnet build
dotnet test
dotnet run --project "<solution name>.App"
```

### Updating the Generator

```sh
cd <cloned generator folder>
git pull
npm install
npm run test
```

## Development

### Detailed Design Documentation

Detailed design documentation can be found in the [doc](doc) folder.

### Building this Project

```sh
npm install
npm run test
npm run lint
```

To continuously monitor the fast running unit tests while developing

```sh
npm run test:watch
```

Before pushing to github, please run all tests including the long running end-to-end tests and the linter

```sh
npm run test
npm run lint
```

### Debugging

For Visual Studio Code, debugger launch configurations allow connecting to the yeoman generator and to the mocha unit tests, respectively.

To launch the Node.js debugger from a console window, enter

```sh
npm run debug
```

### Analyzing the Code Complexity

```sh
npm run complexity
```

The command above uses the [complexity-report-html](https://github.com/igneel64/complexity-report-html) module to generate two reports

* `.complexity-report/app.html` shows an overview of complexity by file and function for the `app` folder
* `.complexity-report/test.html` shows an overview of complexity by file and function for the `test` folder

## References

- Yeoman: [Yeoman Homepage](https://yeoman.io)
- Yeoman: [Writing your own yeoman generator](https://yeoman.io/authoring/index.html)
- Yeoman: [API documentation](https://yeoman.github.io/generator/)
- Yeoman: [Debugging Generators](https://yeoman.io/authoring/debugging.html)
- Yeoman: [Yeoman Github repository](https://github.com/yeoman)
- Microsoft: [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- Microsoft: [Unit testing C# in .NET Core using dotnet test and xUnit](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test)
- xUnit.net: [xUnit](https://xunit.net/)
