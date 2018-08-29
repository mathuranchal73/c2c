import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TablesComponent }  from './tables.component';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { QuestionService } from './questions.service';

@NgModule({
    imports:      [ BrowserModule,HttpModule ],
    declarations: [ TablesComponent ],
    providers: [QuestionService],
    bootstrap:    [ TablesComponent ]
  })
  export class TableModule { }