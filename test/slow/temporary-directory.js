var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');

class TemporaryDirectory {
    constructor(path) {
        this.path = path;
        this.directoryEntriesWithRelativePath = [];
        this.directoryEntriesWithFullPath = [];
    }
}

TemporaryDirectory.prototype.delete = function () {
    this.validatePath();
    this.collectDirectoryEntries();
    this.deleteDirectoryEntries();
    this.deleteFileOrDirectoryRecursively(this.path);
}

TemporaryDirectory.prototype.validatePath = function () {
    if (this.path === undefined) {
        throw new Error('Path of temporary directory is not specified. Cannot delete directory contents.');
    }
}

TemporaryDirectory.prototype.collectDirectoryEntries = function () {
    this.collectDirectoryEntriesWithRelativePath();
    this.convertDirectoryEntriesToFullPath();
}

TemporaryDirectory.prototype.collectDirectoryEntriesWithRelativePath = function () {
    this.directoryEntriesWithRelativePath = fs.readdirSync(this.path);
}

TemporaryDirectory.prototype.convertDirectoryEntriesToFullPath = function () {
    var self = this;
    this.directoryEntriesWithRelativePath.forEach(function (relativePath) {
        const fullPath = path.join(self.path, relativePath);
        self.directoryEntriesWithFullPath.push(fullPath);
    });
}

TemporaryDirectory.prototype.deleteDirectoryEntries = function () {
    var self = this;
    this.directoryEntriesWithFullPath.forEach(function (fullPath) {
        self.deleteFileOrDirectoryRecursively(fullPath);
    });
}

TemporaryDirectory.prototype.deleteFileOrDirectoryRecursively = function (pathToDelete) {
    try {
        rimraf.sync(pathToDelete);
        console.log('Successfully deleted ' + pathToDelete);
    } catch (err) {
        console.error('Error while deleting ' + pathToDelete + ": " + err);
    }
};

TemporaryDirectory.prototype.setPath = function (path) {
    this.path = path;
}

module.exports = TemporaryDirectory;
