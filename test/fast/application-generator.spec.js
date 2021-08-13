const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');

const DotnetCli = require('../../app/dotnet-cli');
const Configuration = require('../../app/configuration');
const ApplicationProjectGenerator = require('../../app/application-project-generator');

chai.should();
chai.use(sinonChai);

describe('ApplicationProjectGenerator',
    function () {
        const configuredSolutionName = "SampleKata";
        const expectedSolutionName = configuredSolutionName;
        const expectedLibraryProjectName = expectedSolutionName + ".Lib";
        const expectedLibraryProjectFileName = expectedLibraryProjectName + ".csproj";
        const expectedApplicationProjectName = expectedSolutionName + ".App";
        const expectedApplicationProjectFileName = expectedApplicationProjectName + ".csproj";

        let dotnetCliStub;
        let configuration;
        let applicationProjectGenerator;

        beforeEach(function () {
            dotnetCliStub = sinon.createStubInstance(DotnetCli);
            configuration = new Configuration(configuredSolutionName);

            applicationProjectGenerator = new ApplicationProjectGenerator(dotnetCliStub, configuration);
        });

        describe('generate',        
            function () {
                describe('when separate solution directory is enabled',
                    function() {
                        const expectedApplicationProjectDirectory = path.join(expectedSolutionName, expectedApplicationProjectName)
                        const expectedApplicationProjectPath = path.join(expectedApplicationProjectDirectory, expectedApplicationProjectFileName);
                        const expectedLibraryProjectPath = path.join(expectedSolutionName, expectedLibraryProjectName, expectedLibraryProjectFileName);

                        it('should create the correct application project in solution directory',
                            function () {
                                applicationProjectGenerator.generate();

                                dotnetCliStub.createNewApplication.should.have.been.calledOnceWithExactly(expectedApplicationProjectDirectory, expectedApplicationProjectName);
                            });

                        it('should add the correct class library reference to the test project in solution directory',
                            function () {
                                applicationProjectGenerator.generate();

                                dotnetCliStub.addProjectReference.should.have.been.calledOnceWithExactly(expectedApplicationProjectPath, expectedLibraryProjectPath);
                            });

                        it('should add the correct application project to the correct solution in solution directory',
                            function () {
                                applicationProjectGenerator.generate();

                                dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedApplicationProjectPath);
                            });
                    });

                describe('when separate solution directory is disabled',
                    function() {
                        const currentDirectory = '.';
                        const expectedApplicationProjectDirectory = path.join(currentDirectory, expectedApplicationProjectName)
                        const expectedApplicationProjectPath = path.join(expectedApplicationProjectDirectory, expectedApplicationProjectFileName);
                        const expectedLibraryProjectPath = path.join(currentDirectory, expectedLibraryProjectName, expectedLibraryProjectFileName);


                        beforeEach(function() {
                            configuration.disableSeparateSolutionDir();
                        });
                
                        it('should create the correct application project in current directory',
                            function () {
                                applicationProjectGenerator.generate();

                                dotnetCliStub.createNewApplication.should.have.been.calledOnceWithExactly(expectedApplicationProjectDirectory, expectedApplicationProjectName);
                            });

                        it('should add the correct class library reference to the test project in current directory',
                            function () {
                                applicationProjectGenerator.generate();

                                dotnetCliStub.addProjectReference.should.have.been.calledOnceWithExactly(expectedApplicationProjectPath, expectedLibraryProjectPath);
                            });

                        it('should add the correct application project to the correct solution in current directory',
                            function () {
                                applicationProjectGenerator.generate();

                                dotnetCliStub.addProjectToSolution.should.have.been.calledOnceWithExactly(currentDirectory, expectedApplicationProjectPath);
                            });
                    });
            });
    });