import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-foto-uploader',
  imports: [CommonModule],
  templateUrl: './FotoUploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FotoUploaderComponent {
  formGroup = input.required<FormGroup>();

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.formGroup().get('foto')?.setValue(reader.result);
    };
    reader.readAsDataURL(file);

    console.log(this.formGroup().get('foto'));
  }
}
