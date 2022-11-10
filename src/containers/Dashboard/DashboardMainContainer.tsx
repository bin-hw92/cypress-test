import React, { Fragment } from 'react';
import styled from 'styled-components';
import DashboardMain from '../../components/Dashboard/DashboardMain';
import MainLayout from '../../components/Layout/MainLayout';

/* Styled */
const ContentTitle2 = styled.div`
  display: flex;
  padding: 0.625rem 1.875rem;
  margin-left: -1.875rem;
  margin-bottom: 0.625rem;
  width: 100%;
  font-weight: bold;
  position: relative;
  height: 2rem;
  background: #ffffff;

  h1,
  h2 {
    cursor: default;
    margin: 0;
    font-size: 1.125rem;
    line-height: 2rem;
  }
`;

const DashboardMainContainer = () => {

  //MainLayout - refresh
  const changeRefresh = ()=> {};

  return (
    <Fragment>
      <MainLayout
        refresh={changeRefresh}
        ContentBody={(
          <>
            <ContentTitle2>
              <h1>대시보드</h1>
            </ContentTitle2>
            <DashboardMain />
          </>
        )}
      />
    </Fragment>
  );
};

export default DashboardMainContainer;