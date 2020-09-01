module.exports = class ReadmeGenerator {
    constructor(yeomanFileSystem, configuration) {
        this.yeomanFileSystem = yeomanFileSystem;
        this.configuration = configuration;
    }

    generate() {
        this.yeomanFileSystem.copyTemplate('README.md');
    }
}
