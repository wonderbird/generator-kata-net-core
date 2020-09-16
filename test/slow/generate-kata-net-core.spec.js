const chai = require('chai');
const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

chai.should();

const TemporaryDirectory = require('./temporary-directory');

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

        const libraryProjectName = solutionName + librarySuffix;
        const libraryProjectDirectory = libraryProjectName;

        const testName = libraryProjectName + testSuffix;
        const testDirectory = testName;

        const applicationProjectName = solutionName + applicationSuffix;
        const applicationProjectDirectory = applicationProjectName;

        let solutionDirectory;
        var expectedFiles;

        beforeEach(function() {
            solutionDirectory = solutionName;
            expectedFiles = [];
        });

        function configureTestExecutionTimeout(mochaContext) {
            const maxTestExecutionDurationOnGithubInMilliseconds = 60000;
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

        function addFilesFromTemplatesToExpectedFiles() {
            expectedFiles.push(path.join(solutionDirectory, '.gitignore'));
            expectedFiles.push(path.join(solutionDirectory, 'README.md'));

            expectedFiles.push(path.join(solutionDirectory, 'tools', 'msxsl.exe'));
            expectedFiles.push(path.join(solutionDirectory, 'tools', 'dupfinder.xslt'));
            expectedFiles.push(path.join(solutionDirectory, 'tools', 'dupfinder.bat'));

            // TODO Replace the project name in the dupfinder.bat file
        }

        function defineExpectedFiles() {
            addSolutionFileToExpectedFiles();
            addLibraryProjectBuildOutputToExpectedFiles();
            addTestBuildOutputToExpectedFiles();
            addApplicationBuildOutputToExpectedFiles();
            addFilesFromTemplatesToExpectedFiles();
        }

        function compileGeneratedSolution() {
            if (solutionDirectory !== '.') {
                process.chdir(solutionDirectory);
            }

            spawnSync('dotnet', ['build']);

            if (solutionDirectory !== '.') {
                process.chdir("..");
            }
        }

        function cleanupTestExecutionDirectory(testExecutionDirectoryPath) {
            const testExecutionDirectory = new TemporaryDirectory(testExecutionDirectoryPath);
            testExecutionDirectory.delete();
        }

        var testRunDataSet = [
            { isSeparateSolutionDirEnabled: true, expectedSolutionDirectory: solutionName, description: "when solution directory is enabled, then create required files and directories in subfolder" },
            { isSeparateSolutionDirEnabled: false, expectedSolutionDirectory: ".", description: "when solution directory is disabled, then create required files and directories in current directory" }
        ];

        testRunDataSet.forEach(
            function(testRunData) {
                xit(testRunData.description,
                    function () {
                        configureTestExecutionTimeout(this);

                        return runGeneratorUnderTest()
                            .withPrompts({
                                solutionName: solutionName,
                                isSeparateSolutionDirEnabled: testRunData.isSeparateSolutionDirEnabled
                            })
                            .then(function (testExecutionDirectoryPath) {
                                solutionDirectory = testRunData.expectedSolutionDirectory;

                                compileGeneratedSolution();

                                defineExpectedFiles();
                                assert.file(expectedFiles);

                                cleanupTestExecutionDirectory(testExecutionDirectoryPath);
                            });
                    });
            })

        it('should replace the solution name in copied template files',
            function() {
                configureTestExecutionTimeout(this);

                return runGeneratorUnderTest()
                    .withPrompts({
                        solutionName: solutionName,
                        isSeparateSolutionDirEnabled: true
                    })
                    .then(function (testExecutionDirectoryPath) {
                        const filePath = path.join(testExecutionDirectoryPath, solutionDirectory, 'tools', 'dupfinder.bat')
                        const fileContents = fs.readFileSync(filePath, "utf8");

                        const regex = /enter/;
                        const isSolutionNameContained = fileContents.match(regex);

                        isSolutionNameContained[0].should.equal(solutionName);
                        cleanupTestExecutionDirectory(testExecutionDirectoryPath);
                    });

            });
    });
