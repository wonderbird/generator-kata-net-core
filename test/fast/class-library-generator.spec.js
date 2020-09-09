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
        let configuration;

        beforeEach(function () {
            dotnetCliStub = sinon.createStubInstance(DotnetCli);
            configuration = new Configuration(configuredSolutionName);

            classLibraryGenerator = new ClassLibraryGenerator(dotnetCliStub, configuration);
        });

        describe('generate',
            function () {
                describe('when separate solution directory is enabled',
                    function() {
                        it('then create the correct class library in solution directory',
                            function () {
                                classLibraryGenerator.generate();
        
                                dotnetCliStub.createNewClassLibrary.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedProjectName);
                            });
                        
                        it('then add the correct class library to the correct solution in solution directory',
                            function () {
                                const expectedProjectFileName = expectedProjectName + ".csproj";
                                const expectedProjectPath = path.join(expectedProjectName, expectedProjectFileName);
        
                                classLibraryGenerator.generate();
        
                                dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedProjectPath);
                            });    
                    });           
            });

        describe('when separate solution directory is disabled',
            function() {
                const currentDirectory = '.';

                beforeEach(function() {
                    configuration.disableSeparateSolutionDir();
                });

                it('then create the correct class library in current directory',
                    function () {
                        classLibraryGenerator.generate();

                        dotnetCliStub.createNewClassLibrary.should.have.been.calledOnceWithExactly(currentDirectory, expectedProjectName);
                    });
                
                it('then add the correct class library to the correct solution in current directory',
                    function () {
                        const expectedProjectFileName = expectedProjectName + ".csproj";
                        const expectedProjectPath = path.join(expectedProjectName, expectedProjectFileName);

                        classLibraryGenerator.generate();

                        dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(currentDirectory, expectedProjectPath);
                    });    
            });
    });