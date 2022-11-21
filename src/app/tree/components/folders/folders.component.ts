import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IFile } from 'src/app/models/file.model';
import { IFolder } from 'src/app/models/folder.model';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit, OnChanges {

  @Input()
  folder: IFolder | null = null;

  @Input()
  searchRequest: string | null = null;

  @Input()
  path: string | null = null;

  // Может пригодиться для улучшения
  // @Output()
  // expand: EventEmitter<boolean> = new EventEmitter();

  folderNameMatchesRequest: boolean | undefined = false;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    if (this.path) {
      this.openPath();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchRequest.previousValue !== changes.searchRequest.currentValue) {
      this.search();
    }
  }

  get hasContent(): boolean | undefined {
    return (this.folder?.files && this.folder?.files?.length > 0) || (this.folder?.children && this.folder?.children?.length > 0);
  }

  openFolder(): void {
    if (!this.hasContent) {
      return;
    }

    this.folder!.isOpened = !this.folder?.isOpened;
  }

  openFile(file: IFile): void {
    this.stateService.selectedFile.state = file;
  }

  search(): void {
    if (!this.searchRequest) {
      return;
    }
    this.folderNameMatchesRequest = this.folder?.name.includes(this.searchRequest);
    this.folder?.files.forEach((file: IFile) => {
      file.isHidden = !file.name.includes(this.searchRequest as string);
    });
  }

  openPath(): void {
    const levels = this.path?.split('/');
    if (levels?.length === 1) {
      return;
    }

    let fileName: string | undefined | null = null;
    if (this.path?.slice(-4).startsWith('.')) {
      fileName = levels?.pop();
    }

    let currentFolder: IFolder | undefined | null = this.folder;
    currentFolder!.isOpened = true;

    levels?.slice(1).forEach((level: string) => {
      currentFolder = currentFolder?.children.find((folder: IFolder) => folder.name === level);
      currentFolder!.isOpened = !!currentFolder;
    });

    if (fileName) {
      const foundFile = currentFolder?.files.find((file: IFile) => file.name === fileName);
      if (foundFile) {
        this.openFile(foundFile);
      }
    }
  }

  // Эта штука должна была рекурсивно вверх эмитить разворачивание папки из самой дочерней,
  // в которой нашелся файл/папка, но это пока не работает, посколкьку компонента на момент поиска может не существовать.

  // private startExpand(): void {
  //   console.log('exp ' + this.folder?.name);
  //   this.folder!.isOpened = true;
  //   this.expand.emit(true);
  // }

  // onExpand(): void {
  //   this.folder!.isOpened = true;
  //   this.expand.emit(true);
  // }

}
