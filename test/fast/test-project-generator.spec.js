var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var path = require('path');

var DotnetCli = require('../../app/dotnet-cli');
var Configuration = require('../../app/configuration');
var TestProjectGenerator = require('../../app/test-project-generator');

chai.should();
chai.use(sinonChai);

describe('TestProjectGenerator',
    function () {
        const configuredSolutionName = "SampleKata";
        const expectedSolutionName = configuredSolutionName;
        const expectedSolutionFileName = expectedSolutionName + ".sln"
        const expectedLibraryProjectName = expectedSolutionName + ".Lib";
        const expectedLibraryProjectFileName = expectedLibraryProjectName + ".csproj";
        const expectedTestProjectName = expectedLibraryProjectName + ".Tests";
        const expectedTestProjectFileName = expectedTestProjectName + ".csproj";

        let dotnetCliStub;
        let configuration;
        let testProjectGenerator;

        beforeEach(function () {
            dotnetCliStub = sinon.createStubInstance(DotnetCli);
            configuration = new Configuration(configuredSolutionName);

            testProjectGenerator = new TestProjectGenerator(dotnetCliStub, configuration);
        });

        describe('generate',
            function () {
                const expectedTestProjectDirectory = path.join(expectedSolutionName, expectedTestProjectName);
                const expectedTestProjectPath = path.join(expectedTestProjectDirectory, expectedTestProjectFileName);
                const expectedLibraryProjectPath = path.join(expectedSolutionName, expectedLibraryProjectName, expectedLibraryProjectFileName);
                const expectedSolutionPath = path.join(expectedSolutionName, expectedSolutionFileName);

                describe('when separate solution directory is enabled',
                    function() {
                        it('should create the correct test project in solution directory',
                            function () {
                                testProjectGenerator.generate();

                                dotnetCliStub.createNewTestProject.should.have.been.calledOnceWithExactly(expectedTestProjectDirectory, expectedTestProjectName);
                            });

                        it('should add the correct class library reference to the test project in solution directory',
                            function () {
                                testProjectGenerator.generate();

                                dotnetCliStub.addProjectReference.should.have.been.calledOnceWithExactly(expectedTestProjectPath, expectedLibraryProjectPath);
                            });

                        it('should add the correct test project to the correct solution in solution directory',
                            function () {
                                testProjectGenerator.generate();

                                dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(expectedSolutionPath, expectedTestProjectPath);
                            });
                    });
            });

        describe('when separate solution directory is disabled',
            function() {
                const currentDirectory = '.';
                const expectedTestProjectDirectory = path.join(currentDirectory, expectedTestProjectName);
                const expectedTestProjectPath = path.join(expectedTestProjectDirectory, expectedTestProjectFileName);
                const expectedLibraryProjectPath = path.join(currentDirectory, expectedLibraryProjectName, expectedLibraryProjectFileName);
                const expectedSolutionPath = path.join(currentDirectory, expectedSolutionFileName);

                beforeEach(function() {
                    configuration.disableSeparateSolutionDir();
                });

                it('should create the correct test project in current directory',
                    function () {
                        testProjectGenerator.generate();

                        dotnetCliStub.createNewTestProject.should.have.been.calledOnceWithExactly(expectedTestProjectDirectory, expectedTestProjectName);
                    });

                it('should add the correct class library reference to the test project in current directory',
                    function () {
                        testProjectGenerator.generate();

                        dotnetCliStub.addProjectReference.should.have.been.calledOnceWithExactly(expectedTestProjectPath, expectedLibraryProjectPath);
                    });

                it('should add the correct test project to the correct solution',
                    function () {
                        testProjectGenerator.generate();

                        dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(expectedSolutionPath, expectedTestProjectPath);
                    });
            });
    });
