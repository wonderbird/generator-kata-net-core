const path = require('path');

module.exports = class CopyTemplateFilesGenerator {
    constructor(fileSystem, configuration) {
        this.fileSystem = fileSystem;
        this.configuration = configuration;
    }

    _copyReadme() {
        const readmeFileName = 'README.md';
        const readmeDestinationPath = path.join(this.configuration.solutionName, readmeFileName);
        this.fileSystem.copyTemplate(readmeFileName, readmeDestinationPath);

    }

    _copyGitignore() {
        const gitignoreSourceFileName = 'gitignore';
        const gitignoreTargetFileName = '.gitignore';
        this.fileSystem.copyTemplate(gitignoreSourceFileName, gitignoreTargetFileName);

    }

    generate() {
        this._copyReadme()
        this._copyGitignore()
    }
}
