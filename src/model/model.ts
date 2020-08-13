export type Id = string;

export interface AppState {
	lang: string;
}

export type ErrorOrigin =
	| 'internal-api'
	| 'internal-ui'
	| 'external'
	| 'unknown';

export type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 408 | 500;

export interface HttpError {
	status: HttpErrorCode;
	stack: string;
	message: string;
	internalUrl: string;
	externalUrl: string;
	origin: ErrorOrigin;
}

export interface RecordedHttpError extends HttpError {
	id: string;
}

export interface UiError {
	id: string;
	message: string;
	stack: string;
}

export interface RecordedUiError extends UiError {
	id: string;
}

export interface LoginError {
	message: string;
	details: string;
}

export interface Errors {
	http: RecordedHttpError[];
	ui: RecordedUiError[];
	login: LoginError;
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
	_id: Id;
	type: NotificationType;
	message: string;
	autoClose: boolean;
	errorId?: string;
	errorType?: 'ui' | 'http';
}

export interface ErrorToLog
	extends Omit<HttpError, 'id' | 'status'>,
		Omit<UiError, 'id'> {}

export type Language = 'en-US' | 'sp-US';

export interface AppConfig {
	apiUrl: string;
	languages: Language[];
	env: string;
}

export type DialogType = 'none';

export interface DialogState {
	type: DialogType;
}

export interface NoDialogType {
	type: 'none';
}

export type Dialog = NoDialogType;

export interface RootState {
	errors: Errors;
	app: AppState;
	notifications: Notification[];
	dialog: Dialog;
}
