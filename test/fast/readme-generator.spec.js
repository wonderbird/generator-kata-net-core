const chai = require('chai');

const Configuration = require('../../app/configuration');
const ReadmeGenerator = require('../../app/readme-generator');

chai.should();

describe('ReadmeGenerator',
    function () {
        const expectedSolutionName = "SampleKata";

        let configuration;
        let readmeGenerator;

        beforeEach(function () {
            configuration = new Configuration(expectedSolutionName);
            readmeGenerator = new ReadmeGenerator(configuration);
        });

        describe('generate',
            function () {
                it('should create the correct README.md file',
                    function () {
                        readmeGenerator.generate();

                        // TODO add an assertion in the ReadmeGenerator.generate... Test
                    });
            });
    });