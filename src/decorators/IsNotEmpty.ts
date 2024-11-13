import { HttpException } from '@nestjs/common';
import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
} from 'class-validator';

export function IsNotEmptyWithStatusCode(
	statusCode: number,
	validationOptions?: ValidationOptions,
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isNotEmptyWithStatusCode',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return value !== null && value !== undefined && value !== '';
				},
				defaultMessage(args: ValidationArguments) {
					throw new HttpException('Forbidden', statusCode);
				},
			},
		});
	};
}
