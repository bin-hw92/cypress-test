import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';

/* styled */
const PaginationWrap = styled(Pagination)`
  display: flex;
  width: 100%;
  margin: auto;
  padding: 1.25rem 0 1.875rem 0;
  list-style: none;
  border-radius: .25rem;

  .form-pagination {
    margin: auto;
    display: flex;
  }
`;

const PaginationItem = styled(Pagination.Item)`
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.20),
  0 2px 4px -2px rgba(0, 0, 0, 0.30);
  
  :first-child .page-link {
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
  }
  :last-child .page-link {
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }
  .page-link {
    position: relative;
    display: block;
    padding: .5rem .75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #000000;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    text-decoration: none;
  }
  &.active {
    span {
      background-color: #044dac;
      color: #ffffff;
    }
  }
  .visually-hidden {
    display: none;
  }
  
`
type TablePaginationProps = {
  total: number,
  index: number,
  limit: number,
  indexChange: (item:number) => void,
}

const TablePagination = ({total, index, limit, indexChange}:TablePaginationProps) => {
  let start = 1
  let end = 5
  let last = 5
  last = Math.ceil(total/limit) || 1;
  let indexList:number[] = [];
  if (last <= 5 ){
    start = 1
    end = last
  } else {
    if (index > 3) {
      start = index - 2
      end = index + 2
    }
    if (end > last) {
      start = last - 4
      end = last
    }
  }
  for (let i = start; i <= end; i++) {
    indexList.push(i)
  }
  return (
    <Fragment>
      <PaginationWrap>
        <div className='form-pagination'>
          {index === 1? (<PaginationItem><FontAwesomeIcon icon={faAngleLeft}/></PaginationItem>)
          : (<PaginationItem onClick={() => indexChange(index-1 >= start ? index-1 : start)}><FontAwesomeIcon icon={faAngleLeft}/></PaginationItem>)}
          {indexList.map(item => (
            <PaginationItem
              key={`pagination-key-index${item}`}
              active={index === item}
              onClick={() => indexChange(item)}
            >
            {item}
            </PaginationItem>
          ))}
          <PaginationItem onClick={() => indexChange(index+1 <= last ? index+1 : end)}>
            <FontAwesomeIcon icon={faAngleRight}/>
          </PaginationItem>
        </div>
      </PaginationWrap>
    </Fragment>
  );
}

export default TablePagination;
