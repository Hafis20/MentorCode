import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  mobileNumberValidation,
  negativeValidation,
  spaceValidation,
} from 'src/app/customValidation/validation';
import { MentorProfile } from 'src/app/model/mentorModel';
import { MentorService } from 'src/app/services/mentor.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-mentor-edit-profile',
  templateUrl: './mentor-edit-profile.component.html',
  styleUrls: ['./mentor-edit-profile.component.css'],
})
export class MentorEditProfileComponent implements OnInit {
  MentorData!: MentorProfile;
  editProfileForm!: FormGroup;
  profileImage!: File;
  formData:FormData = new FormData();
  constructor(
    private service: MentorService,
    private showMessage: MessageToastrService,
    private fb: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      fullName: ['', [Validators.required, spaceValidation]],
      mobile: ['', [Validators.required, mobileNumberValidation]],
      fee: ['', [Validators.required, negativeValidation, spaceValidation]],
      experience: [
        '',
        [Validators.required, negativeValidation, spaceValidation],
      ],
      skills: [[]],
      about: [''],
    });

    this.service.getMentorProfile().subscribe({
      next: (response) => {
        this.MentorData = response[0];
        this.updateForm();
      },
    });
    // Creating form for edit profile
  }

  updateForm() {
    this.editProfileForm.patchValue({
      fullName: this.MentorData.name,
      mobile: this.MentorData.mobile,
      fee: this.MentorData.fee,
      experience: this.MentorData.experience,
      about: this.MentorData.about,
    });
  }

  onSubmit() {
    const skills = this.MentorData.skills; // Setting the value into array
    this.editProfileForm.patchValue({ skills });
    // After click on submit the following actins will occur
    if (this.editProfileForm.invalid) {
      if (this.nameError()) {
        // VAlidating the feilds and throw error
        this.showMessage.showWarningToastr(this.nameError());
      }

      if (this.mobileError()) {
        // Validation in mobile error
        this.showMessage.showWarningToastr(this.mobileError());
      }
      // Fee validation
      if (this.feeError()) {
        this.showMessage.showWarningToastr(this.feeError());
      }

      // Experience validation
      if (this.experienceError()) {
        this.showMessage.showWarningToastr(this.experienceError());
      }
    } else {
      // If the user delete all the skills and he try to add
      if (skills.length < 3) {
        this.showMessage.showWarningToastr('Add atleast 3 skills');
      } else {
        this.formData.set('name',this.editProfileForm.get('fullName')!.value!);
        this.formData.set('fee',this.editProfileForm.get('fee')!.value!);
        this.formData.set('mobile',this.editProfileForm.get('mobile')!.value!);
        this.formData.set('experience',this.editProfileForm.get('experience')!.value!);
        this.formData.set('skills',JSON.stringify(this.editProfileForm.get('skills')!.value!));
        this.formData.set('about',this.editProfileForm.get('about')!.value!);
        this.formData.set('image',this.profileImage);
        this.service.editMentorProfile(this.formData).subscribe({
          // Backend call for editing the profile
          next: (response) => {
            this.router.navigate(['/mentor/profile']);
            this.showMessage.showSuccessToastr(response.message);
          },
          error:(error)=>{
            this.showMessage.showErrorToastr(error.message);
          }
        });
      }
    }
    this.editProfileForm.get('skills')?.reset();
  }

  addSkill(skill: string) {
    // Adding skill
    if (skill.trim() === '') {
      this.showMessage.showWarningToastr('Skills Required');
    } else if (this.MentorData.skills.includes(skill)) {
      this.showMessage.showWarningToastr('Already exists');
    } else {
      this.MentorData.skills.push(skill);
      this.editProfileForm.get('skills')?.reset();
    }
  }

  removeSkill(index: number) {
    //Removing skill
    this.MentorData.skills = this.MentorData.skills.filter(
      (_, i) => i !== index
    );
  }

  // Image upload
  onFileUpload(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      this.profileImage = files[0];
    }
  }

  // Error  validation
  nameError(): string {
    const name = this.editProfileForm.get('fullName');
    if (name?.invalid) {
      if (name.errors?.['required']) {
        return `Name feild is required`;
      } else if (name.errors?.['spaceError']) {
        return `Invalid Name`;
      }
    }
    return ``;
  }

  // Mobile number
  mobileError(): string {
    const mobile = this.editProfileForm.get('mobile');
    if (mobile?.invalid) {
      if (mobile.errors?.['required']) {
        return `Mobile number is required`;
      } else if (mobile.errors?.['mobileNumberError']) {
        return `Enter a valid number`;
      }
    }
    return ``;
  }

  // Negative validation
  feeError(): string {
    const fee = this.editProfileForm.get('fee');
    if (fee?.invalid) {
      if (fee.errors?.['required']) {
        return `Fees is required`;
      } else if (fee.errors?.['negativeError']) {
        return `Enter a valid fees`;
      } else if (fee.errors?.['spaceError']) {
        return `Enter a valid fees`;
      }
    }
    return ``;
  }

  // Experience validation
  experienceError(): string {
    const exp = this.editProfileForm.get('experience');
    if (exp?.invalid) {
      if (exp.errors?.['required']) {
        return `Experience is required`;
      } else if (exp.errors?.['negativeError']) {
        return `Enter a valid Experience`;
      } else if (exp.errors?.['spaceError']) {
        return `Enter a valid Experience`;
      }
    }
    return ``;
  }
}
