export const apiUrl = 'http://localhost:3000/api';
// export const apiUrl = process.env.BASE_API_URL|| 'http://localhost:3000/api';
export const jwtSecret = process.env.JWT_SECRET || '1234';
export const mongoUri = process.env.MONGO_URI || '';
export const mailOrg = process.env.MAIL_ORG || '';
export const mailPassword = process.env.MAIL_PASSWORD || '';