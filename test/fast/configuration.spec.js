var chai = require('chai');
var path = require('path');

var Configuration = require('../../app/configuration');

chai.should();

describe('Configuration',
    function () {
        function performTest(actualConfiguration, solutionName) {
            const expectedSolutionName = solutionName;
            const expectedLibraryProjectName = solutionName + '.Lib';
            const expectedLibraryProjectPath = solutionName + '.Lib/' + solutionName + '.Lib.csproj';
            const expectedTestProjectName = solutionName + '.Lib.Tests';
            const expectedTestProjectPath = solutionName + '.Lib.Tests/' + solutionName + '.Lib.Tests.csproj';

            actualConfiguration.librarySuffix.should.equal('.Lib');
            actualConfiguration.projectExtension.should.equal('.csproj');
            actualConfiguration.testSuffix.should.equal('.Tests');
      
            actualConfiguration.solutionName.should.equal(expectedSolutionName);
      
            actualConfiguration.libraryProjectName.should.equal(expectedLibraryProjectName);
            actualConfiguration.libraryProjectPath.should.equal(expectedLibraryProjectPath);
      
            actualConfiguration.testProjectName.should.equal(expectedTestProjectName);
            actualConfiguration.testProjectPath.should.equal(expectedTestProjectPath);
        }

        describe('constructor',
            function () {
                it('should set correct configuration by solution name',
                    function () {
                        const solutionName = 'SampleKata';

                        let actualConfiguration = new Configuration(solutionName);
                        
                        performTest(actualConfiguration, solutionName);
                    });
            });

        describe('setSolutionNameAndUpdateConfiguration',
            function () {
                it('should set correct configuration by solution name',
                    function () {
                        const solutionName = 'ChangedSolutionName';

                        let actualConfiguration = new Configuration('OldSolutionName');
                        actualConfiguration.setSolutionNameAndUpdateConfiguration(solutionName);
                        
                        performTest(actualConfiguration, solutionName);
                    });
            });
    });