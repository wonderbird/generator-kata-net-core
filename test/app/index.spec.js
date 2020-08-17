var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var SolutionGenerator = require('../../app/solution-generator');
var GeneratorKataNetCore = require('../../app/index');

chai.should();
chai.use(sinonChai);

describe('GeneratorKataNetCore',
    function() {

        describe('install',
            function () {

                it('should invoke SolutionGenerator.generate()',
                    function() {
                        const solutionGeneratorMock = sinon.createStubInstance(SolutionGenerator);

                        const generator = new GeneratorKataNetCore();
                        generator.solutionGenerator = solutionGeneratorMock;

                        generator.install();

                        solutionGeneratorMock.generate.should.have.been.calledOnce;
                    });
            });
    });
