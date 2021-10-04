import * as React from 'react';

import useClock from '../../hooks/Clock/use-clock';
import Clock from '../../components/Clock/Clock';

const ClockContainer: React.FC = () => <Clock datetime={useClock()} />;

export default ClockContainer;
