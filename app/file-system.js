module.exports = class FileSystem {
    constructor(yeoman) {
        this.yeoman = yeoman;
    }

    copyTemplate(relativeSourcePath, relativeDestinationPath, options) {
        const fullSourcePath = this.yeoman.templatePath(relativeSourcePath);
        const fullDestinationPath = this.yeoman.destinationPath(relativeDestinationPath);
        this.yeoman.fs.copyTpl(fullSourcePath, fullDestinationPath, options);
    }
}
