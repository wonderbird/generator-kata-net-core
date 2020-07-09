var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var SolutionGenerator = require('../../app/solution-generator');
var KataNetCoreGenerator = require('../../app/index');

chai.should();
chai.use(sinonChai);

describe('GeneratorKataNetCore',
    function() {

        describe('install',
            function () {

                it('should invoke SolutionGenerator.generate()',
                    function() {
                        const solutionGenerator = new SolutionGenerator();
                        const solutionGeneratorMock = sinon.mock(solutionGenerator);
                        solutionGeneratorMock.expects('generate').once();

                        const generator = new KataNetCoreGenerator();
                        generator.solutionGenerator = solutionGenerator;

                        generator.install();

                        solutionGeneratorMock.verify();
                    });
            });
    });
