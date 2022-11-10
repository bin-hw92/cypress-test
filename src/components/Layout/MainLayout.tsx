import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import HeaderContainer from '../../containers/Commons/HeaderContainer';
import LeftMenuContainer from '../../containers/Commons/LeftMenuContainer';
import { RootState } from '../../stores';
import { mainLayOutProps } from '../../types/commons';
import Footer from '../Commons/Footer';

/* styled */
const ContentWrap = styled.section`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  min-width: 1200px;
  min-height: calc(100vh - 6.25rem);
  background: #ffffff;
  align-items: stretch;

  @media (max-height: 530px) {
    min-height: 530px;
  }
`;

const Content = styled.article`
  flex: 1 1 auto;
  width: calc(100% - 240px);
  padding: 0 1.875rem;
  position: relative;
  border-left: 1px solid #cccccc;
  background: #edf3f4;

  .close {
    padding-left: 0px;
  }
`;

const MainLayout = ({
  refresh,
  ContentBody,
}:mainLayOutProps) => {
  const { isOpen } = useSelector(({ sidebar }:RootState) => ({ isOpen: sidebar.isOpen }));

  return (
    <Fragment>
      <HeaderContainer />
      <ContentWrap>
        <LeftMenuContainer />
        <Content className={`content ${isOpen ? '':'close'}`}>
          {ContentBody}
        </Content>
      </ContentWrap>
      <Footer />
    </Fragment>
  );
};

export default MainLayout;