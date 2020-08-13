import { selectAppLang } from '../features/app/selectors'
import errorsActions from '../features/errors/actions'
import { ErrorOrigin, HttpError, HttpErrorCode } from '../model/model'
import store from '../store'

export const isHttpError = (error: unknown): error is HttpError =>
	typeof error === 'object' &&
	error !== null &&
	'status' in error &&
	'message' in error &&
	'internalUrl' in error &&
	'origin' in error &&
	'externalUrl' in error;
const isJsError = (error: unknown): error is Error => error instanceof Error;

const decodeStatus = (status: string | number): HttpErrorCode => {
	const statusNumber = Number(status);
	switch (statusNumber) {
		case 400:
		case 401:
		case 403:
		case 404:
		case 405:
		case 408:
		case 500:
			return statusNumber;
		default:
			return 500;
	}
};

const decodeOrigin = (origin: string | undefined): ErrorOrigin => {
	switch (origin) {
		case 'internal-api':
		case 'internal-ui':
		case 'external':
		case 'unknown':
			return origin;
		default:
			return 'unknown';
	}
};

const SUCCESS_CODES = [200, 201];

export const getCommonHeaders = () => {
	const state = store.getState();
	const lang = selectAppLang(state);
	return {
		accept: 'application/json',
		'Content-type': 'application/json',
		lang: lang || 'en-US',
	};
};

export const decodeRes = (res: Response) =>
	res.json().catch((error: Error) => {
		// res.json() can fail if:
		// - The API call failed. In this case we keep res status and statusText that explain why
		// - The API call succeded but response is not a valid JSON. In this case we use custom status code and text
		// in these cases we construct an httpError objet to pass down
		const httpError: HttpError = {
			status: SUCCESS_CODES.includes(res.status)
				? 500
				: decodeStatus(res.status),
			message: SUCCESS_CODES.includes(res.status)
				? `The API response is not a valid JSON: ${error.message}`
				: res.statusText,
			internalUrl: res.url,
			externalUrl: '',
			origin: 'internal-api',
			stack: '',
		};
		return httpError;
	});

export const fetchJson = <T>(
	input: RequestInfo,
	init?: RequestInit,
): Promise<void | T> =>
	window
		.fetch(
			input,
			Object.assign(
				{
					headers: getCommonHeaders(),
				},
				init || {},
			),
		)
		.then(res => {
			const decodedRes =
				init?.method?.toUpperCase() === 'DELETE'
					? Promise.resolve(res)
					: decodeRes(res);
			return decodedRes.then((decodedRes: any) => {
				// httpError detected during JSON decoding
				if (isHttpError(decodedRes)) {
					return store.dispatch(errorsActions.setHttpError(decodedRes));
				}

				// API responded with an error
				// NOTE: API error response *must* comply to HttpError interface
				if (!SUCCESS_CODES.includes(res.status)) {
					const httpError: HttpError = {
						message: res.statusText,
						internalUrl: res.url,
						externalUrl: '',
						stack: '',
						...decodedRes,
						status: decodeStatus(res.status),
						origin: decodeOrigin(decodedRes.origin),
					};
					return store.dispatch(errorsActions.setHttpError(httpError));
				}
				// Everything's fine
				return decodedRes as T;
			});
		})
		.catch((error: unknown) => {
			// catch error in previous code
			return isHttpError(error)
				? store.dispatch(errorsActions.setHttpError(error))
				: isJsError(error)
				? store.dispatch(errorsActions.setUiError(error))
				: store.dispatch(
						errorsActions.setUiError(new Error('Unknown error in fetchJson')),
				  );
		});
