import * as bcrypt from 'bcrypt';

export default function comparePassword(
	hash: string,
	recievedPassword: string,
) {
	return bcrypt.compareSync(recievedPassword, hash);
}
