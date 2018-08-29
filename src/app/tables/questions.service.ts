import { Question } from './question';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';




@Injectable()
export class QuestionService {
   private baseUrl:string='http://localhost:51415/api';
   constructor(private http: Http){}
   
   getAll(): Observable<Question[]> {
    let question$ = this.http
    .get(`${this.baseUrl}/Questions`, { headers: this.getHeaders() })
    .map(mapQuestions)
    .catch(handleError);
  return question$
   }

   private getHeaders() {
   let headers=new Headers()
   headers.append('Accept','application/json')
   return headers;
   }

   get(id:number):Observable<Question>{
       let question$=this.http
       .get('${this.baseUrl}/Question/$(id)',{headers:this.getHeaders()})
       .map(mapQuestion)
       .catch(handleError);
       return question$;
   }

   save(question:Question):Observable<Response>{
       return this
       .http
       .put('${this.baseUrl}/Questions/${question.id}',
    JSON.stringify(question),{headers:this.getHeaders()});
   }

}

function mapQuestions(response:Response):Question[]{
    return response.json().map(toQuestion)
}

function toQuestion(r:any):Question{
    let question=<Question>({
        ID:r.ID,
        QuestionCategoryId:r.QuestionCategoryId,
        QuestionType:r.QuestionType,
        Question1:r.Question1,
        ExhibitId:r.ExhibitId,
        Points:r.Points,
        isActive:r.isActive

    });
    console.log('Parsed Question:',question);
    return question;
}

function extractId(questionData:any){
    let extractedId=questionData.url.replace('http://localhost:51415/api/Questions/','').replace('/','');
    return parseInt(extractedId);
}

function mapQuestion(response:Response):Question{
    return toQuestion(response.json());
}

function handleError(error:any){
    let errorMsg=error.message||'Yikes! There was a problem with our hyperdrive device and we couldnt retrieve your data !'
    console.error(errorMsg);

    return Observable.throw(errorMsg);
}
