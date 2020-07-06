var path = require('path');
var fs = require('fs');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('yo kata-net-core',
    function () {
        beforeEach(function () {
            this.timeout(10000);

            var _self = this;

            const visualStudioProjectExtension = '.csproj';
            const libraryProjectDir = 'SampleKata.Lib';
            const libraryProjectFile = libraryProjectDir + visualStudioProjectExtension;
            const defaultClassFileInEmptyProject = 'Class1.cs';

            this.directoriesToCreate = [
                libraryProjectDir
            ];

            this.filesToCreate = [
                path.join(libraryProjectDir, libraryProjectFile),
                path.join(libraryProjectDir, defaultClassFileInEmptyProject)
            ];

            return helpers.run(path.join(__dirname, '../../app'))
                .then(function(dir) {
                    _self.tmpDir = dir;
                });
        });

        afterEach(function () {
            this.directoriesToCreate.forEach(relativePath => {
                var pathToDelete = path.join(this.tmpDir, relativePath);

                try {
                    fs.rmdirSync(pathToDelete, { recursive: true });
                } catch (err) {
                    console.error('Error while deleting ' + pathToDelete);
                }
            });
        });

        it('should create required directories and files',
            function () {
                assert.file(this.filesToCreate);
            });
    });