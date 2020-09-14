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
        let generator;

        beforeEach(function () {
            fileSystemStub = sinon.createStubInstance(FileSystem);

            configuration = new Configuration(expectedSolutionName);
            generator = new CopyTemplateFilesGenerator(fileSystemStub, configuration);
        });

        describe('generate',
            function () {
                it('should create the correct .gitignore file',
                    function () {
                        generator.generate();

                        const expectedSourcePath = 'gitignore';
                        const expectedDestinationFile = '.gitignore'
                        fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedSourcePath, expectedDestinationFile);
                    });

                describe('when separate solution directory is enabled',
                    function() {
                        it('should create the correct README.md file in solution directory',
                            function () {
                                generator.generate();

                                const expectedFileName = 'README.md';
                                const expectedDestinationPath = path.join(expectedSolutionName, expectedFileName);
                                fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedFileName, expectedDestinationPath);
                            });
                    });

                describe('when separate solution directory is disabled',
                    function() {
                        it('should create the correct README.md file in current directory',
                            function () {
                                configuration.disableSeparateSolutionDir();
                                generator.generate();

                                const expectedFileName = 'README.md';
                                fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedFileName, expectedFileName);
                            });
                    });
            });
    });