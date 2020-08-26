var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

const SolutionGenerator = require('../../app/solution-generator');
const GeneratorKataNetCore = require('../../app/index');
const ClassLibraryGenerator = require('../../app/class-library-generator');
const TestProjectGenerator = require('../../app/test-project-generator');

chai.should();
chai.use(sinonChai);

describe('GeneratorKataNetCore',
    function() {

        describe('install',
            function () {
                let generator;
                let generatorMocks;

                beforeEach(
                    function() {
                        generatorMocks = [
                            sinon.createStubInstance(SolutionGenerator),
                            sinon.createStubInstance(ClassLibraryGenerator),
                            sinon.createStubInstance(TestProjectGenerator)                               
                        ];

                        generator = new GeneratorKataNetCore();
                        generator.generators = generatorMocks;
                    });
    
                it('should invoke all generators',
                    function() {
                        generator.install();

                        generatorMocks.forEach(
                            generatorMock => generatorMock.generate.should.have.been.calledOnce
                        );
                    });
            });
    });
