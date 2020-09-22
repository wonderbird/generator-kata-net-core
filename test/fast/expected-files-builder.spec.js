const chai = require('chai');
const path = require('path');

const ExpectedFilesBuilder = require('../helpers/expected-files-builder');

chai.should();

describe('ExpectedFilesBuilder',
    function() {
        const solutionName = 'TestSolutionName';

        it('when default object is built, then return expected defaults',
            function() {
                const solutionDirectory = solutionName;

                const builder = new ExpectedFilesBuilder(solutionName);
                const result = builder.build();

                expectedFiles = [
                    path.join(solutionDirectory, `${solutionName}.sln`),
                    path.join(solutionDirectory, `${solutionName}.Lib`, 'bin', 'Debug', 'netStandard2.0', `${solutionName}.Lib`, `${solutionName}.Lib.dll`),
                ];

                result.should.have.deep.members(expectedFiles);
            });

        it('when solution directory is changed, then changed solution directory is considered',
            function() {
                const changedSolutionDirectory = 'TestChangedDir';

                const builder = new ExpectedFilesBuilder(solutionName)
                                    .setSolutionDirectory(changedSolutionDirectory);

                const result = builder.build();

                expectedFiles = [
                    path.join(changedSolutionDirectory, `${solutionName}.sln`),
                    path.join(changedSolutionDirectory, `${solutionName}.Lib`, 'bin', 'Debug', 'netStandard2.0', `${solutionName}.Lib`, `${solutionName}.Lib.dll`),
                ];

                result.should.have.deep.members(expectedFiles);
            });

        // TODO continue extracing the ExpectedFilesBuilder from generate-kata-net-core.spec.js
    });