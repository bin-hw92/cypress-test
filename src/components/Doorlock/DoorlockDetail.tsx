import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { doorlockStatusFormatter, dateFormatter } from '../../lib/formatter';
import doorlockFormatter from './DoorlockFormatter';
import styled from 'styled-components';
import { DoorlockDetailProps } from '../../types/doorlock';

/* styled */
const FormCardDetail = styled.div`
padding: 0 20px 30px 20px;
width: calc(100%; - 40px);
border: 1px solid #cccccc;
border-radius: 0.3rem;
border-top-left-radius: 0;
background: #ffffff;
box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

  .inline-flex {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;

    .w-50 {
      flex: 1;
      width: 50%;

      .card-text {
        display: flex;
        padding-right: 3.75rem;
        width: 100%;
        align-items: center;
        box-sizing: border-box;

        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 11.25rem;
          color: #555555;
          line-height: 1.8rem;
          border-bottom: 1px solid #e3e8f0;
          background: #e3e8f0;
          box-sizing: inherit;

          .required {
            margin-left: 3px;
            color: #ef4b56;
          }
        }
        .card-text-display {
          margin-left: 20px;
        }
      }
    }
  }
  .card-foot {
    display: inline-flex;
    padding: 1.875rem 0;
    width: 100%;
    height: 2rem;
    justify-content: space-between;

    .btn-item-cancel {
      padding: 0.5rem;
      height: 2.3rem;
      min-width: 5rem;
      font-size: 0.875rem;
      font-weight: bold;
      color: #ffffff;
      border: 0px;
      border-radius: 0.35rem;
      background-color: #dc343f;
      cursor: pointer;
      box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

      :hover {
        background: #ef4b56;
      }
    }
    .btn-item-add {
      padding: 0.5rem;
      height: 2.3rem;
      min-width: 5rem;
      font-size: 0.875rem;
      font-weight: bold;
      color: #ffffff;
      border: 0px;
      border-radius: 0.35rem;
      background-color: #044dac;
      cursor: pointer;
      box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

      :hover {
        background: #4c9ffe;
      }
    }
  }
`;
const FormCardTitle = styled.div`
    display: inline-flex;
    position: relative;
    padding: 1.25rem 0 0.675rem 0;
    width: 100%;
    height: 2rem;
    text-align: left;
    justify-content: space-between;

    button {
      padding: 3px 14px;
      border-radius: 1rem;
      cursor: pointer;
      
      :hover {
        background-color: #ffffff;
      }
    }
    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 7rem;
      padding: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: #555555;
      border: 1px solid #cccccc;
      border-radius: 0.35rem;
      background-color: #ffffff;
      background-clip: padding-box;
      box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
      0 2px 4px -2px rgb(0 0 0 / 30%);
      z-index: 1000;
      
      &.show {
        display: block;
      }
      .dropdown-item-delete {
        display: block;
        cursor: pointer;
        padding: 8px 20px;
        text-align: left;
        
        :hover {
          background: #edf3f4;
        }

        &.disabled {
          color: #999999;
          background: #eeeeee;
          cursor: default;
        }
      }
    }
`;

const DoorlockDetail = ({
  doorlockItem,
  userRole,
  hotelRole,
  handleSelectDoorlockUninstall,
  handleGoBack
}:DoorlockDetailProps) => {

  return (
    <FormCardDetail>
      <FormCardTitle>
        <div className='form-item-cancel'>
          <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>도어락 목록으로</span>
          </button>
        </div>
        <div className='form-dropdown detail'>
          {userRole === 'master' &&
            <Dropdown onClick={e => e.stopPropagation()}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FontAwesomeIcon icon={faEllipsisV}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div
                  className={`dropdown-item-delete center ${doorlockItem.status !== 'installed' || hotelRole === 'manager' ? 'disabled':''}`}
                  onClick={() => handleSelectDoorlockUninstall()}
                >
                  <span>설치 삭제</span>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          }
        </div>
      </FormCardTitle>
      <div>
        <div className='inline-flex'>
          <div className='w-50'>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faLock}/> */}
                <b>도어락이름</b>
              </p>
              <div className='card-text-display'>{doorlockItem.name || '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faSignature}/> */}
                <b>시리얼번호</b>
              </p>
              <div className='card-text-display'>{doorlockItem.serial || '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faDoorOpen}/> */}
                <b>상태</b>
              </p>
              <div className='card-text-display'>{doorlockItem.status? doorlockStatusFormatter(doorlockItem.status) : '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faBuilding}/> */}
                <b>빌딩</b>
              </p>
              <div className='card-text-display'>{doorlockItem.buildingName || '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                <b>층</b>
              </p>
              <div className='card-text-display'>{doorlockItem.floorName || '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faTag}/> */}
                <b>타입</b>
              </p>
              <div className='card-text-display'>{doorlockItem.type? doorlockFormatter.type(doorlockItem.type) : '-'}</div>
            </div>
          </div>
          <div className='w-50 bl-1-dashed-gray'>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faInfoCircle}/> */}
                <b>모델명</b>
              </p>
              <div className='card-text-display'>{doorlockItem.fwType ? doorlockFormatter.fwType(doorlockItem.fwType) : '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faCodeBranch}/> */}
                <b>FW버전</b>
              </p>
              <div className='card-text-display'>{doorlockItem.fwVersion || '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faBatteryThreeQuarters}/> */}
                <b>배터리상태</b>
              </p>
              <div className='card-text-display'>{doorlockItem.fwBattery ? `${doorlockItem.fwBattery}%` : '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faHammer}/> */}
                <b>생성일자</b>
              </p>
              <div className='card-text-display'>{dateFormatter(doorlockItem.createdAt? doorlockItem.createdAt : '') || '-'}</div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faWrench}/> */}
                <b>수정일자</b>
              </p>
              <div className='card-text-display'>{dateFormatter(doorlockItem.updatedAt? doorlockItem.updatedAt : '') || '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </FormCardDetail>
  );
};

export default DoorlockDetail;