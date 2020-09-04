const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');

const Configuration = require('../../app/configuration');
const FileSystem = require('../../app/file-system');
const CopyTemplateFilesGenerator = require('../../app/copy-template-files-generator');

chai.should();
chai.use(sinonChai);

describe('CopyTemplateFilesGenerator',
    function () {
        const expectedSolutionName = "SampleKata";

        let fileSystemStub;
        let configuration;
        let readmeGenerator;

        beforeEach(function () {
            fileSystemStub = sinon.createStubInstance(FileSystem);

            configuration = new Configuration(expectedSolutionName);
            readmeGenerator = new CopyTemplateFilesGenerator(fileSystemStub, configuration);
        });

        describe('generate',
            function () {
                it('should create the correct README.md file',
                    function () {
                        readmeGenerator.generate();

                        const expectedFileName = 'README.md';
                        const expectedTargetPath = path.join(expectedSolutionName, expectedFileName);
                        fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedFileName, expectedTargetPath);
                    });

                it('should create the correct .gitignore file',
                    function () {
                        readmeGenerator.generate();

                        const expectedSourcePath = 'gitignore';
                        const expectedTargetPath = '.gitignore';
                        fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedSourcePath, expectedTargetPath);
                    });
                // TODO create tests for error handling and boundary conditions
            });
    });