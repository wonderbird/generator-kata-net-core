var path = require('path');
var fs = require('fs');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('yo kata-net-core',
    function () {

        it('should create required files and directories',
            function () {
                const testContext = new GenerateKataNetCoreTestContext(this);
                const testExecutionDirectory = new TemporaryDirectory();
                const rememberTestExecutionDirectory = testExecutionDirectory.setPath.bind(testExecutionDirectory);

                return testContext.runGeneratorUnderTest(rememberTestExecutionDirectory)
                    .then(function () {
                        const expectedFiles = testContext.getExpectedFiles();

                        assert.file(expectedFiles);

                        testExecutionDirectory.deleteContents();
                    });
            });
    });

class TemporaryDirectory {
    constructor() {
        this.path = undefined;
        this.directoryEntriesWithRelativePath = [];
        this.directoryEntriesWithFullPath = [];
    }
}

TemporaryDirectory.prototype.deleteContents = function () {
    this.validatePath();
    this.collectDirectoryEntries();
    this.deleteDirectoryEntries();
}

TemporaryDirectory.prototype.validatePath = function() {
    if (this.path === undefined) {
        throw new Error('Path of temporary directory is not specified. Cannot delete directory contents.');
    }
}

TemporaryDirectory.prototype.collectDirectoryEntries = function () {
    this.collectDirectoryEntriesWithRelativePath();
    this.convertDirectoryEntriesToFullPath();
}

TemporaryDirectory.prototype.collectDirectoryEntriesWithRelativePath = function() {
    this.directoryEntriesWithRelativePath = fs.readdirSync(this.path);
}

TemporaryDirectory.prototype.convertDirectoryEntriesToFullPath = function () {
    self = this;
    this.directoryEntriesWithRelativePath.forEach(function(relativePath) {
        const fullPath = path.join(self.path, relativePath);
        self.directoryEntriesWithFullPath.push(fullPath);
    });
}

TemporaryDirectory.prototype.deleteDirectoryEntries = function () {
    self = this;
    this.directoryEntriesWithFullPath.forEach(function (fullPath) {
        self.deleteFileOrDirectoryRecursively(fullPath);
    });
}

TemporaryDirectory.prototype.deleteFileOrDirectoryRecursively = function (pathToDelete) {
    try {
        fs.rmdirSync(pathToDelete, { recursive: true });
        console.log('Successfully deleted ' + pathToDelete);
    } catch (err) {
        console.error('Error while deleting ' + pathToDelete);
    }
};

TemporaryDirectory.prototype.setPath = function(path) {
    this.path = path;
}

class GenerateKataNetCoreTestContext {
    constructor(mocha) {
        this.mocha = mocha;

        const visualStudioProjectExtension = '.csproj';
        const visualStudioProjectName = 'SampleKata.Lib';

        this.runGeneratorUnderTest = function (informAboutTemporaryDirectoryPathCallback) {
            this.configureTestExecutionTimeout();

            var self = this;
            const rememberTestExecutionDirectoryCallback = function (path) {
                self.testExecutionDirectory = path;
                informAboutTemporaryDirectoryPathCallback(path);
            }

            return helpers.run(path.join(__dirname, '../../app'))
                .then(rememberTestExecutionDirectoryCallback);
        };

        this.configureTestExecutionTimeout = function () {
            const averageTestExecutionDurationOnGithubInMilliseconds = 12000;
            const safetyTimeoutMarginInMilliseconds = 5000;
            const testExecutionTimeoutInMilliseconds =
                averageTestExecutionDurationOnGithubInMilliseconds + safetyTimeoutMarginInMilliseconds;

            this.mocha.timeout(testExecutionTimeoutInMilliseconds);
        };

        this.getExpectedFiles = function () {
            const classFileName = 'Class1.cs';
            const projectFileName = visualStudioProjectName + visualStudioProjectExtension;

            return [
                path.join(visualStudioProjectName, classFileName),
                path.join(visualStudioProjectName, projectFileName)
            ];
        };
    }
}
