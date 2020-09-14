const path = require('path');

module.exports = class CopyTemplateFilesGenerator {
    constructor(fileSystem, configuration) {
        this.fileSystem = fileSystem;
        this.configuration = configuration;
    }

    _copyReadme() {
        const sourceFileName = 'README.md';
        const destinationPath = path.join(this.configuration.solutionDirectory, sourceFileName);
        this.fileSystem.copyTemplate(sourceFileName, destinationPath);

    }

    _copyGitignore() {
        const sourceFileName = 'gitignore';
        const destinationFileName = '.gitignore';
        this.fileSystem.copyTemplate(sourceFileName, destinationFileName);

    }

    generate() {
        this._copyReadme()
        this._copyGitignore()
    }
}
