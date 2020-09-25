const chai = require('chai');
const path = require('path');

const ExpectedFilesBuilder = require('../helpers/expected-files-builder');

chai.should();

describe('ExpectedFilesBuilder',
    function() {
        const solutionName = 'TestSolutionName';

        function createDefaultExpectedFilesWithoutSolutionDirectory(solutionName) {
            const expectedFiles = [
                `${solutionName}.sln`,
                path.join(`${solutionName}.Lib`, 'bin', 'Debug', 'netStandard2.0', `${solutionName}.Lib.dll`),
                path.join(`${solutionName}.Lib.Tests`, 'bin', 'Debug', 'netcoreapp3.1', `${solutionName}.Lib.Tests.dll`),
                path.join(`${solutionName}.App`, 'bin', 'Debug', 'netcoreapp3.1', `${solutionName}.App.dll`),
                path.join('tools', 'msxsl.exe'),
                path.join('tools', 'dupfinder.xslt'),
                path.join('tools', 'dupfinder.bat'),
                path.join('.gitignore'),
                path.join('README.md'),
            ];

            return expectedFiles;
        }

        function prependSolutionDirectoryToAll(solutionDirectory, inputFiles) {
            const expandedFiles = inputFiles.map(inputFile => path.join(solutionDirectory, inputFile));
            return expandedFiles;
        }

        it('when default object is built, then return expected files',
            function() {
                const builder = new ExpectedFilesBuilder(solutionName);
                const result = builder.build();

                const expectedFilesWithoutSolutionDirectory = createDefaultExpectedFilesWithoutSolutionDirectory(solutionName);
                const expectedFilesWithSolutionDirectory = prependSolutionDirectoryToAll(solutionName, expectedFilesWithoutSolutionDirectory);

                result.should.have.deep.members(expectedFilesWithSolutionDirectory);
            });

        it('when solution directory is changed, then changed solution directory is considered',
            function() {
                const changedSolutionDirectory = 'TestChangedDir';

                const builder = new ExpectedFilesBuilder(solutionName)
                                    .withSolutionDirectory(changedSolutionDirectory);

                const result = builder.build();

                const expectedFilesWithoutSolutionDirectory = createDefaultExpectedFilesWithoutSolutionDirectory(solutionName);
                const expectedFilesWithSolutionDirectory = prependSolutionDirectoryToAll(changedSolutionDirectory, expectedFilesWithoutSolutionDirectory);

                result.should.have.deep.members(expectedFilesWithSolutionDirectory);
            });

        it('when MIT license NOT selected, then no LICENSE in expected files',
            function() {
                const builder = new ExpectedFilesBuilder(solutionName)
                                    .withMitLicense(false);
                const result = builder.build();

                const licenseFile = path.join(solutionName, 'LICENSE');
                result.should.not.include.members([licenseFile]);
            });

        it('when MIT license selected, then LICENSE is in expected files',
            function() {
                const builder = new ExpectedFilesBuilder(solutionName)
                                    .withMitLicense(true);
                const result = builder.build();

                const licenseFile = path.join(solutionName, 'LICENSE');
                result.should.include.members([licenseFile]);
            });
    });