import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderFormValidators} from './validators/order-form.validators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {

  @Output() confirmOrder = new EventEmitter();
  orderForm: FormGroup;
  validationMessages = {
    name: '',
    email: '',
    address: ''
  };
  isSubmitted = false;
  readonly maxPhones = 3;

  private sub: Subscription;
  private validationMessagesMap = {
    name: {
      userName: 'Name should start with a capital letter',
      required: 'Please enter your name',
    },
    email: {
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.',
      email: 'Please enter a valid email address.',
      CustomEmailValidator: 'Email should ends with com,ru or by'
    },
    phone: {
      required: 'Please enter your phone',
    },
    address: {
      required: 'Please enter your address',
    }
  };


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAddPhone(): void {
    if (this.phones.length < this.maxPhones) {
      this.phones.push(this.fb.control(''));
    }
  }

  onRemovePhone(i: number): void {
    this.phones.removeAt(i);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.updateValidationMessage();
    if (this.orderForm.valid) {
      this.confirmOrder.emit(this.orderForm.value);
    }
  }

  get phones(): FormArray {
    return this.orderForm.get('phones') as FormArray;
  }

  private updateValidationMessage(): void {
    const nameControl = this.orderForm.get('name');
    const emailControl = this.orderForm.get('email');
    const addressControl = this.orderForm.get('address');
    this.setValidationMessage(nameControl, 'name');
    this.setValidationMessage(emailControl, 'email');
    this.setValidationMessage(addressControl, 'address');
  }

  private watchValueChanges(): void {
    this.sub = this.orderForm
      .get('pickup')
      .valueChanges.subscribe((value) => this.updateAddressControl(value));
  }

  private updateAddressControl(isPickup): void {
    const addressControl = this.orderForm.get('address');
    addressControl.clearValidators();
    if (isPickup) {
      addressControl.setValidators(Validators.required);
    }
    addressControl.updateValueAndValidity();
  }

  private setValidationMessage(c: AbstractControl, controlName: string): void {
    this.validationMessages[controlName] = '';
    if ((this.isSubmitted) && c.errors) {
      this.validationMessages[controlName] = Object.keys(c.errors)
        .map((key) => this.validationMessagesMap[controlName][key])
        .join(' ');
    }
  }

  private buildForm(): void {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, OrderFormValidators.userName]],
      secondName: '',
      email: ['',
        [Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
          Validators.email]
      ],
      phones: this.createPhone(),
      pickup: false,
      address: ''
    });
  }

  private createPhone(): FormArray {
    return this.fb.array([['', Validators.required]]);
  }

}
