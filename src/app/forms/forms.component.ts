import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl ,FormBuilder} from '@angular/forms';
import {FormsService} from './service/forms.service';
import {FormDataSelect} from './service/form.data';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

 constructor(private formBuilder:FormBuilder,private formService:FormsService ,private httpClient: HttpClient){}
 profileForm = this.formBuilder.group({
  input:['12'],
  output:['12'],
  ConvertInput:['1'],
  Convertoutput:['1'],
  gender:['']
});

// Load combobox 
    getTypeConvert() {
     return  FormDataSelect;
    } 
    selectedItem = 1;
    selectedItem1 =1;
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private REST_API_SERVER = "http://localhost:44308/api/ConvertApi/ConvertTypeIntoResult";
    saveForm(){
      // var data = this.formService.getApi();
      var data1 = this.formService.getStudentList().subscribe(res => {
          console.log(res);
      });
    }
    ngOnInit(): void {
    }

}
