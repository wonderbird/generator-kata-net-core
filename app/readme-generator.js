const path = require('path');

module.exports = class ReadmeGenerator {
    constructor(fileSystem, configuration) {
        this.fileSystem = fileSystem;
        this.configuration = configuration;
    }

    generate() {
        // TODO make the README more beatuiful; add developer instructions
        const destinationPath = path.join(this.configuration.solutionName, 'README.md');
        this.fileSystem.copyTemplate('README.md', destinationPath);
    }
}
