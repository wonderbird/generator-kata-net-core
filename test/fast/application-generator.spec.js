var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var path = require('path');

var DotnetCli = require('../../app/dotnet-cli');
var Configuration = require('../../app/configuration');
var ApplicationProjectGenerator = require('../../app/application-project-generator');

chai.should();
chai.use(sinonChai);

describe('ApplicationProjectGenerator',
    function () {
        const configuredSolutionName = "SampleKata";
        const expectedSolutionName = configuredSolutionName;
        const expectedLibraryProjectName = expectedSolutionName + ".Lib";
        const expectedLibraryProjectFileName = expectedLibraryProjectName + ".csproj";
        const expectedLibraryProjectPath = path.join(expectedLibraryProjectName, expectedLibraryProjectFileName);
        const expectedApplicationProjectName = expectedSolutionName + ".App";
        const expectedApplicationProjectFileName = expectedApplicationProjectName + ".csproj";
        const expectedApplicationProjectPath = path.join(expectedApplicationProjectName, expectedApplicationProjectFileName);

        let dotnetCliStub;
        let applicationProjectGenerator;

        beforeEach(function () {
            dotnetCliStub = sinon.createStubInstance(DotnetCli);
            const configuration = new Configuration(configuredSolutionName);

            applicationProjectGenerator = new ApplicationProjectGenerator(dotnetCliStub, configuration);
        });

        describe('generate',
            function () {
                it('should create the correct application project',
                    function () {
                        applicationProjectGenerator.generate();

                        dotnetCliStub.createNewApplication.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedApplicationProjectName);
                    });

                xit('should add the correct class library reference to the test project',
                    function () {
                        testProjectGenerator.generate();

                        dotnetCliStub.addProjectReference.should.have.been.calledOnceWithExactly(expectedSolutionName,
                            expectedTestProjectPath,
                            expectedLibraryProjectPath);
                    });

                it('should add the correct application project to the correct solution',
                    function () {
                        applicationProjectGenerator.generate();

                        dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedApplicationProjectPath);
                    });
            });
    });