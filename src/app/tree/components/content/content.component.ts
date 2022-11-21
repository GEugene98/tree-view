import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IFile } from 'src/app/models/file.model';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input()
  file: IFile | null = null;
  file$: Observable<IFile> | null = null;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.file$ = this.stateService.selectedFile.state$;
  }

}
