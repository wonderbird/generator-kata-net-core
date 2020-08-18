var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var SolutionGenerator = require('../../app/solution-generator');
var GeneratorKataNetCore = require('../../app/index');
const ClassLibraryGenerator = require('../../app/class-library-generator');

chai.should();
chai.use(sinonChai);

describe('GeneratorKataNetCore',
    function() {

        describe('install',
            function () {
                let solutionGeneratorMock;
                let classLibraryGeneratorMock;
                let generator;

                beforeEach(
                    function() {
                        solutionGeneratorMock = sinon.createStubInstance(SolutionGenerator);
                        classLibraryGeneratorMock = sinon.createStubInstance(ClassLibraryGenerator);

                        generator = new GeneratorKataNetCore();
                        generator.solutionGenerator = solutionGeneratorMock;
                        generator.classLibraryGenerator = classLibraryGeneratorMock;
                    });
    
                it('should invoke SolutionGenerator.generate()',
                    function() {
                        generator.install();

                        solutionGeneratorMock.generate.should.have.been.calledOnce;
                    });

                it('should invoke ClassLibraryGenerator.generate()',
                    function() {
                        generator.install();

                        classLibraryGeneratorMock.generate.should.have.been.calledOnce;
                    });
            });
    });
