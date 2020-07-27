var path = require('path');
var spawnSync = require('child_process').spawnSync;
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var TemporaryDirectory = require('./temporary-directory');

describe('yo kata-net-core',
    function () {

        const solutionExtension = '.sln';
        const projectExtension = '.csproj';
        const librarySuffix = '.Lib';

        const solutionName = 'SampleKata';

        const solutionDirectory = solutionName;
        const projectName = solutionName + librarySuffix;
        const projectDirectory = projectName;

        var expectedFiles = [];

        function configureTestExecutionTimeout(mochaContext) {
            const maxTestExecutionDurationOnGithubInMilliseconds = 37000;
            const safetyTimeoutMarginInMilliseconds = 5000;
            const testExecutionTimeoutInMilliseconds =
                maxTestExecutionDurationOnGithubInMilliseconds + safetyTimeoutMarginInMilliseconds;

            mochaContext.timeout(testExecutionTimeoutInMilliseconds);
        }

        function runGeneratorUnderTest() {
            return helpers.run(path.join(__dirname, '../../app'));
        }

        function addSolutionFileToExpectedFiles() {
            const solutionFileName = solutionName + solutionExtension;
            const fullPathToSolutionFile = path.join(solutionDirectory, solutionFileName);

            expectedFiles.push(fullPathToSolutionFile);
        }

        function addProjectFileToExpectedFiles() {
            const projectFileName = projectName + projectExtension;
            const fullPathToProjectFile = path.join(solutionDirectory, projectDirectory, projectFileName);

            expectedFiles.push(fullPathToProjectFile);
        }

        function addProjectBuildOutputToExpectedFiles() {
            const dllExtension = '.dll';
            const buildOutputDirectory = 'bin';
            const debugOutputDirectory = 'Debug';
            const netStandardDirectory = 'netstandard2.0';

            const projectBuildDirectory = path.join(projectDirectory, buildOutputDirectory, debugOutputDirectory, netStandardDirectory);
            const projectBuildArtifact = projectName + dllExtension;

            const fullPathToProjectBuildArtifact =
                path.join(solutionDirectory, projectBuildDirectory, projectBuildArtifact);

            expectedFiles.push(fullPathToProjectBuildArtifact);
        }

        function defineExpectedFiles() {
            addSolutionFileToExpectedFiles();
            addProjectFileToExpectedFiles();
            addProjectBuildOutputToExpectedFiles();
        }

        function compileGeneratedSolution() {
            process.chdir("SampleKata");
            spawnSync('dotnet', ['build']);
            process.chdir("..");
        }

        function cleanupTestExecutionDirectory(testExecutionDirectoryPath) {
            const testExecutionDirectory = new TemporaryDirectory(testExecutionDirectoryPath);
            testExecutionDirectory.deleteContents();
        }

        it('should create required files and directories',
            function () {
                // TODO Generate a unit test project and add it to the solution -- see https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test
                configureTestExecutionTimeout(this);

                return runGeneratorUnderTest()
                    .then(function (testExecutionDirectoryPath) {
                        compileGeneratedSolution();

                        defineExpectedFiles();
                        assert.file(expectedFiles);

                        cleanupTestExecutionDirectory(testExecutionDirectoryPath);
                    });
            });
    });
