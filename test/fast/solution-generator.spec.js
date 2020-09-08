var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var Configuration = require('../../app/configuration');
var DotnetCli = require('../../app/dotnet-cli');
var SolutionGenerator = require('../../app/solution-generator');

chai.should();
chai.use(sinonChai);

describe('SolutionGenerator',
    function () {

        describe('generate',
            function() {
                const expectedSolutionName = "SampleKata";
                
                let dotnetCliStub;
                let configuration;

                let solutionGenerator;

                beforeEach(function() {
                    dotnetCliStub = sinon.createStubInstance(DotnetCli);
                    configuration = new Configuration(expectedSolutionName);

                    solutionGenerator = new SolutionGenerator(dotnetCliStub, configuration);
                });

                it('should create the correct solution file',
                    function() {
                        solutionGenerator.generate();

                        dotnetCliStub.createNewSolution.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedSolutionName);
                    });
            });
    });
