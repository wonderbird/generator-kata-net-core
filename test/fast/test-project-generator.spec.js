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
        const expectedLibraryProjectName = expectedSolutionName + ".Lib";
        const expectedLibraryProjectFileName = expectedLibraryProjectName + ".csproj";
        const expectedLibraryProjectPath = path.join(expectedLibraryProjectName, expectedLibraryProjectFileName);
        const expectedTestProjectName = expectedLibraryProjectName + ".Tests";
        const expectedTestProjectFileName = expectedTestProjectName + ".csproj";
        const expectedTestProjectPath = path.join(expectedTestProjectName, expectedTestProjectFileName);

        let dotnetCliStub;
        let testProjectGenerator;

        beforeEach(function () {
            dotnetCliStub = sinon.createStubInstance(DotnetCli);
            const configuration = new Configuration(configuredSolutionName);

            testProjectGenerator = new TestProjectGenerator(dotnetCliStub, configuration);
        });

        describe('generate',
            function () {
                it('should create the correct test project',
                    function () {
                        testProjectGenerator.generate();

                        dotnetCliStub.createNewTestProject.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedTestProjectName);
                    });
            });

        describe('generate',
            function () {
                it('should add the correct class library reference to the test project',
                    function () {
                        testProjectGenerator.generate();

                        dotnetCliStub.addProjectReference.should.have.been.calledOnceWithExactly(expectedSolutionName,
                            expectedTestProjectPath,
                            expectedLibraryProjectPath);
                    });
            });

        describe('generate',
            function () {
                it('should add the correct test project to the correct solution',
                    function () {
                        testProjectGenerator.generate();

                        dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedTestProjectPath);
                    });
            });
    });