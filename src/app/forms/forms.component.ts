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
    private snackBar: MatSnackBar) {
  }
  imageSrc = "#";
  profileForm = this.formBuilder.group({
    input: [''],
    output: [''],
    ConvertTo: ['1'],
    ConvertInto: ['1'],
    file: ['']
  });
  // Load combobox 
  getTypeConvert() {
    return FormDataSelect;
  }
  fileImg: any;
  saveForm(): void {
    if (Number(this.profileForm.controls.ConvertTo.value) == 4) {
    
      // Create FormData object
      this.formService.postImgToServerCovert(this.profileForm.value,this.fileImg).subscribe((res: formCovert) => {
        if (res.statusCode == 200)
          this.messageNotify(res.message);
        this.profileForm.controls['output'].setValue(res.data);
      });
    } else {
      this.formService.getConvertToServer(this.profileForm.value).subscribe((res: formCovert) => {
        if (res.statusCode == 200)
          this.messageNotify(res.message);
        this.profileForm.controls['output'].setValue(res.data);
      });
    }
  }
  private messageNotify(message: string) {
    this.snackBar.open(message, "done", {
      duration: 2000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'right', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right',
      panelClass: ["custom-style"]
    });
  }

  get isConvertImg(): number {
    const valueselect = Number(this.profileForm.controls.ConvertTo.value);
    if (valueselect == 4) {
      this.profileForm.controls['input'].setValue("");
    }
    return Number(valueselect);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileImg = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }


  ngOnInit(): void {
  }

}
