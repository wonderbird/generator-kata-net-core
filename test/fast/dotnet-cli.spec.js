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

        let yeomanMock;
        let stubbedSpawnCommandSyncResult;

        beforeEach(
            function() {
                stubbedSpawnCommandSyncResult = {
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
                            .to.throw('dotnet command failed');

                        // Assert mocked method call
                        const expectedDotnetArgs = ['new', 'sln', '--output', configuredSolutionName];
                        yeomanMock.spawnCommandSync.should.have.been.calledOnceWithExactly('dotnet', expectedDotnetArgs);
                    });
            });

        describe('createNewClasLibrary',
            function () {
                const configuredLibraryProjectName = configuredSolutionName + '.Lib';
                const expectedDotnetArgs = ['new', 'classlib', '--language', 'C#', '--name', configuredLibraryProjectName];

                xit('should invoke dotnet cli with correct parameters',
                    function() {
                        const dotnetCli = new DotnetCli(yeomanMock);
                        dotnetCli.createNewClassLibrary(configuredLibraryProjectName);

                        yeomanMock.spawnCommandSync.should.have.been.calledOnceWithExactly('dotnet', expectedDotnetArgs);
                    });

                xit('should throw exception if changing the working directory fails',
                    function() {
                        // Arrange
                        stubbedSpawnCommandSyncResult.status = 1;

                        // Act and assert exception
                        const dotnetCli = new DotnetCli(yeomanMock);
                        expect(dotnetCli.createNewClassLibrary.bind(dotnetCli, configuredLibraryProjectName))
                            .to.throw('changing the working directory failed');

                        // Assert mocked method call
                        yeomanMock.spawnCommandSync.should.have.been.calledOnceWithExactly('dotnet', expectedDotnetArgs);
                    });
            });
    });