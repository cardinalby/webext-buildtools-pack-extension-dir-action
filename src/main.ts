import * as ghActions from '@actions/core';
import DirReaderBuilder, { IDirReaderOptions } from 'webext-buildtools-dir-reader-mw';
import { actionInputs } from './actionInputs';
import { actionOutputs } from './actionOutputs';

process.on('warning', (warning) => {
    console.log(warning.stack);
});

// noinspection JSUnusedLocalSymbols
async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(error.message);
    }
}

async function runImpl() {
    const logger = console.log;

    const options: IDirReaderOptions = {};
    const dirBuilder = new DirReaderBuilder(options, logger);
    dirBuilder.setInputDirPath(actionInputs.extensionDir);
    dirBuilder.requireManifest();
    if (actionInputs.zipFilePath) {
        options.zipOutPath = actionInputs.zipFilePath;
        options.zipOptions = {
            globPattern: actionInputs.zipGlobPattern,
            ignore: actionInputs.zipIgnore
        };
        dirBuilder.requireZipFile();
    }

    const dirReaderAssets = (await dirBuilder.build()).getAssets();
    if (actionInputs.zipFilePath) {
        if (!dirReaderAssets.zipFile) { throw new Error('no zip file asset'); }
        actionOutputs.zipFilePath.setValue(dirReaderAssets.zipFile.getValue());
    }
    if (!dirReaderAssets.manifest) {
        throw new Error('no manifest asset');
    }
    actionOutputs.extensionName.setValue(dirReaderAssets.manifest.getValue().name);
    actionOutputs.extensionVersion.setValue(dirReaderAssets.manifest.getValue().version);
}

// noinspection JSIgnoredPromiseFromCall
run();