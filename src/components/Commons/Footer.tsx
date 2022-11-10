import React, { Fragment } from 'react';
import styled from 'styled-components';

/* styled */
const FooterWrap = styled.footer`
  display: flex;
  position: relative;
  width: 100%;
  background-color: #fefefe;
  border-top: 1px solid #cccccc;
  z-index: 3;

  p {
    text-align: left;
    margin-left: 0.5rem;
  }
  .copyright {
    text-align: center;
    font-weight: 600;
    font-size: 0.75rem;
  }
`;

const Footer = () => {
  return (
    <Fragment>
      <FooterWrap>
        <p className='copyright'>COPYRIGHT ⓒImGATE ALL RIGHTS RESERVED.</p>
      </FooterWrap>
    </Fragment>
  );
}

export default Footer;