import { IsString } from 'class-validator';
import { IsNotEmptyWithStatusCode } from 'src/decorators/IsNotEmpty';

export class RefreshTokenDto {
	@IsNotEmptyWithStatusCode(401)
	@IsString()
	refreshToken: string;
}
