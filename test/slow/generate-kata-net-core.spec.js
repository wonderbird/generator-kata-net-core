const chai = require('chai');
const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const ExpectedFilesBuilder = require('../helpers/expected-files-builder');

chai.should();

const TemporaryDirectory = require('./temporary-directory');

describe('yo kata-net-core',
    function () {

        const solutionName = 'GeneratedSolutionCanBeDeleted';
        const authorName = 'Unit Test Author Name';

        function configureTestExecutionTimeout(mochaContext) {
            const maxTestExecutionDurationOnGithubInMilliseconds = 70000;
            const safetyTimeoutMarginInMilliseconds = 5000;
            const testExecutionTimeoutInMilliseconds =
                maxTestExecutionDurationOnGithubInMilliseconds + safetyTimeoutMarginInMilliseconds;

            mochaContext.timeout(testExecutionTimeoutInMilliseconds);
        }

        function runGeneratorUnderTest() {
            return helpers.run(path.join(__dirname, '../../app'));
        }

        function compileGeneratedSolution(solutionDirectory) {
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

        function assertReplacementInFile(testExecutionDirectory, solutionDirectory, relativeFilePath, replacement, numberOfOccurrences) {
            const fullPath = path.join(testExecutionDirectory, solutionDirectory, relativeFilePath);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            const regexString = `${replacement}`;
            const multilineOption = 'm';
            const globalOption = 'g';
            const regex = new RegExp(regexString, multilineOption + globalOption);
            const matchResult = fileContents.match(regex);

            matchResult.length.should.equal(numberOfOccurrences);
        }
        
        [
            { isSeparateSolutionDirEnabled: true, isMitLicenseSelected: true, expectedSolutionDirectory: solutionName },
            { isSeparateSolutionDirEnabled: false, isMitLicenseSelected: false, expectedSolutionDirectory: "." }
        ].forEach(generatorPromptsConfiguration =>
            describe('GIVEN generator has been executed with prompts',
                function () {
                    let savedTestExecutionDirectoryPath;

                    before(function () {
                        configureTestExecutionTimeout(this);

                        return runGeneratorUnderTest()
                            .withPrompts({
                                solutionName: solutionName,
                                isSeparateSolutionDirEnabled: generatorPromptsConfiguration.isSeparateSolutionDirEnabled,
                                isMitLicenseSelected: generatorPromptsConfiguration.isMitLicenseSelected,
                                authorName: authorName,
                            })
                            .then(function (testExecutionDirectoryPath) {
                                savedTestExecutionDirectoryPath = testExecutionDirectoryPath;

                                compileGeneratedSolution(generatorPromptsConfiguration.expectedSolutionDirectory);

                                return this;
                            });
                    });

                    after(function () {
                        cleanupTestExecutionDirectory(savedTestExecutionDirectoryPath);
                    });

                    describe(`when solution directory is ${generatorPromptsConfiguration.expectedSolutionDirectory} `
                        + `and MIT license is ${generatorPromptsConfiguration.isMitLicenseSelected} `,
                        function () {
                            it(`then create required files and directories in directory "${generatorPromptsConfiguration.expectedSolutionDirectory}"`,
                                function () {
                                    const solutionDirectory = generatorPromptsConfiguration.expectedSolutionDirectory;
                                    const expectedFiles = new ExpectedFilesBuilder(solutionName)
                                        .withSolutionDirectory(solutionDirectory)
                                        .withMitLicense(generatorPromptsConfiguration.isMitLicenseSelected)
                                        .build();

                                    assert.file(expectedFiles);
                                });

                            [
                                { replacement: solutionName, expectedNumberOfOccurrences: 3, relativePath: 'README.md' },
                                { replacement: solutionName, expectedNumberOfOccurrences: 1, relativePath: path.join('tools', 'dupfinder.bat') },
                            ].forEach(testCaseData =>
                                it(`then insert "${testCaseData.replacement}" ${testCaseData.expectedNumberOfOccurrences} time(s) in copied file ${testCaseData.relativePath}`,
                                    () => assertReplacementInFile(savedTestExecutionDirectoryPath,
                                                                  generatorPromptsConfiguration.expectedSolutionDirectory,
                                                                  testCaseData.relativePath,
                                                                  testCaseData.replacement,
                                                                  testCaseData.expectedNumberOfOccurrences))
                            );
                        });

                    if (generatorPromptsConfiguration.isMitLicenseSelected) {
                        xit(`when MIT LICENSE is selected, then insert ${authorName} into LICENSE file`,
                            () => assertReplacementInFile(savedTestExecutionDirectoryPath,
                                                          generatorPromptsConfiguration.expectedSolutionDirectory,
                                                          'LICENSE',
                                                          authorName,
                                                          1));
                    }
                })
        );
    });
