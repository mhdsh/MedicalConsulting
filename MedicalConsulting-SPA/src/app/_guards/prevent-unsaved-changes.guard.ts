import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty || component.editMedicalForm.dirty) {
            return confirm('هل أنت متأكد أنك تريد المتابعة. أي تغيرات لم تحفظها سوف تفقد');
        }
        return true;
    }
}
