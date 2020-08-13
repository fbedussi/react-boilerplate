import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog } from '../../styleguide'
import dialogActions from './actions'
import { selectDialogType } from './selectors'

const DialogBox = () => {
	const dialogType = useSelector(selectDialogType);
	const dispatch = useDispatch();
	return (
		<Dialog
			open={dialogType !== 'none'}
			onClose={() => dispatch(dialogActions.closeDialog())}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		></Dialog>
	);
};

export default DialogBox;
