module.exports = class ClassLibraryGenerator {
    constructor(yeoman) {
        this.yeoman = yeoman;

    }

    generate() {
        this.yeoman.log('Creating .NET Core class library ...');
        this.yeoman.spawnCommandSync('dotnet',
            ['new', 'classlib', '--language', 'C#', '--name', 'SampleKata.Lib']);
    }
}