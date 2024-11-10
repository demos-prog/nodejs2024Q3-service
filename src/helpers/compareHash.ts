import * as bcrypt from 'bcrypt';

export default function comparePassword(
	existingPassword: string,
	recievedPassword: string,
) {
	return bcrypt.compareSync(recievedPassword, existingPassword);
}
