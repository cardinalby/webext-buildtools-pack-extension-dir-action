import { ActionOutput } from 'github-actions-utils';

export const actionOutputs = {
    extensionName: new ActionOutput('extensionName'),
    extensionVersion: new ActionOutput('extensionVersion'),
    zipFilePath: new ActionOutput('zipFilePath')
}