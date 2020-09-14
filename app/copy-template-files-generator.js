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
        const destinationPath = path.join(this.configuration.solutionDirectory, destinationFileName);
        this.fileSystem.copyTemplate(sourceFileName, destinationPath);
    }
    
    _copyMsxslExe() {
        const sourceFileName = 'msxsl.exe';
        const sourcePath = path.join('tools', sourceFileName);
        const destinationPath = path.join(this.configuration.solutionDirectory, 'tools', sourceFileName);
        this.fileSystem.copyTemplate(sourcePath, destinationPath);
    }

    generate() {
        this._copyReadme()
        this._copyGitignore()
        this._copyMsxslExe();
    }
}
