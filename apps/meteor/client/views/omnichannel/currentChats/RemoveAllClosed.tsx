import { Box, Icon, Menu } from '@rocket.chat/fuselage';
import { usePermission, useTranslation, useRoute } from '@rocket.chat/ui-contexts';
import type { FC } from 'react';
import React from 'react';

const RemoveAllClosed: FC<{
	handleClearFilters: any;
	handleRemoveClosed: any;
	hasCustomFields: boolean;
}> = ({ handleClearFilters, handleRemoveClosed, hasCustomFields, ...props }) => {
	const t = useTranslation();
	const directoryRoute = useRoute('omnichannel-current-chats');
	const canRemove = usePermission('remove-closed-livechat-rooms');
	const canViewCustomFields = usePermission('view-livechat-room-customfields');

	const menuOptions = {
		clearFilters: {
			label: (
				<Box data-qa='current-chats-options-clearFilters'>
					<Icon name='refresh' size='x16' marginInlineEnd='x4' />
					{t('Clear_filters')}
				</Box>
			),
			action: handleClearFilters,
		},
		...(canRemove && {
			removeClosed: {
				label: (
					<Box color='on-danger' data-qa='current-chats-options-removeAllClosed'>
						<Icon name='trash' size='x16' marginInlineEnd='x4' />
						{t('Delete_all_closed_chats')}
					</Box>
				),
				action: handleRemoveClosed,
			},
		}),
		...(canViewCustomFields &&
			hasCustomFields && {
				customFields: {
					label: (
						<Box data-qa='current-chats-options-customFields'>
							<Icon name='magnifier' size='x16' marginInlineEnd='x4' />
							{t('Custom_Fields')}
						</Box>
					),
					action: (): void => directoryRoute.push({ context: 'custom-fields' }),
				},
			}),
	};
	return (
		<Menu alignSelf='flex-end' small={false} options={menuOptions} placement='bottom-start' data-qa='current-chats-options' {...props} />
	);
};

export default RemoveAllClosed;
