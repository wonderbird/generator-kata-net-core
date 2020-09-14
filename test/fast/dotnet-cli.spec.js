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
        const configuredSolutionDirectory = 'SampleDirectory';
        const configuredCurrentDirectory = 'current working directory';

        const expectedDotnetCommandFailedMessage = 'dotnet command failed';

        let yeomanMock;
        let stubbedSpawnCommandSyncResult;
        let processStub;
        let dotnetCli;

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

                processStub = {
                    chdir: sinon.stub(),
                    cwd: sinon.stub().returns(configuredCurrentDirectory)
                };

                dotnetCli = new DotnetCli(yeomanMock);
                dotnetCli.process = processStub;
            });

        function assertDotnetArgs(/* parameters are taken from the "arguments" variable */) {
            let expectedDotnetArgs = Array.from(arguments);
            yeomanMock.spawnCommandSync.should.have.been.calledOnceWithExactly('dotnet', expectedDotnetArgs);
        }

        function whenDotnetCliFails() {
            stubbedSpawnCommandSyncResult.status = 1;
        }

        describe('createNewSolutionInDirectory',         
            function () {
                it('should invoke dotnet cli with correct parameters',
                    function() {
                        dotnetCli.createNewSolutionInDirectory(configuredSolutionName, configuredSolutionDirectory);

                        assertDotnetArgs('new', 'sln', '--output', configuredSolutionDirectory, '--name', configuredSolutionName);
                    });

                it('WHEN dotnet cli fails THEN throw exception',
                    function() {
                        whenDotnetCliFails();

                        const dotnetCli = new DotnetCli(yeomanMock);
                        expect(dotnetCli.createNewSolutionInDirectory.bind(dotnetCli, configuredSolutionName, configuredSolutionDirectory))
                            .to.throw(expectedDotnetCommandFailedMessage);

                        assertDotnetArgs('new', 'sln', '--output', configuredSolutionDirectory, '--name', configuredSolutionName);
                    });
            });

        describe('createNewClasLibrary',
            function () {
                const configuredLibraryProjectName = configuredSolutionName + '.Lib';

                function whenChdirFails() {
                    processStub.chdir.throws();
                }

                function assertChdirCalledWith(directory) {
                    processStub.chdir.should.have.been.calledOnceWithExactly(directory);
                }

                it('should invoke dotnet cli with correct parameters',
                    function() {
                        dotnetCli.createNewClassLibrary(configuredSolutionName, configuredLibraryProjectName);

                        assertDotnetArgs('new', 'classlib', '--language', 'C#', '--name', configuredLibraryProjectName);
                    });

                it('WHEN changing working directory fails THEN throw exception',
                    function() {
                        whenChdirFails();

                        const expectedExceptionMessage = 'changing the working directory failed';
                        expect(dotnetCli.createNewClassLibrary.bind(dotnetCli, configuredSolutionName, configuredLibraryProjectName))
                            .to.throw(expectedExceptionMessage);

                        assertChdirCalledWith(configuredSolutionName);
                    });

                it('WHEN dotnet cli fails THEN throw exception',
                    function() {
                        whenDotnetCliFails();

                        expect(dotnetCli.createNewClassLibrary.bind(dotnetCli, configuredSolutionName, configuredLibraryProjectName))
                            .to.throw(expectedDotnetCommandFailedMessage);
                    });

                it('WHEN dotnet cli fails THEN change back to previous directory',
                    function() {
                        whenDotnetCliFails();

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

        describe('createNewApplication',
            function () {
                const configuredApplicationProjectName = configuredSolutionName + '.App';

                it('should invoke dotnet cli with correct parameters',
                    function() {
                        dotnetCli.createNewApplication(configuredSolutionName, configuredApplicationProjectName);

                        assertDotnetArgs('new', 'console', '--language', 'C#', '--name', configuredApplicationProjectName);
                    });
            });
    });