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

                it('when default value for separate solution directory is set then create the correct solution file in subdirectory',
                    function() {
                        solutionGenerator.generate();

                        dotnetCliStub.createNewSolutionInDirectory.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedSolutionName);
                    });

                it('when separate solution directory is enabled then create the correct solution file in subdirectory',
                    function() {
                        solutionGenerator.generate();

                        configuration.enableSeparateSolutionDir();

                        dotnetCliStub.createNewSolutionInDirectory.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedSolutionName);
                    });

                it('when separate solution directory is disabled then create the correct solution file in current directory',
                    function() {
                        configuration.disableSeparateSolutionDir();
                        solutionGenerator.generate();

                        const expectedSolutionDirectory = ".";
                        dotnetCliStub.createNewSolutionInDirectory.should.have.been.calledOnceWithExactly(expectedSolutionName, expectedSolutionDirectory);
                    });
            });
    });
