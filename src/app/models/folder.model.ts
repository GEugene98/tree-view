import { IFile } from './file.model';

export interface IFolder {
    name: string;
    files: IFile[];
    children: IFolder[];
    isOpened: boolean;
}
