var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var DotnetCli = require('../../app/dotnet-cli');

chai.should();
chai.use(sinonChai);

describe('DotnetCli',
    function () {
        const configuredSolutionName = 'SampleKata';

        const expectedDotnetCommandFailedMessage = 'dotnet command failed';

        let yeomanMock;
        let stubbedSpawnCommandSyncResult;

        beforeEach(
            function() {
                stubbedSpawnCommandSyncResult = {
                    output: ["characters received on stdin", "characters received on stdout", "characters received on stderr"],
                    status: 0
                };

                yeomanMock = { 
                    log: sinon.stub(),
                    spawnCommandSync: sinon.stub().returns(stubbedSpawnCommandSyncResult)
                };
            });

        describe('createNewSolution',         
            function () {
                it('should invoke dotnet cli with correct parameters',
                    function() {
                        const dotnetCli = new DotnetCli(yeomanMock);
                        dotnetCli.createNewSolution(configuredSolutionName);

                        const expectedDotnetArgs = ['new', 'sln', '--output', configuredSolutionName];
                        yeomanMock.spawnCommandSync.should.have.been.calledOnceWithExactly('dotnet', expectedDotnetArgs);
                    });

                it('should throw exception if dotnet cli fails',
                    function() {
                        // Arrange
                        stubbedSpawnCommandSyncResult.status = 1;

                        // Act and assert exception
                        const dotnetCli = new DotnetCli(yeomanMock);
                        expect(dotnetCli.createNewSolution.bind(dotnetCli, configuredSolutionName))
                            .to.throw(expectedDotnetCommandFailedMessage);

                        // Assert mocked method call
                        const expectedDotnetArgs = ['new', 'sln', '--output', configuredSolutionName];
                        yeomanMock.spawnCommandSync.should.have.been.calledOnceWithExactly('dotnet', expectedDotnetArgs);
                    });
            });

        describe('createNewClasLibrary',
            function () {
                const configuredLibraryProjectName = configuredSolutionName + '.Lib';
                let processStub;
                let dotnetCli;

                beforeEach(function() {
                        processStub = {
                            chdir: sinon.stub(),
                            cwd: sinon.stub().returns("current working directory")
                        };

                        dotnetCli = new DotnetCli(yeomanMock);
                        dotnetCli.process = processStub;
                    });

                it('should invoke dotnet cli with correct parameters',
                    function() {
                        dotnetCli.createNewClassLibrary(configuredSolutionName, configuredLibraryProjectName);

                        const expectedDotnetArgs = ['new', 'classlib', '--language', 'C#', '--name', configuredLibraryProjectName];
                        yeomanMock.spawnCommandSync.should.have.been.calledOnceWithExactly('dotnet', expectedDotnetArgs);
                    });

                it('should throw exception if changing the working directory fails',
                    function() {
                        processStub.chdir.throws()

                        const expectedExceptionMessage = 'changing the working directory failed';
                        expect(dotnetCli.createNewClassLibrary.bind(dotnetCli, configuredSolutionName, configuredLibraryProjectName))
                            .to.throw(expectedExceptionMessage);

                        processStub.chdir.should.have.been.calledOnceWithExactly(configuredSolutionName);
                    });

                it('should throw exception if dotnet command failed',
                    function() {
                        var configuredCurrentDirectory = "configured current directory";
                        processStub.cwd.returns(configuredCurrentDirectory);

                        stubbedSpawnCommandSyncResult.status = 1;

                        expect(dotnetCli.createNewClassLibrary.bind(dotnetCli, configuredSolutionName, configuredLibraryProjectName))
                            .to.throw(expectedDotnetCommandFailedMessage);
                    });

                it('should change back to previous directory if dotnet command failed',
                    function() {
                        var configuredCurrentDirectory = "configured current directory";
                        processStub.cwd.returns(configuredCurrentDirectory);

                        stubbedSpawnCommandSyncResult.status = 1;

                        try {
                            dotnetCli.createNewClassLibrary(configuredSolutionName, configuredLibraryProjectName);
                        } catch(e) {
                            // explicitly ignore the expected exception for this particular test
                        }

                        processStub.chdir.should.have.been.calledTwice;
                        const directoryOnSecondCall = processStub.chdir.getCall(1).args[0];
                        directoryOnSecondCall.should.equal(configuredCurrentDirectory);
                    });
            });
    });