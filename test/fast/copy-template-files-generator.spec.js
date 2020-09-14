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
                describe('when separate solution directory is enabled',
                    function() {
                        it('should create the correct README.md file in solution directory',
                            function () {
                                generator.generate();

                                const expectedFileName = 'README.md';
                                const expectedDestinationPath = path.join(expectedSolutionName, expectedFileName);
                                fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedFileName, expectedDestinationPath);
                            });

                        it('should create the correct .gitignore file in solution directory',
                            function () {
                                generator.generate();
        
                                const expectedSourcePath = 'gitignore';
                                const expectedDestinationFile = '.gitignore';
                                const expectedDestinationPath = path.join(expectedSolutionName, expectedDestinationFile);
                                fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedSourcePath, expectedDestinationPath);
                            });

                        it('should create the correct msxsl.exe file in tools directory beneath solution directory',
                            function () {
                                generator.generate();
        
                                const expectedFileName = 'msxsl.exe';
                                const expectedSourcePath = path.join('tools', 'msxsl.exe');
                                const expectedDestinationPath = path.join(expectedSolutionName, 'tools', expectedFileName);
                                fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedSourcePath, expectedDestinationPath);
                            });
                    });

                describe('when separate solution directory is disabled',
                    function() {
                        beforeEach(function() {
                            configuration.disableSeparateSolutionDir();
                        });

                        it('should create the correct README.md file in current directory',
                            function () {
                                generator.generate();

                                const expectedFileName = 'README.md';
                                fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedFileName, expectedFileName);
                            });

                        it('should create the correct .gitignore file in current directory',
                            function () {
                                generator.generate();
        
                                const expectedSourcePath = 'gitignore';
                                const expectedDestinationFile = '.gitignore'
                                fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedSourcePath, expectedDestinationFile);
                            });
        
                    });
            });
    });