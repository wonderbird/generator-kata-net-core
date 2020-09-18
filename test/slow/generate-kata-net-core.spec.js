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
            { isSeparateSolutionDirEnabled: true, expectedSolutionDirectory: solutionName, descriptionWhenStatement: 'when solution directory is enabled', descriptionThenStatement: 'then create required files and directories in subfolder' },
            { isSeparateSolutionDirEnabled: false, expectedSolutionDirectory: ".", descriptionWhenStatement: 'when solution directory is disabled', descriptionThenStatement: 'then create required files and directories in current directory' }
        ];

        testRunDataSet.forEach(
            function(testRunData) {
                describe('GIVEN generator has been executed with prompts',
                    function() {
                        let _testExecutionDirectoryPath;

                        before(function() {
                            configureTestExecutionTimeout(this);

                            return runGeneratorUnderTest()
                                .withPrompts({
                                    solutionName: solutionName,
                                    isSeparateSolutionDirEnabled: testRunData.isSeparateSolutionDirEnabled
                                })
                                .then(function (testExecutionDirectoryPath) {
                                    _testExecutionDirectoryPath = testExecutionDirectoryPath;

                                    solutionDirectory = testRunData.expectedSolutionDirectory;
                                    compileGeneratedSolution();
                            });
                        });

                        after(function() {
                            cleanupTestExecutionDirectory(_testExecutionDirectoryPath);
                        });

                        describe(testRunData.descriptionWhenStatement,
                            function() {
                                it(testRunData.descriptionThenStatement,
                                    function () {
                                        solutionDirectory = testRunData.expectedSolutionDirectory;
                                        defineExpectedFiles();
                                        assert.file(expectedFiles);
                                    });

                                it('then replace the solution name in copied dupfinder.bat file',
                                    function() {
                                        solutionDirectory = testRunData.expectedSolutionDirectory;

                                        const filePath = path.join(_testExecutionDirectoryPath, solutionDirectory, 'tools', 'dupfinder.bat')
                                        const fileContents = fs.readFileSync(filePath, "utf8");

                                        const regexWithoutDelimiters = `set SOLUTION_NAME=${solutionName}`;
                                        const multilineOption = 'm';
                                        const regex = new RegExp(`^${regexWithoutDelimiters}$`, multilineOption);
                                        const matchResult = fileContents.match(regex);

                                        matchResult[0].should.equal(regexWithoutDelimiters);
                                    });
                            });
                    })
            })
    });
