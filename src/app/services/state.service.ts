import { Injectable } from '@angular/core';
import { IFile } from '../models/file.model';
import { DataStore } from './data-store';

@Injectable()
export class StateService {
    readonly selectedFile = new DataStore<IFile>();
    readonly searchRequest = new DataStore<string>();
}
