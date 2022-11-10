import React, { Fragment} from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { staffRoleFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { HeaderProps } from '../../types/commons';
import { GoogleLogout } from 'react-google-login';

/* styled */
const HeaderWrap = styled.header`
    display: flex;
    width: 100%;
    min-width: 1200px;
    height: 3.75rem;
    color: #333;
    background-color: #fefefe;
    border-bottom: 1px solid #cccccc;
    justify-content: space-between;
    z-index: 9;

    .header-img {
      display: inline;
      padding-left: 1.25rem;

      img {
        padding-top: 1rem;
      }
    }
`;
const HeaderInfo = styled.div`
  padding-top: 0.875rem;
  padding-right: 1.25rem;

  .dropdown {
    button{
      display: flex;
      padding: 7px 9px;
      align-items: center;
      cursor: pointer;

      .user-info {
        display: flex;
        margin-left: 10px;
        color: #555555;
        line-height: 1.2;
        align-items: center;
    
        p {
          margin: 0;
        }
        span {
          margin-left: 7px;
          font-size: 0.75rem;
          color: #ff9800;
        }
      }
    }
    .dropdown-menu {
      display: none;
      font-size: 0.875rem;
      font-weight: 500;
      text-align: left;
      color: #555555;
      border: 1px solid #cccccc;
      border-radius: 3px;
      background-color: #ffffff;
      box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
      0 2px 4px -2px rgb(0 0 0 / 30%);
      cursor: pointer;
      z-index: 1000;

      &.show {
        display: block;
      }
      .dropdown-item-delete {
        display: block;
        cursor: pointer;
        padding: 8px 25px;
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
  }

  .logout {
    display: inline;
    padding-left: 0.5rem;
    font-size: 13px;
    color: indianred;
    cursor: pointer;

    span {
      font-size: 0.875rem;
    }
  }

  .logout-icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }
`;

const clientId = "727183764673-adrqnjvlosaistplqq6l5r50bq6tj5pc.apps.googleusercontent.com";

const Header = ({
    userName,
    userRole,
    hotelRole,
    setClassName,
    //handleMove,
    handlePasswordUpdateModal,
    handleLogout,
}:HeaderProps) => {

  return (
    <Fragment>
      <HeaderWrap>
        <div className='header-img'>
          <img src='../../assets/images/main_logo.png' alt='main_logo'></img>
        </div>
        <HeaderInfo>
          <Dropdown onClick={e => e.stopPropagation()}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FontAwesomeIcon icon={faUser}/>
              <div className='user-info'>
                <p>{userName === 'Oauth'? userRole === 'master'? '관리자' : '사용자' : userName}</p>
                <span>{userRole === 'guest'? '읽기 전용' : staffRoleFormatter(hotelRole)}</span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {userName !== 'Oauth' && 
              <div className='pt-8'>
                <div className='dropdown-item-delete' onClick={() => handlePasswordUpdateModal(true)}>
                  <span>비밀번호 변경</span>
                </div>
              </div> 
              }
              {/* <div className='pt-8'>
                <div className='dropdown-item-delete' onClick={() => handleLogout()}>
                  <span>로그아웃</span>
                </div>
              </div> */}
              <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={() => handleLogout()}
                render={(renderProps) => (
                  <div className='dropdown-item-delete' onClick={renderProps.onClick}>
                    <span>로그아웃</span>
                  </div>
                  )}
                /> 
            </Dropdown.Menu>
          </Dropdown>
        </HeaderInfo>
      </HeaderWrap>
    </Fragment>
  );
}

export default Header;