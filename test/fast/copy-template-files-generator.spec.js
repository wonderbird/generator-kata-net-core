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
                const expectedSourceAndDestinationPaths = [
                    { sourcePath: 'README.md', destinationPath: 'README.md' },
                    { sourcePath: 'gitignore', destinationPath: '.gitignore' },
                    { sourcePath: path.join('tools', 'msxsl.exe'), destinationPath: path.join('tools', 'msxsl.exe') },
                    { sourcePath: path.join('tools', 'dupfinder.xslt'), destinationPath: path.join('tools', 'dupfinder.xslt') },
                    { sourcePath: path.join('tools', 'dupfinder.bat'), destinationPath: path.join('tools', 'dupfinder.bat') },
                ];

                const expectedCopyTemplateOptions = {
                    solutionName: expectedSolutionName
                };

                describe('when separate solution directory is enabled',
                    function() {
                        expectedSourceAndDestinationPaths.forEach(function(expectedSourceAndDestinationPath) {
                            it('should generate the correct ' + expectedSourceAndDestinationPath.destinationPath + ' in solution directory',
                                function() {
                                    generator.generate();

                                    const expectedSourcePath = expectedSourceAndDestinationPath.sourcePath;
                                    const expectedDestinationPath = path.join(expectedSolutionName, expectedSourceAndDestinationPath.destinationPath);

                                    fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedSourcePath, expectedDestinationPath, expectedCopyTemplateOptions);
                                });
                            }
                        );
                    });

                describe('when separate solution directory is disabled',
                    function() {
                        beforeEach(function() {
                            configuration.disableSeparateSolutionDir();
                        });

                        expectedSourceAndDestinationPaths.forEach(function(expectedSourceAndDestinationPath) {
                            it('should generate the correct ' + expectedSourceAndDestinationPath.destinationPath + ' in current directory',
                                function() {
                                    generator.generate();

                                    const expectedSourcePath = expectedSourceAndDestinationPath.sourcePath;
                                    const expectedDestinationPath = expectedSourceAndDestinationPath.destinationPath;

                                    fileSystemStub.copyTemplate.should.have.been.calledWithExactly(expectedSourcePath, expectedDestinationPath, expectedCopyTemplateOptions);
                                });
                        });
                    });
            });
    });