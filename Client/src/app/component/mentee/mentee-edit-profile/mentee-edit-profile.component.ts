import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenteeProfile } from 'src/app/model/menteeModel';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'mentee-edit-profile',
  templateUrl: './mentee-edit-profile.component.html',
  styleUrls: ['./mentee-edit-profile.component.css'],
})
export class MenteeEditProfileComponent implements OnInit {
  @Input() myProfileData!: MenteeProfile;
  @Output() editModalEvent:EventEmitter<void> = new EventEmitter<void>();

  editProfileForm!: FormGroup;
  profileImage!: File;
  formData: FormData = new FormData();

  constructor(
    private fb: FormBuilder,
    private menteeService: MenteeService,
    private showMessage: MessageToastrService
  ) {}

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      name: [this.myProfileData.name, Validators.required],
      mobile: [this.myProfileData.mobile, Validators.required],
    });
  }

  editSubmit() {
    if (this.editProfileForm.invalid) {
      console.log('not Submitted');
      console.log(this.editProfileForm.value);
    } else {
      console.log('Submitted');
      this.formData.set('name', this.editProfileForm.get('name')!.value!);
      this.formData.set('mobile', this.editProfileForm.get('mobile')!.value!);
      this.formData.set('image', this.profileImage);

      // Server call
      this.menteeService.editMenteeProfile(this.formData).subscribe({
        next: (response) => {
          this.editModalEvent.emit(); // for hide the edit modal part;
          this.showMessage.showSuccessToastr(response.message);
        },
      });
    }
  }

  // Upload image
  onFileUpload(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      this.profileImage = files[0];
    }
  }

  removeEditModal(){
    this.editModalEvent.emit()
  }
}
