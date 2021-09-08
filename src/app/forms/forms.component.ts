import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl ,FormBuilder} from '@angular/forms';
import {FormsService} from './service/forms.service';
import {FormDataSelect} from './service/form.data';
import { HttpClient } from '@angular/common/http';
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
    private REST_API_SERVER = "https://localhost:44308/Home/Base64Encode";
    private asb = "https://localhost:44308/home/Base64Encode?plainText=12122"
saveForm(){
    var objectData = this.profileForm.value;
   var data =  this.httpClient.get(this.asb);
   debugger
   return data;
}
  ngOnInit(): void {
  }

}
