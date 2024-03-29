const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const yeoman = require('yeoman-test');

const SolutionGenerator = require('../../app/solution-generator');
const GeneratorKataNetCore = require('../../app/index');
const ClassLibraryGenerator = require('../../app/class-library-generator');
const TestProjectGenerator = require('../../app/test-project-generator');

chai.should();
chai.use(sinonChai);

describe('GeneratorKataNetCore',
    function() {
        let generatorOptions = {env: {}};

        beforeEach(async function() {
            generatorOptions.env = await yeoman.createEnv();
        })

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

                        generator = new GeneratorKataNetCore(generatorOptions);
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

        describe('prompting',
            function () {
                it('when MIT LICENSE is selected, then ask for author name',
                    async function () {
                        const configuredAnswers = { isMitLicenseSelected: true };

                        const generator = new GeneratorKataNetCore(generatorOptions);
                        generator.prompt = sinon.stub().returns(Promise.resolve(configuredAnswers));

                        await generator.prompting();
                        
                        const expectedPrompt = [{
                            type: "input",
                            name: "authorName",
                            message: "Enter the author's name for the LICENSE file:"
                        }];
                        generator.prompt.should.have.been.calledWithExactly(expectedPrompt);
                    });
                    
                it('when MIT LICENSE is NOT selected, then do not ask for author name',
                    async function () {
                        const configuredAnswers = { isMitLicenseSelected: false };

                        const generator = new GeneratorKataNetCore(generatorOptions);
                        generator.prompt = sinon.stub().returns(Promise.resolve(configuredAnswers));

                        await generator.prompting();
                        generator.prompt.should.have.been.calledOnce;
                    });
            })
    });
