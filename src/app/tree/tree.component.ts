import { Component, Input, OnInit } from '@angular/core';
import { IFolder } from '../models/folder.model';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input()
  rootFolder: IFolder | null = null;

  @Input()
  searchRequest = '';

  @Input()
  path = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(request: string): void {
    this.searchRequest = request;
  }

  changeIsOpenedState(folder: IFolder | null, target: boolean): void {
    folder?.children.forEach((f: IFolder) => {
      f.isOpened = target;
      if (f.children && f.children.length > 0) {
        this.changeIsOpenedState(f, target);
      }
    });
  }

}
