import config from '../../config'
import { getCommonHeaders } from '../../libs/fetchJson'
import { ErrorToLog, HttpError } from '../../model/model'
import { AppThunk } from '../../model/types'
import { slice } from './slice'

const _logToApi = (error: ErrorToLog): AppThunk => (dispatch, getState) => {
	fetch(`${config.apiUrl}/log`, {
		method: 'POST',
		headers: {
			...getCommonHeaders(),
		},
		body: JSON.stringify(error),
	});
};

const setUiError = (error: Error): AppThunk => dispatch => {
	dispatch(
		_logToApi({
			message: error.message || 'unknown error',
			stack: error.stack || '',
			origin: 'internal-ui',
			externalUrl: '',
			internalUrl: window.location.href,
		}),
	);
	dispatch(slice.actions._setUiError(error));
};

export const setHttpError = (error: HttpError): AppThunk => dispatch => {
	dispatch(
		_logToApi({
			...error,
			stack: '',
		}),
	);
	dispatch(slice.actions._setHttpError(error));
};

const errorsActions = {
	...slice.actions,
	setUiError,
	setHttpError,
};

export default errorsActions;
