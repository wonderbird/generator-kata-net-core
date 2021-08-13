var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
const path = require('path');

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
            stubbedSpawnCommandSyncResult.failed = true;
        }

        describe('createNewSolutionInDirectory',         
            function () {
                it('should invoke dotnet cli with correct parameters for solution',
                    function() {
                        dotnetCli.createNewSolutionInDirectory(configuredSolutionName, configuredSolutionDirectory);

                        assertDotnetArgs('new', 'sln', '--output', configuredSolutionDirectory, '--name', configuredSolutionName);
                    });

                it('WHEN dotnet cli fails for solution THEN throw exception',
                    function() {
                        whenDotnetCliFails();

                        const dotnetCli = new DotnetCli(yeomanMock);
                        expect(dotnetCli.createNewSolutionInDirectory.bind(dotnetCli, configuredSolutionName, configuredSolutionDirectory))
                            .to.throw(expectedDotnetCommandFailedMessage);

                        assertDotnetArgs('new', 'sln', '--output', configuredSolutionDirectory, '--name', configuredSolutionName);
                    });
            });

        describe('createNewClassLibrary',
            function () {
                const configuredLibraryProjectName = configuredSolutionName + '.Lib';
                const configuredLibraryDirectory = path.join(configuredSolutionDirectory, configuredLibraryProjectName);

                it('should invoke dotnet cli with correct parameters for class library',
                    function() {
                        dotnetCli.createNewClassLibrary(configuredLibraryDirectory, configuredLibraryProjectName);

                        assertDotnetArgs('new', 'classlib', '--output', configuredLibraryDirectory, '--language', 'C#', '--name', configuredLibraryProjectName);
                    });

                it('WHEN dotnet cli fails for class library THEN throw exception',
                    function() {
                        whenDotnetCliFails();

                        expect(dotnetCli.createNewClassLibrary.bind(dotnetCli, configuredSolutionName, configuredLibraryProjectName))
                            .to.throw(expectedDotnetCommandFailedMessage);
                    });
            });

        describe('createNewApplication',
            function () {
                const configuredApplicationProjectName = configuredSolutionName + '.App';
                const configuredApplicationDirectory = path.join(configuredSolutionDirectory, configuredApplicationProjectName);

                it('should invoke dotnet cli with correct parameters for application',
                    function() {
                        dotnetCli.createNewApplication(configuredApplicationDirectory, configuredApplicationProjectName);

                        assertDotnetArgs('new', 'console', '--output', configuredApplicationDirectory, '--language', 'C#', '--name', configuredApplicationProjectName);
                    });
            });
    });