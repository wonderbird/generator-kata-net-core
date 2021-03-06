const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');

const FileSystem = require('../../app/file-system');

chai.should();
chai.use(sinonChai);

describe('FileSystem',
    function () {
        describe('copyTemplate',         
            function () {
                it('should copy a file from template to project',
                    function() {
                        const fileName = 'testFileName';
                        const options = {
                            someParameter: 'someValue'
                        };

                        const expectedSourcePath = path.join('sourceDir', fileName);
                        const expectedDestinationPath = path.join('destinationDir', fileName);
                        const expectedOptions = options;

                        const fsStub = {
                            copyTpl: sinon.stub()
                        };

                        const yeomanStub = {
                            fs: fsStub,
                            templatePath: sinon.stub().returns(expectedSourcePath),
                            destinationPath: sinon.stub().returns(expectedDestinationPath)
                        };

                        const fileSystem = new FileSystem(yeomanStub);
                        
                        fileSystem.copyTemplate(fileName, fileName, options);

                        fsStub.copyTpl.should.have.been.calledWithExactly(expectedSourcePath, expectedDestinationPath, expectedOptions);
                        yeomanStub.templatePath.should.have.been.calledWithExactly(fileName);
                    });
            });
    });