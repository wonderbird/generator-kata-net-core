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
                let solutionGeneratorMock;
                let classLibraryGeneratorMock;
                let generator;

                beforeEach(
                    function() {
                        solutionGeneratorMock = sinon.createStubInstance(SolutionGenerator);
                        classLibraryGeneratorMock = sinon.createStubInstance(ClassLibraryGenerator);
                        testProjectGeneratorMock = sinon.createStubInstance(TestProjectGenerator);

                        generator = new GeneratorKataNetCore();
                        generator.solutionGenerator = solutionGeneratorMock;
                        generator.classLibraryGenerator = classLibraryGeneratorMock;
                        generator.testProjectGenerator = testProjectGeneratorMock;
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

                    it('should invoke TestProjectGenerator.generate()',
                    function() {
                        generator.install();

                        testProjectGeneratorMock.generate.should.have.been.calledOnce;
                    });
            });
    });
