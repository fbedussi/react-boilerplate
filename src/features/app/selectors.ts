import { RootState } from '../../model/model'

export const selectAppLang = (state: RootState) => state.app.lang;
