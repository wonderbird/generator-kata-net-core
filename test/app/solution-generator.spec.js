var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var Configuration = require('../../app/configuration');
var DotnetCli = require('../../app/yeoman-dotnet-cli');
var SolutionGenerator = require('../../app/solution-generator');

chai.should();
chai.use(sinonChai);

describe('SolutionGenerator',
    function () {

        describe('generate',
            function() {
                const expectedSolutionName = "SampleKata";
                const expectedTestProjectName = "SampleKata.Lib.Tests";
                
                let dotnetCliStub;
                let configuration;

                let solutionGenerator;

                beforeEach(function() {
                    dotnetCliStub = sinon.createStubInstance(DotnetCli);
                    configuration = new Configuration();

                    solutionGenerator = new SolutionGenerator(dotnetCliStub, configuration);
                });

                it('should create the correct solution file',
                    function() {
                        solutionGenerator.generate();

                        dotnetCliStub.createNewSolution.should.have.been.calledOnceWithExactly(expectedSolutionName);
                    });

                it('should create the correct test project',
                    function() {
                        solutionGenerator.generate();

                        dotnetCliStub.createNewTestProject.should.have.been.calledOnceWithExactly(expectedSolutionName,
                            expectedTestProjectName);
                    });
            });
    });
