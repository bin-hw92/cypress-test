import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { HotelListProps } from '../../types/hotel';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;
const ContentTitle = styled.div`
  position: absolute;
  top: -3.1875rem;
  right: 0;
  height: 2rem;
`;
const ContentButtonForm = styled.div`
  float: right;
  margin-top: 1.25rem;

  .center {
    display: block;
    padding-top: 0;

    .detail {
      right: 0;
    }
    .pl20 {
      padding-left: 1.25rem;
    }
  }
`;
const ContentTopButtonForm = styled.div`
  float: right;
  margin: 1.125rem auto;

  .center {
    display: block;
    padding-top: 0;

    .detail {
      right: 0;
    }
    .pl20 {
      padding-left: 1.25rem;
    }
  }
`;
const ContentButton = styled.button`
  height: 2.3rem;
  min-width: 5rem;
  padding: 0.5rem;
  border-radius: .35rem;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #044dac;
  border: 0px;
  cursor: pointer;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
  0 2px 4px -2px rgb(0 0 0 / 30%);

  :hover {
    background-color: #4c9ffe;
  }
  :disabled {
    background-color: #949494;
    cursor: default;
  }
`;

const HotelList = ({
  hotelListItems,
  filterItem,
  userRole,
  handleFilter,
  handleinitFilter,
  handleHotelDetail,
  handleModal,
}:HotelListProps) => {

  return (
    <FormCard>
    <ContentTitle>
        <Filter
          columns={[
            {
              key: 'name',
              size: 'lg',
              placeholder: '단지이름',
              value: filterItem.name,
              action: handleFilter,
            }
          ]}
          init={handleinitFilter}
        />
      </ContentTitle>
      {userRole === 'master'? ( 
        <ContentTopButtonForm>
          <ContentButton onClick={() => handleModal('create','','')}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>단지 생성</span>
          </ContentButton>
        </ContentTopButtonForm>
      ) : (<div style={{paddingTop: '1.25rem'}}></div>)
      }
      <Table
        columns={[
          {
            key: 'view',
            text: '상세보기',
            width: '8%',
            moveToPage: {
              func: (hotelId:string, role:string) => handleHotelDetail(hotelId, role),
              params: ['id', 'role'],
            },
          },
          {
            key: 'name',
            text: '단지이름',
            width: '25%',
          },
          {
            key: 'timezone',
            text: '타임존',
            width: '15%',
          },
          {
            key: 'pincode_version',
            text: '핀코드 버전',
            width: '12%',
          },
          {
            key: 'created_at',
            text: '생성일자',
            width: '20%',
            formatter: {
              func: dateFormatter,
              params: ['created_at'],
            },
          },
          {
            key: 'updated_at',
            text: '변경일자',
            width: '20%',
            formatter: {
              func: dateFormatter,
              params: ['updated_at'],
            },
          },
          {
            key: 'button',
            text: '',
            width: '5%',
            items: [
              {
                text: '단지 수정',
                disabled: {
                  func: (role:string) => role !== 'master',
                  params: ['role'],
                },
                action: {
                  func: (hotelId:string, role:string) => role === 'master'? handleModal('update', hotelId, '') : '',
                  params: ['id', 'role'],
                },
              },
              {
                text: '단지 삭제',
                disabled: {
                  func: (role:string) => role !== 'master',
                  params: ['role'],
                },
                action: {
                  func: (hotelId:string, hotelName:string, role:string) => role === 'master'? handleModal('delete', hotelId, hotelName) : '',
                  params: ['id', 'name', 'role'],
                },
              },
            ],
          },
        ]}
        datas={hotelListItems}
        userRole={userRole}
      />
      {userRole === 'master' &&
      <ContentButtonForm>
        <ContentButton onClick={() => handleModal('create','','')}>
          <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
          <span>단지 생성</span>
        </ContentButton>
      </ContentButtonForm>
      }
    </FormCard>
  );
};

export default HotelList;