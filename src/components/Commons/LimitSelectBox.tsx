import React from 'react';
import styled from 'styled-components';
import { LimitButtonProps } from '../../types/commons';

/* styled */
const PageLimit = styled.div`
  display: flex;
  padding-top: 1.25rem;

  select {
    cursor: pointer;
    height: 2.3rem;
    width: 4.5rem;
    padding: 0.5rem 0.875rem;
    border: 1px solid #cccccc;
    border-radius: .35rem;
    color: #333333;
    font-size: 0.75rem;
    font-weight: bold;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.20), 0 2px 4px -2px rgba(0, 0, 0, 0.30);

    :focus-visible {
      outline: 1.5px solid #044dac;
    }
  }
`;

const LimitButton = ({
  currentLimit,
  changeLimit,
}:LimitButtonProps) => {
  return (
    <PageLimit>
      <select
        value={currentLimit}
        onChange={e => changeLimit(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </PageLimit>
  );
};

export default LimitButton;