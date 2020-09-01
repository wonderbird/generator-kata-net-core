module.exports = class FileSystem {
    constructor(yeoman) {
        this.yeoman = yeoman;
    }

    copyTemplate(templateFileRelativePath) {
        const sourcePath = this.yeoman.templatePath(templateFileRelativePath);
        const destinationPath = this.yeoman.destinationPath(templateFileRelativePath);
        this.yeoman.fs.copyTpl(sourcePath, destinationPath);
    }
}
