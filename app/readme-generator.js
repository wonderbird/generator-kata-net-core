module.exports = class ReadmeGenerator {
    constructor(fileSystem, configuration) {
        this.fileSystem = fileSystem;
        this.configuration = configuration;
    }

    generate() {
        this.fileSystem.copyTemplate('README.md');
    }
}
