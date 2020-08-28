var chai = require('chai');
const path = require('path');

var Configuration = require('../../app/configuration');

chai.should();

describe('Configuration',
    function () {
        function assertCorrectConfigurationProperties(actualConfiguration, solutionName) {
            const expectedSolutionName = solutionName;
            const expectedLibraryProjectName = solutionName + '.Lib';
            const expectedLibraryProjectPath = path.join(solutionName + '.Lib', solutionName + '.Lib.csproj');
            const expectedTestProjectName = solutionName + '.Lib.Tests';
            const expectedTestProjectPath = path.join(solutionName + '.Lib.Tests', solutionName + '.Lib.Tests.csproj');
            const expectedApplicationProjectName = solutionName + '.App';
            const expectedApplicationProjectPath = path.join(solutionName + '.App', solutionName + '.App.csproj');

            actualConfiguration.librarySuffix.should.equal('.Lib');
            actualConfiguration.projectExtension.should.equal('.csproj');
            actualConfiguration.testSuffix.should.equal('.Tests');
      
            actualConfiguration.solutionName.should.equal(expectedSolutionName);
      
            actualConfiguration.libraryProjectName.should.equal(expectedLibraryProjectName);
            actualConfiguration.libraryProjectPath.should.equal(expectedLibraryProjectPath);
      
            actualConfiguration.testProjectName.should.equal(expectedTestProjectName);
            actualConfiguration.testProjectPath.should.equal(expectedTestProjectPath);

            actualConfiguration.applicationProjectName.should.equal(expectedApplicationProjectName);
            actualConfiguration.applicationProjectPath.should.equal(expectedApplicationProjectPath);
        }

        describe('constructor',
            function () {
                it('should set correct configuration by solution name',
                    function () {
                        const solutionName = 'SampleKata';

                        let actualConfiguration = new Configuration(solutionName);
                        
                        assertCorrectConfigurationProperties(actualConfiguration, solutionName);
                    });
            });

        describe('setSolutionNameAndUpdateConfiguration',
            function () {
                it('should set correct configuration by solution name',
                    function () {
                        const changedSolutionName = 'ChangedSolutionName';

                        let actualConfiguration = new Configuration('AnyInitialSolutionName');
                        actualConfiguration.setSolutionNameAndUpdateConfiguration(changedSolutionName);
                        
                        assertCorrectConfigurationProperties(actualConfiguration, changedSolutionName);
                    });
            });
    });