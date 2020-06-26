import { actionInputs as inputs, transformIfSet } from 'github-actions-utils';

export const actionInputs = {
    extensionDir: inputs.getWsPath('extensionDir', true),
    zipGlobPattern: inputs.getString('zipGlobPattern', false),
    zipIgnore: transformIfSet(inputs.getString('zipIgnore', false), s => s.split('|')),

    zipFilePath: inputs.getWsPath('zipFilePath', false)
}