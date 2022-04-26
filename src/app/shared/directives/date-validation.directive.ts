import {AbstractControl, ValidatorFn} from "@angular/forms";

export class CustomeDateValidators {
static invalidDateValidator(startDate: string, endDate: string): ValidatorFn {
  return (educationForm: AbstractControl): {[key: string]: any} | null => {
    const fromDate = educationForm.get(startDate)?.value;
    const toDate = educationForm.get(endDate)?.value;
    if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
      return {"date is not valid": true};
    }
    return null;
  };
}
}
