const path = require('path');

module.exports = class CopyTemplateFilesGenerator {
    constructor(fileSystem, configuration) {
        this.fileSystem = fileSystem;
        this.configuration = configuration;

        this.sourceAndDestinationRelativePaths = [
            { source: 'README.md', destination: 'README.md' },
            { source: 'gitignore', destination: '.gitignore' },
            { source: path.join('tools', 'msxsl.exe'), destination: path.join('tools', 'msxsl.exe') },
            { source: path.join('tools', 'dupfinder.xslt'), destination: path.join('tools', 'dupfinder.xslt') },
            { source: path.join('tools', 'dupfinder.bat'), destination: path.join('tools', 'dupfinder.bat') },
        ]
    }

    _copy(sourceRelativePath, destinationRelativePath) {
        const destinationPath = path.join(this.configuration.solutionDirectory, destinationRelativePath);
        const options = {
            solutionName: this.configuration.solutionName
        }
        this.fileSystem.copyTemplate(sourceRelativePath, destinationPath, options);
    }

    generate() {
        this.sourceAndDestinationRelativePaths.forEach(
            sourceAndDestination => this._copy(sourceAndDestination.source, sourceAndDestination.destination));
    }
}
