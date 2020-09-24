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
                path.join(`${solutionName}.Test`, 'bin', 'Debug', 'netcoreapp3.1', `${solutionName}.Test.dll`),
                path.join(`${solutionName}.App`, 'bin', 'Debug', 'netcoreapp3.1', `${solutionName}.App.dll`),
            ];

            return expectedFiles;
        }

        function prependSolutionDirectoryToAll(solutionDirectory, inputFiles) {
            const expandedFiles = inputFiles.map(inputFile => path.join(solutionDirectory, inputFile));
            return expandedFiles;
        }

        it('when default object is built, then return expected defaults',
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
                                    .setSolutionDirectory(changedSolutionDirectory);

                const result = builder.build();

                const expectedFilesWithoutSolutionDirectory = createDefaultExpectedFilesWithoutSolutionDirectory(solutionName);
                const expectedFilesWithSolutionDirectory = prependSolutionDirectoryToAll(changedSolutionDirectory, expectedFilesWithoutSolutionDirectory);

                result.should.have.deep.members(expectedFilesWithSolutionDirectory);
            });

        // TODO continue extracing the ExpectedFilesBuilder from generate-kata-net-core.spec.js
    });