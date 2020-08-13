import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Clear } from '@material-ui/icons'

import { IconButton, Snackbar } from '../../styleguide'
import notificationsActions from './actions'
import { selectNotifications } from './selectors'

const NotificationArea = () => {
	const notifications = useSelector(selectNotifications);
	const dispatch = useDispatch();
	return (
		<>
			{notifications.map(({ message, _id }) => (
				<Snackbar
					key={_id}
					open={true}
					message={message}
					action={
						<React.Fragment>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={() =>
									dispatch(notificationsActions.removeNotification(_id))
								}
							>
								<Clear />
							</IconButton>
						</React.Fragment>
					}
				/>
			))}
		</>
	);
};

export default NotificationArea;
