import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { BreadcrumbProps } from '../../types/commons';

/* styled */
const ContentTtitle2 = styled.div`
  display: flex;
  padding: 0.625rem 1.875rem;
  margin-left: -1.875rem;
  margin-bottom: 0.625rem;
  width: 100%;
  height: 2rem;
  font-weight: bold;
  position: relative;
  background: #ffffff;
`;
const BreadcrumbContainer = styled.h1`
  display: flex;
  margin: 0;
  color: #333333;
  line-height: 2rem;
  cursor: default;
  align-items: center;
  
  a {
    text-decoration: none;
  }
  span{
    :last-child {
      color: #555555;
    }
  }
  .breadcrumb-link {
    padding: 5px;
    border: 1px solid #cccccc;
    cursor: pointer;

    :hover {
      color: #4c9ffe;
    }
  }
`;

const Breadcrumb = ({
  breadcrumbItems,
  handleLink,
}:BreadcrumbProps) => {
  
  return (
      <ContentTtitle2>
        <BreadcrumbContainer>
          {breadcrumbItems.map((item:any, index:number) => (
            <Fragment key={index}>
              {index !== 0 ? (
                <FontAwesomeIcon icon={faAngleRight} className='ml-20 mr-20' />
              ) : ''}
              {item.isLink ? (
                <FontAwesomeIcon icon={faHouse} className='breadcrumb-link'  onClick={() => handleLink(item.path)}/>
                // <button className='breadcrumb-link'>
                //  {item.title || '-'}
                // </button>
              ) : (
                <span>
                  {item.title || '-'}
                </span>
              )}
            </Fragment>
          ))}
        </BreadcrumbContainer>
      </ContentTtitle2>
  );
}

export default Breadcrumb;