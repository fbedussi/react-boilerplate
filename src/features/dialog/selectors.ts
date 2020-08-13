import { RootState } from '../../model/model'

export const selectDialogType = (state: RootState) => state.dialog.type

export const selectDialog = (state: RootState) => state.dialog
