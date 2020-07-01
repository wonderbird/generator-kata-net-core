var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var ClassLibraryGenerator = require('../app/class-library-generator');
var KataNetCoreGenerator = require('../app/index');

chai.should();
chai.use(sinonChai);

describe('install', function () {
    it('should invoke ClassLibraryGenerator.generate()',
        function () {
            var classLibraryGenerator = new ClassLibraryGenerator();
            var classLibraryGeneratorMock = sinon.mock(classLibraryGenerator);
            classLibraryGeneratorMock.expects('generate').once();

            var generator = new KataNetCoreGenerator();
            generator.classLibraryGenerator = classLibraryGenerator;

            generator.install();

            classLibraryGeneratorMock.verify();
        });
});