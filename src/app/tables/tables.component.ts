
import { Component,OnInit } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './questions.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [QuestionService],
})
export class TablesComponent implements OnInit {
    question:Question[]=[];
    errorMessage:string='';
    isLoading:boolean=true;

    constructor(private questionService:QuestionService){}

    ngOnInit(){
        this.questionService
        .getAll()
        .subscribe(
            q=> this.question=q,
            e=>this.errorMessage=e,
            ()=>this.isLoading=false
        );
    }
  }