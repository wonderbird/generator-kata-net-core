module.exports = class SolutionGenerator {
    constructor(yeoman) {
        this.yeoman = yeoman;
    }

    generate() {
        this.yeoman.log('Creating .NET Core solution ...');
        this.yeoman.spawnCommandSync('dotnet',
            ['new', 'sln', '--output', 'SampleKata']);

        process.chdir('SampleKata');

        this.yeoman.log('Creating .NET Core class library ...');
        this.yeoman.spawnCommandSync('dotnet',
            ['new', 'classlib', '--language', 'C#', '--name', 'SampleKata.Lib']);

        this.yeoman.log('Adding .NET Core class library to solution ...');
        this.yeoman.spawnCommandSync('dotnet',
            ['sln', 'add', 'SampleKata.Lib/SampleKata.Lib.csproj']);

        process.chdir('..');
    }
}