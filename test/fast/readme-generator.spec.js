const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');

const Configuration = require('../../app/configuration');
const FileSystem = require('../../app/file-system');
const ReadmeGenerator = require('../../app/readme-generator');

chai.should();
chai.use(sinonChai);

describe('ReadmeGenerator',
    function () {
        const expectedSolutionName = "SampleKata";

        let fileSystemStub;
        let configuration;
        let readmeGenerator;

        beforeEach(function () {
            fileSystemStub = sinon.createStubInstance(FileSystem);

            configuration = new Configuration(expectedSolutionName);
            readmeGenerator = new ReadmeGenerator(fileSystemStub, configuration);
        });

        describe('generate',
            function () {
                it('should create the correct README.md file',
                    function () {
                        readmeGenerator.generate();

                        const expectedTargetPath = path.join(expectedSolutionName, 'README.md');
                        fileSystemStub.copyTemplate.should.have.been.calledWithExactly('README.md', expectedTargetPath);
                    });

                // TODO create tests for error handling and boundary conditions
            });
    });