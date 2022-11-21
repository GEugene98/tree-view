import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { FoldersComponent } from './tree/components/folders/folders.component';
import { ContentComponent } from './tree/components/content/content.component';
import { SearchBarComponent } from './tree/components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from './services/json.service';
import { StateService } from './services/state.service';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    FoldersComponent,
    ContentComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [JsonService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
