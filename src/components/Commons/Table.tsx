import React from 'react';
import _ from 'lodash';
import { Table, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisH, faLongArrowAltUp ,faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { CustomTableProps } from '../../types/commons';

/* styled */
const TableWrap = styled(Table)`
  width: 100%;
  color: #333333;
  background-color: #ffffff;
  border-spacing: unset;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%),
   0 2px 4px -2px rgb(0 0 0 / 30%);
  border-radius: 0.35rem;

thead {
  display: table-header-group;
  border-color: inherit;
  font-weight: bold;
  font-size: 0.875rem;
}
tbody {
  display: table-row-group;
  border-color: inherit;
  font-size: 0.875rem;
  color: #333333;

  tr:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
  tr:first-child td {
    border-top: unset;
  }
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
  text-align: left;
}
td {
  padding: 1rem 0.5rem;
  border-top: 1px solid #dddddd;
  font-weight: 400;

  &.no-list-data {
    text-align: center;
  }
  
  &.action-button {
    span {
      cursor: pointer;
      border-radius: 1rem;

      :hover {
        color: #4c9ffe;
      }
    }
  }
  &.action-button.list {
    span {
      padding: 6px 11px;

      :hover {
        color: #e6e5e8;
      }
    }
  }
  
  .status-granting {
    color: #ff9800;
    background-color: rgba(255, 152, 0, 0.08);
    border-radius: .35rem;
    padding: 4px 8px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .status-installed,
  .status-granted {
    color: #4caf50;
    background-color: rgba(76, 175, 80, 0.08);
    border-radius: .35rem;
    padding: 4px 8px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .status-created,
  .status-cleaning {
    color: #f44336;
    background-color: rgba(244, 67, 54, 0.08);
    border-radius: .35rem;
    padding: 4px 8px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  :first-child {
    padding: 1.125rem;
  }
  .no-list-data {
    text-align: center;
  }
  .overlay-key {
    display: block;
    cursor: default;
    border-radius: .35rem;
    color: #333333;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .overlay-item {
    position: absolute;
    left: 0;
    right: auto;
    z-index: 1;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    border-radius: .35rem;
    transition: .5s ease;
    opacity:0;
    color: white;
    font-size: 0.875rem;
    padding: 5px 10px;
    text-align: center;
  }
  .wrap-overlay:hover .overlay-item {
    opacity: 1;
  }
  .dropdown {
    button {
      padding: 0 4px;
      border-radius: 1rem;
      cursor: pointer;
      
      svg {
        position: relative;
        top: 2px;
      }
      :hover {
        background-color: #e3e8f0;
      }
    }
    .dropdown-menu {
      display: none;
      cursor: pointer;
      color: #555555;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      border: 1px solid #cccccc;
      background-color: #ffffff;
      text-align: left;
      box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
      0 2px 4px -2px rgb(0 0 0 / 30%);
      z-index: 1000;
        
      .dropdown-item-list {
        display: block;
        cursor: pointer;
        padding: 8px 20px;
        text-align: left;

        :hover {
          background: #F7F9FB;
        }
        &.disabled {
          color: #999999;
          background: #eeeeee;
          cursor: default;
        }
      }
    }
    
    &.show {
      .dropdown-menu {
        display: block;
      }
    }
  }
}
`
const TableTH = styled.th`
  padding: 1rem .5rem;
  background: #3a4254;
  border-bottom: 1px solid #3a4254;
  top: 60px;
  word-break: keep-all;
  cursor: default;
  color: #ffffff;
  font-weight: 600;

  :first-child {
    border-top-left-radius: .35rem;
    padding: 1.125rem;
  }
  :last-child {
    border-top-right-radius: .35rem;
    padding: .75rem 2rem;
  }
  
  .c-blue { color: #4c9ffe !important; }
  .d-none { display: none; }
  span {
    svg {
      color: #ffffff;
    }
    :hover {
      svg {
        display: initial;
      }
    }
  }
  width: ${(props) => props.theme};
`;

const CustomTable = ({
  columns,
  datas,
  userRole,
}:CustomTableProps) => {
  const dataParser = (column:any, data:any, index:number) => {
    switch(column.key) {
      case 'view':
        return (
          <td key={index} className='action-button'>
            <span onClick={() => column.moveToPage.func(...column.moveToPage.params.map((param:any) => _.get(data, param)))}>
            {/* <span onClick={() => column.moveToPage.func(data[column.moveToPage.params])}> */}
              <FontAwesomeIcon icon={faSearch}/>
            </span>
          </td>
        )
      case 'button':
        return (
          <td key={index}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FontAwesomeIcon icon={faEllipsisH}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {column.items.map((item:any, index:number) => (
                  <div
                    key={index}
                    className={`dropdown-item-list ${userRole === 'master' || item.pass === 'Y'? item.disabled ?
                      item.disabled.func(...item.disabled.params.map((param:any) => _.get(data, param))) ? 'disabled'
                      : ''
                    : '' : 'disabled'}`}
                    onClick={() => userRole === 'master' || item.pass === 'Y'? item.action.func(...item.action.params.map((param:any) => _.get(data, param))) : ''}
                  >
                    <span>{item.text}</span>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </td>
        )
      case 'status':
        return (
          <td key={index}>
            <span className={`status-${data.status}`}>
              {column.formatter ? column.formatter.func(...column.formatter.params.map((param:any) => _.get(data, param)))
              : data.status}
            </span>
          </td>
        )
      case 'rooms':
        return (
          <td key={index}>
            <div className='wrap-overlay w-70'>
              <span className='overlay-key'>{column.formatter.func(...column.formatter.params.map((param:any) => _.get(data, param)))}</span>
              <span className='overlay-item'>{column.formatter.func(...column.formatter.params.map((param:any) => _.get(data, param)))}</span>
            </div>
          </td>
        )
      case 'log_message':
        return (
          <td key={index}>
            <div className='wrap-overlay'>
              <span className='overlay-key'>{column.formatter.func(...column.formatter.params.map((param:any) => _.get(data, param)))}</span>
              <span className='overlay-item'>{data.log_message}</span>
            </div>
          </td>
        )
      default:
        return (
          <td key={index}>
            {_.get(data, column.key) || column.formatter ? (
              <span
                className={column.linker ? 'link-detail' : ''}
                onClick={() => column.linker ? column.linker.func(...column.linker.params.map((param:any) => _.get(data, param))) : ''}
              >
                {column.formatter ? column.formatter.func(...column.formatter.params.map((param:any) => _.get(data, param))) : _.get(data, column.key)}
              </span>
            ) : (
              _.isNumber(data[column.key]) ? 0 : '-'
            )}
          </td>
        )
    }
  };

  return (
    <TableWrap>
      <thead>
        <tr>
          {columns.map((column:any, index:number) => 
            <TableTH key={index} theme={column.width}>
              {column.sort ? (
                <span className='c-pointer' onClick={() => column.sort.func(column.sort.params)}>
                  {column.text}
                  <FontAwesomeIcon
                    className={`ml-5 ${column.sort.selected ? 'c-blue':'d-none'}`}
                    icon={column.sort.order === 'desc' ? faLongArrowAltDown : faLongArrowAltUp}
                  />
                </span>
              ) : (
                <span>{column.text}</span>
              )}
            </TableTH>
          )}
        </tr>
      </thead>
      <tbody>
        {datas.length > 0 ? datas.map((item:any, index:number) => (
          <tr key={index}>
            {columns.map((column:any, index:number) => dataParser(column, item, index))}
          </tr>
        )) : (
          <tr>
            <td className='no-list-data' colSpan={columns.length}>
              {'No data'}
            </td>
          </tr>
        )}
      </tbody>
    </TableWrap>
  );
};

export default CustomTable;