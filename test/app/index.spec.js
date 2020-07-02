var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var ClassLibraryGenerator = require('../../app/class-library-generator');
var KataNetCoreGenerator = require('../../app/index');

chai.should();
chai.use(sinonChai);

describe('GeneratorKataNetCore',
    function() {

        describe('install',
            function () {

                it('should invoke ClassLibraryGenerator.generate()',
                    function() {
                        const classLibraryGenerator = new ClassLibraryGenerator();
                        const classLibraryGeneratorMock = sinon.mock(classLibraryGenerator);
                        classLibraryGeneratorMock.expects('generate').once();

                        const generator = new KataNetCoreGenerator();
                        generator.classLibraryGenerator = classLibraryGenerator;

                        generator.install();

                        classLibraryGeneratorMock.verify();
                    });
            });
    });
