module.exports = class ReadmeGenerator {
    constructor(fileSystem, configuration) {
        this.fileSystem = fileSystem;
        this.configuration = configuration;
    }

    generate() {
        // TODO make the README more beatuiful; add developer instructions
        this.fileSystem.copyTemplate('README.md');
    }
}
