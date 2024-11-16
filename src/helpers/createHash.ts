import * as bcrypt from 'bcrypt';

export function creatHash(data: string) {
	const saltRounds = parseInt(process.env.CRYPT_SALT || '10', 10);
	return bcrypt.hashSync(data, saltRounds);
}
