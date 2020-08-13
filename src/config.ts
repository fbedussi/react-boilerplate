import { AppConfig } from './model/model'

const safeEnv = (key: string, defaultValue?: string): string => {
	const value: string = process.env[key] || '';
	const result: any = value || defaultValue;

	// strict check because empty string must be evaluated as true
	if (result === undefined) {
		throw new Error(`Missing key in in .env file: ${key}`);
	}
	return result;
};

const appConfig: AppConfig = {
	apiUrl: safeEnv('REACT_APP_API_URL', 'http://localhost:5000'),
	env: safeEnv('NODE_ENV', 'development'),
	languages: ['en-US'],
};

export default appConfig;
