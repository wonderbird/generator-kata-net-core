const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const path = require('path');

const Configuration = require('../../app/configuration');

chai.should();
chai.use(sinonChai);
const expect = chai.expect;

describe('Configuration',    
    function () {
        const initialSolutionName = 'InitialSolutionName';
        const currentDirectory = '.';

        function assertCorrectConfigurationProperties(actualConfiguration, solutionName) {
            const expectedSolutionName = solutionName;
            const expectedLibraryProjectName = solutionName + '.Lib';
            const expectedLibraryProjectPath = path.join(solutionName, solutionName + '.Lib', solutionName + '.Lib.csproj');
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

            actualConfiguration.isMitLicenseSelected.should.equal(false);
            expect(actualConfiguration.authorName).to.be.undefined;
        }

        describe('constructor',
            function () {
                it('should set correct configuration by solution name',
                    function () {
                        let actualConfiguration = new Configuration(initialSolutionName);
                        
                        assertCorrectConfigurationProperties(actualConfiguration, initialSolutionName);
                    });

                it('should set correct "currentYear"',
                    function() {
                        const fakeYear = 3100;
                        const dateUtils = {
                            getCurrentYear: sinon.stub().returns(fakeYear)
                        }

                        const actualConfiguration = new Configuration(initialSolutionName, dateUtils);

                        actualConfiguration.currentYear.should.equal(fakeYear);
                        dateUtils.getCurrentYear.should.have.been.called;
                    });
            });

        describe('setSolutionNameAndUpdateConfiguration',
            function () {
                it('should set correct configuration by solution name',
                    function () {
                        const changedSolutionName = 'ChangedSolutionName';

                        let actualConfiguration = new Configuration(initialSolutionName);
                        actualConfiguration.setSolutionNameAndUpdateConfiguration(changedSolutionName);
                        
                        assertCorrectConfigurationProperties(actualConfiguration, changedSolutionName);
                    });

                it('when separate solution dir disabled, then keep solution directory as current directory',
                    function () {
                        const changedSolutionName = 'ChangedSolutionName';

                        let actualConfiguration = new Configuration(initialSolutionName);
                        actualConfiguration.disableSeparateSolutionDir();
                        actualConfiguration.setSolutionNameAndUpdateConfiguration(changedSolutionName);
                        
                        actualConfiguration.solutionDirectory.should.equal(currentDirectory);
                    });
            });

        describe('enableSeparateSolutionDir',
            function () {
                it('should set solution directory to solution name',
                    function () {
                        let actualConfiguration = new Configuration(initialSolutionName);
                        actualConfiguration.disableSeparateSolutionDir();
                        actualConfiguration.enableSeparateSolutionDir();

                        actualConfiguration.solutionDirectory.should.equal(initialSolutionName);
                    });
            });

        describe('disableSeparateSolutionDir',
            function () {
                it('should set solution directory to current directory',
                    function () {
                        let actualConfiguration = new Configuration(initialSolutionName);
                        actualConfiguration.enableSeparateSolutionDir();
                        actualConfiguration.disableSeparateSolutionDir();

                        actualConfiguration.solutionDirectory.should.equal(currentDirectory);
                    });
            });
    });
