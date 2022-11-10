import React, { Fragment } from 'react';
import GoogleLogin from 'react-google-login';
import styled from "styled-components";
import logoImage from '../../assets/images/main_logo.png';
import { LoginProps } from '../../types/login';

/* Styled */
const SignWrapper = styled.div`
  position: relative;
  height: 100%;

  .signing {
    max-width: 340px;
    width: 100%;
    margin: 0 auto;
    padding-top: 32vh;

    .logo-wrapper {
      margin-bottom: 20px;
      text-align: center;

      .logo {
        display: inline-block;
        width: 134px;
        height: 31px;
        background: url(${logoImage}) no-repeat 100%;
      }
    }
    .copyright {
      margin-top: 10px;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: #333333;
    }
  }
    
  @media (max-width: 1200px) {  
    .signing {
      padding-top: 22vh !important;
    }
  }

  @media (max-height: 420px) {
    .signing {
      padding-top: 4vh !important;
    }
  }
`;
const SignBox = styled.form`
  padding: 10px 35px;
  border-radius: 15px;
  border: 2px solid #044dac;
  background-color: #ffffff;

  .title {
    margin-bottom: 24px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #555555;
  }


  .input-box {
    padding-top: 25px;
    padding-bottom: 25px;

    .form-select {
      position: relative;
      height: 35px;
      background-color: white;
      margin-bottom: 4px;

      select {
        padding-left: 16px;
        padding-right: 16px;
        z-index: 1;
        font-size: 0.875rem;
        color: #000000;
        line-height: 40px;
        height: 35px;
        width: 265px;
      }
    }

    .form-input {
      position: relative;
      height: 32px;
      background-color: white;
      margin-bottom: 10px;

      input {
        padding-left: 16px;
        padding-right: 16px;
        z-index: 1;
        font-size: 0.875rem;
        color: #000000;
        line-height: 32px;
        height: 32px;
        width: 229px;
      }
    }

    .btn-login button {
      background-color:#044dac;
      height: 46px;
      width: 265px;
      font-size: 0.875rem;
      font-weight: bold;
      color: #e6e5e8;
      border: 0px;
      cursor: pointer;
      
      :disabled {
        background-color: #666666;
        cursor: no-drop;
      }
    }
  }

  
  @media (max-width: 1200px) {  
    padding: 0 30px !important;
    margin: 0 20px !important;


    .form-input input {
      width: 87% !important;
    }
    .form-select select {
      width: 100% !important;
    }
    .btn-login button {
      width: 100% !important;
    }
  }

  @media (max-width: 320px) {
    .form-input input {
      width: 84% !important;
    }
  }
}
`;

const Login = ({
  countryNumber,
  phoneNumber,
  password,
  countryInfoList,
  clientId,
  handleSubmit,
  handleChange,
  handleLoginGoogle,
  handleLoginGoogleError,
}:LoginProps) => {
  const maxLength = 11;

  const validateRequestParams = () => {
    return countryNumber === '' || phoneNumber === '' || password === '';
  };

  const onGoogleSignInSuccess = (res:any) => {
    try {
      handleLoginGoogle(res.tokenId);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <Fragment>
      <SignWrapper>
        <div className='signing'>
          <div className="logo-wrapper">
            <div className="logo"></div>
          </div>
          <SignBox onSubmit={handleSubmit}>
            <div className='input-box'>
              <div className='form-select'>
                <select onChange={e => handleChange(e.target.value, 0)}>
                  {countryInfoList.map((country, index) => (
                    <option key={`country-index-${index}`} value={country.phone}>{`${country.name} ( +${country.phone} )`}</option>
                  ))}
                </select>
              </div>
              <div className='form-input'>
                <input
                  placeholder='전화번호 (숫자만)'
                  maxLength={maxLength}
                  onChange={e => handleChange(e.target.value, 1)}
                  name='phoneNumber'
                />
              </div>
              <div className='form-input'>
                <input
                  type='password'
                  placeholder='비밀번호'
                  onChange={e => handleChange(e.target.value, 2)}
                  name='password'
                />
              </div>
              <div className='btn-login'>
                <button name='loginBtn' disabled={validateRequestParams()}>로그인</button>
              </div>
            </div>
            <div id='googleloginButton' style={{borderTop: '1px solid #cccccc', paddingTop: '1rem', marginTop: '1rem', textAlign: 'center'}}>
              <GoogleLogin
                clientId={clientId}
                onSuccess={(res) => onGoogleSignInSuccess(res)}
                onFailure={(error) => handleLoginGoogleError(error)}
                cookiePolicy={'single_host_origin'}
                theme={'dark'}
              />
            </div>
          </SignBox>
          <p className='copyright'>COPYRIGHT ⓒImGATE ALL RIGHTS RESERVED.</p>
        </div>
      </SignWrapper>
    </Fragment>
  );
}

export default Login;