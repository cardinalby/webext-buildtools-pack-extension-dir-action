![Node.js CI](https://github.com/cardinalby/webext-buildtools-pack-extension-dir-action/workflows/build-test/badge.svg)

# Pack WebExtension directory to zip

The action reads WebExtension's manifest file and packs directory to zip file.
You can use it to upload as release artifact or to provide inputs for further build steps.

If you are interested in the building the entire deployment workflow for WebExtension, 
you can read this [article](https://dev.to/cardinalby/webextension-deployment-and-publishing-using-github-actions-522o).

Based on [DirReaderBuilder](https://www.npmjs.com/package/webext-buildtools-dir-reader-mw) package.

## Inputs

* `extensionDir`
**Required** Path to WebExtension directory (relative to repository)

* `zipFilePath`
Specify to save result zip file to path (relative to repository).

* `zipGlobPattern`
Include files according to the pattern while packing crx. 
Default: `**`

* `zipIgnore`
Patterns of files which will be excluded from the zip, separated by `|`. 
Default: `*.pem|.git|*.crx`

## Outputs
* `extensionName` from extension's manifest
* `extensionVersion` from extension's manifest
* `zipFilePath` the absolute path to the result zip file

## Example usage

```yaml
uses: cardinalby/webext-buildtools-pack-extension-dir-action@v1
with:
  extensionDir: 'extension'
  zipFilePath: 'build/extension.zip'
```