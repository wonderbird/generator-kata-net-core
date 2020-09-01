module.exports = class FileSystem {
    constructor(yeoman) {
        this.yeoman = yeoman;
    }

    copyTemplate(templateFileRelativePath) {
        // TODO process the argument
        // TODO use yeoman.templatePath and yeoman.destinationPath
        this.yeoman.fs.copyTpl('./templates/README.md', 'README.md');
    }
}
