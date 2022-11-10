import React, { Fragment } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import { DashboardContainerProps } from '../../types/dashboard';

const DashboardContainer = ({
  isOpen
}:DashboardContainerProps) => {

  return (
    <Fragment>
      <Dashboard />
    </Fragment>
  );
};

export default DashboardContainer;