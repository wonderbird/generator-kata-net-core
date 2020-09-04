const path = require('path');

module.exports = class CopyTemplateFilesGenerator {
    constructor(fileSystem, configuration) {
        this.fileSystem = fileSystem;
        this.configuration = configuration;
    }

    generate() {
        const destinationPath = path.join(this.configuration.solutionName, 'README.md');
        this.fileSystem.copyTemplate('README.md', destinationPath);
    }
}
