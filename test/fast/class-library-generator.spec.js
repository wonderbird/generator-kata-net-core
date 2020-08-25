var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var path = require('path');

var DotnetCli = require('../../app/dotnet-cli');
var Configuration = require('../../app/configuration');
var ClassLibraryGenerator = require('../../app/class-library-generator');

chai.should();
chai.use(sinonChai);

describe('ClassLibraryGenerator',
    function () {
        const configuredSolutionName = "SampleKata";
        const expectedSolutionName = configuredSolutionName;
        const expectedProjectName = expectedSolutionName + ".Lib";

        let dotnetCliStub;
        let classLibraryGenerator;

        beforeEach(function () {
            dotnetCliStub = sinon.createStubInstance(DotnetCli);
            const configuration = new Configuration(configuredSolutionName);

            classLibraryGenerator = new ClassLibraryGenerator(dotnetCliStub, configuration);
        });

        describe('generate',
            function () {
                it('should create the correct class library',
                    function () {
                        classLibraryGenerator.generate();

                        dotnetCliStub.createNewClassLibrary.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedProjectName);
                    });
            });

        describe('generate',
            function () {
                it('should add the correct class library to the correct solution',
                    function () {
                        const expectedProjectFileName = expectedProjectName + ".csproj";
                        const expectedProjectPath = path.join(expectedProjectName, expectedProjectFileName);

                        classLibraryGenerator.generate();

                        dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedProjectPath);
                    });
            });
    });