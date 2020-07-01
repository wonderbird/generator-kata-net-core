module.exports = class ClassLibraryGenerator {
    constructor(yeoman) {
        this.yeoman = yeoman;

    }

    generate() {
        this.yeoman.log('Creating .NET Core class library ...');
        this.yeoman.spawnCommand('dotnet',
            ['new', 'classlib', '--dry-run', '--language', 'C#', '--name', 'SampleKata.Lib']);
    }
}