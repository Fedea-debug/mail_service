import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordValidationConstraint,
    });
  };
}

@ValidatorConstraint({ async: false })
export class PasswordValidationConstraint
  implements ValidatorConstraintInterface
{
  validate(password: any, args: ValidationArguments) {
    const { object } = args;
    const email = (object as any).email;
    if (password === email) {
      return false;
    }
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      password,
    );
    return isValidPassword;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password does not meet complexity requirements or is equal to the email.';
  }
}
