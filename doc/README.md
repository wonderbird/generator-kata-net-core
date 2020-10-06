# Yeoman `kata-net-core` Generator

## Documentation Contents

1. [Composite Structure](composite-structure.adoc)

## How To Render The Docs

The documentation is written in [GitHub Flavoured AsciiDoc](https://gist.github.com/dcode/0cfbf2699a1fe9b46ff04c41721dda74). Images are inserted as described by D. Buret in [Using plantuml in AsciiDoc on GitHub](https://github.com/DBuret/journal/blob/master/github-adoc-puml.adoc)

You can use the following tools to process the docs in an editor:

* [Visual Studio Code](https://code.visualstudio.com)
* [AsciiDoc Plugin](https://marketplace.visualstudio.com/items?itemName=asciidoctor.asciidoctor-vscode)
  * Enable `asciidoc.use_kroki` in the Visual Studio Code settings (see also the [asciidoctor-kroki repository on GitHub](https://github.com/Mogztter/asciidoctor-kroki))
* [PlantUML Plugin](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)
  * This requires to have the [Graphvis dot](https://graphviz.org) tool installed in your path

In order to view a PlantUML diagram, open the `.puml` file in Visual Studio Code and press `ALT+D` to enable the preview pane.
