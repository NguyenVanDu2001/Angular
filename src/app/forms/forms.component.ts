import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormsService } from './service/forms.service';
import { FormDataSelect } from './service/form.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { formCovert, formInput } from './service/form';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private formService: FormsService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar) { }
  profileForm = this.formBuilder.group({
    input: ['12'],
    output: ['12'],
    ConvertTo: ['1'],
    ConvertInto: ['1'],
    gender: ['']
  });

  // Load combobox 
  getTypeConvert() {
    return FormDataSelect;
  }
  selectedItem = 1;
  selectedItem1 = 1;

  saveForm() {
    this.formService.getStudentList(this.profileForm.value).subscribe((res: formCovert) => {
      if (res.statusCode == 200)
        this.messageNotify(res.message);
      this.profileForm.controls['output'].setValue(res.data);
    });
  }
  private messageNotify(message: string) {
    this.snackBar.open(message, "done", {
      duration: 2000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'right', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right',
      panelClass: ["custom-style"]
    });
  }

  ngOnInit(): void {
  }

}
