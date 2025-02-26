import type { ReactElement } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CardProps } from '../FeatureUsageCard';
import PieGraphCard from '../PieGraphCard';

const MACCard = ({ value = 0, max }: { value: number; max: number }): ReactElement => {
	const { t } = useTranslation();

	const pieGraph = {
		used: value,
		total: max,
	};

	const nearLimit = pieGraph && pieGraph.used / pieGraph.total >= 0.8;

	const card: CardProps = {
		title: t('Monthly_active_contacts'),
		infoText: t('MAC_InfoText'),
		showUpgradeButton: nearLimit,
		upgradeButtonText: 'Buy_more',
	};

	return <PieGraphCard pieGraph={pieGraph} card={card} />;
};

export default MACCard;
