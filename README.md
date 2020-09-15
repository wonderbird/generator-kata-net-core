# Yeoman Generator: .NET Core Kata

![Build Status Badge](https://github.com/wonderbird/generator-kata-net-core/workflows/Node.js%20CI/badge.svg)

[Yeoman](https://yeoman.io) generator for empty C# code kata using .NET Core

This generator creates a C# .NET Core solution with the following projects:

* a library project (DLL),
* an associated [xUnit](https://xunit.github.io) test project,
* a console application with a reference to the library project,
* static files: `README.md`, `.gitignore`
* a `tools` folder with a shortcut to [JetBrains dupfinder](https://www.jetbrains.com/help/resharper/dupFinder.html) for checking code duplication

The generator asks for the solution name interactively. From that name it derives the names of the generated projects.

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

## References

- Yeoman: "Homepage", https://yeoman.io, last visited on Aug. 24, 2020.
- Yeoman: "Writing your own yeoman generator", https://yeoman.io/authoring/index.html, last visited on Aug. 24, 2020.
- Yeoman: "Yeoman Github repository", https://github.com/yeoman, last visited on Aug. 24, 2020.
- xUnit.net: "xUnit Github repository", https://xunit.github.io, last visited on Aug. 24, 2020.
- Microsoft Corporation: "Unit testing C# in .NET Core using dotnet test and xUnit", https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test, last visited on Aug. 24, 2020.