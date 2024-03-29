const chai = require('chai');
const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const helpers = require('yeoman-test');
const ExpectedFilesBuilder = require('../helpers/expected-files-builder');

chai.should();

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
                    let runResult;

                    before(function () {
                        configureTestExecutionTimeout(this);

                        return runGeneratorUnderTest()
                            .withPrompts({
                                solutionName: solutionName,
                                isSeparateSolutionDirEnabled: generatorPromptsConfiguration.isSeparateSolutionDirEnabled,
                                isMitLicenseSelected: generatorPromptsConfiguration.isMitLicenseSelected,
                                authorName: authorName,
                            })
                            .then(function (theRunResult) {
                                runResult = theRunResult;

                                compileGeneratedSolution(generatorPromptsConfiguration.expectedSolutionDirectory);

                                return this;
                            });
                    });

                    after(function () {
                        runResult.cleanup();
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

                                    runResult.assertFile(expectedFiles);
                                });

                            [
                                { replacement: solutionName, expectedNumberOfOccurrences: 3, relativePath: 'README.md' },
                                { replacement: solutionName, expectedNumberOfOccurrences: 1, relativePath: path.join('tools', 'dupfinder.bat') },
                            ].forEach(testCaseData =>
                                it(`then insert "${testCaseData.replacement}" ${testCaseData.expectedNumberOfOccurrences} time(s) in copied file ${testCaseData.relativePath}`,
                                    () => assertReplacementInFile(runResult.cwd,
                                                                  generatorPromptsConfiguration.expectedSolutionDirectory,
                                                                  testCaseData.relativePath,
                                                                  testCaseData.replacement,
                                                                  testCaseData.expectedNumberOfOccurrences))
                            );
                        });

                    describe('when MIT LICENSE is selected',
                        function () {
                            if (generatorPromptsConfiguration.isMitLicenseSelected) {
                                it(`then insert ${authorName} into LICENSE file`,
                                    () => assertReplacementInFile(runResult.cwd,
                                                                  generatorPromptsConfiguration.expectedSolutionDirectory,
                                                                  'LICENSE',
                                                                  authorName,
                                                                  1));

                                it('then insert current year into LICENSE file',
                                    function () {
                                        const currentYear = new Date().getFullYear();
                                        const currentYearString = '' + currentYear;
                                        assertReplacementInFile(runResult.cwd,
                                                                generatorPromptsConfiguration.expectedSolutionDirectory,
                                                                'LICENSE',
                                                                currentYearString,
                                                                1);
                                    });
                            }

                        });
                })
        );
    });
