var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var FileSystem = require('../../app/file-system');

chai.should();
chai.use(sinonChai);

describe('FileSystem',
    function () {
        beforeEach(
            function() {
            });

        describe('copyTemplate',         
            function () {
                it('should copy a file from template to project',
                    function() {
                        const fsStub = {
                            copyTpl: sinon.stub()
                        };

                        const yeomanStub = {
                            fs: fsStub,
                        };

                        const fileSystem = new FileSystem(yeomanStub);
                        
                        fileSystem.copyTemplate('arbitrary-filename');

                        fsStub.copyTpl.should.have.been.calledWithExactly('./templates/README.md', 'README.md');
                    });
            });
    });