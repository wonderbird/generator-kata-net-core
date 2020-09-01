var path = require('path');
var spawnSync = require('child_process').spawnSync;
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var TemporaryDirectory = require('./temporary-directory');

describe('yo kata-net-core',
    function () {

        const solutionExtension = '.sln';
        const dllExtension = '.dll';
        const exeExtension = '.dll';

        const librarySuffix = '.Lib';
        const testSuffix = '.Tests';
        const applicationSuffix = '.App';

        const buildOutputDirectory = 'bin';
        const debugOutputDirectory = 'Debug';
        const netStandardDirectory = 'netstandard2.0';
        const netCoreAppDirectory = 'netcoreapp3.1';

        const solutionName = 'GeneratedSolutionCanBeDeleted';

        const solutionDirectory = solutionName;
        const libraryProjectName = solutionName + librarySuffix;
        const libraryProjectDirectory = libraryProjectName;

        const testName = libraryProjectName + testSuffix;
        const testDirectory = testName;

        const applicationProjectName = solutionName + applicationSuffix;
        const applicationProjectDirectory = applicationProjectName;

        var expectedFiles = [];

        function configureTestExecutionTimeout(mochaContext) {
            const maxTestExecutionDurationOnGithubInMilliseconds = 60000;
            const safetyTimeoutMarginInMilliseconds = 5000;
            const testExecutionTimeoutInMilliseconds =
                maxTestExecutionDurationOnGithubInMilliseconds + safetyTimeoutMarginInMilliseconds;

            mochaContext.timeout(testExecutionTimeoutInMilliseconds);
        }

        function runGeneratorUnderTest() {
            return helpers.run(path.join(__dirname, '../../app'))
                .withPrompts({ solutionName: solutionName });
        }

        function addSolutionFileToExpectedFiles() {
            const solutionFileName = solutionName + solutionExtension;
            const fullPathToSolutionFile = path.join(solutionDirectory, solutionFileName);

            expectedFiles.push(fullPathToSolutionFile);
        }

        function addLibraryProjectBuildOutputToExpectedFiles() {
            const libraryProjectBuildDirectory = path.join(libraryProjectDirectory, buildOutputDirectory, debugOutputDirectory, netStandardDirectory);
            const libraryProjectBuildArtifact = libraryProjectName + dllExtension;

            const fullPathToProjectBuildArtifact =
                path.join(solutionDirectory, libraryProjectBuildDirectory, libraryProjectBuildArtifact);

            expectedFiles.push(fullPathToProjectBuildArtifact);
        }

        function addTestBuildOutputToExpectedFiles() {
            const testBuildDirectory = path.join(testDirectory, buildOutputDirectory, debugOutputDirectory, netCoreAppDirectory);
            const testBuildArtifact = testName + dllExtension;

            const fullPathToTestBuildArtifact =
                path.join(solutionDirectory, testBuildDirectory, testBuildArtifact);

            expectedFiles.push(fullPathToTestBuildArtifact);
        }

        function addApplicationBuildOutputToExpectedFiles() {
            const applicationBuildDirectory = path.join(applicationProjectDirectory, buildOutputDirectory, debugOutputDirectory, netCoreAppDirectory);
            const applicationBuildArtifact = applicationProjectName + exeExtension;

            const fullPathToApplicationBuildArtifact =
                path.join(solutionDirectory, applicationBuildDirectory, applicationBuildArtifact);

            expectedFiles.push(fullPathToApplicationBuildArtifact);
        }

        function addReadmeToExpectedFiles() {
            const fullPathToReadme = path.join(solutionDirectory, 'README.md');
            expectedFiles.push(fullPathToReadme);
        }

        function defineExpectedFiles() {
            addSolutionFileToExpectedFiles();
            addLibraryProjectBuildOutputToExpectedFiles();
            addTestBuildOutputToExpectedFiles();
            addApplicationBuildOutputToExpectedFiles();            
            addReadmeToExpectedFiles();
        }

        function compileGeneratedSolution() {
            process.chdir(solutionName);
            spawnSync('dotnet', ['build']);
            process.chdir("..");
        }

        function cleanupTestExecutionDirectory(testExecutionDirectoryPath) {
            const testExecutionDirectory = new TemporaryDirectory(testExecutionDirectoryPath);
            testExecutionDirectory.delete();
        }

        it('should create required files and directories',
            function () {
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
