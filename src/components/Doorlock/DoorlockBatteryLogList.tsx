import React from 'react';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Filter from '../Commons/Filter';
import styled from 'styled-components';
import { DoorlockBatteryLogListProps } from '../../types/doorlock';


/* styled */
const FormCardDetail = styled.div`
padding: 0 20px 30px 20px;
width: calc(100%; - 40px);
border: 1px solid #cccccc;
border-radius: 0.3rem;
border-top-left-radius: 0;
background: #ffffff;
box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);
`;
const FormChart = styled.div`
  border: 1px solid #cccccc;
`;
const FormCardTitle = styled.div`
display: inline-flex;
position: relative;
padding: 1.25rem 0 0.675rem 0;
width: 100%;
height: 2rem;
text-align: left;
justify-content: space-between;

  .btn-item-close {
    padding: 3px 14px;
    border-radius: 1rem;
    cursor: pointer;
    
    :hover {
      background-color: #ffffff;
    }
  }

  .filter-item-wrap {
    input {
      background-color: #ffffff;
      border: 1px solid #cccccc;
    }
  }
`;

const DoorlockBatteryLogList = ({
  doorlockBatteryListItems,
  filterItem,
  handleGoBack,
  handleFilter,
  handleinitFilter,
}:DoorlockBatteryLogListProps) => {
  
  return (
    <FormCardDetail>
      <div className='content-chart-detail'>
        <FormCardTitle>
          <div className='form-item-cancel'>
            <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>도어락 목록으로</span>
            </button>
          </div>
          <Filter
            columns={[
              {
                key: 'startAt',
                type: 'datePicker',
                placeholder: '시작일자',
                value: filterItem.startAt? moment(filterItem.startAt).startOf('day').toDate() : moment().subtract(1, 'year').startOf('day').toDate(),
                action: handleFilter,
                selectsStart: true,
                minDate: moment().subtract(1, 'year').startOf('day').toDate(),
                endDate: filterItem.endAt? moment(filterItem.endAt).startOf('day').toDate() : moment().endOf('day').toDate(),
              },
              {
                key: 'endAt',
                type: 'datePicker',
                placeholder: '종료일자',
                value: filterItem.endAt? moment(filterItem.endAt).startOf('day').toDate() : moment().endOf('day').toDate(),
                action: handleFilter,
                selectsEnd: true,
                minDate: filterItem.startAt? moment(filterItem.startAt).startOf('day').toDate() : moment().subtract(1, 'year').startOf('day').toDate(),
                startDate: filterItem.startAt? moment(filterItem.startAt).startOf('day').toDate() : moment().subtract(1, 'year').startOf('day').toDate(),
                disabled: !filterItem.startAt,
              },
            ]}
            init={handleinitFilter}
            customClassName={'detail-page'}
          />
        </FormCardTitle>
        <FormChart>
          <HighchartsReact
            highcharts={Highcharts}
            options={
              {
                chart: {
                  backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                      [0, '#ffffff'],
                      [1, '#ffffff'],
                    ],
                  },
                  style: {
                    fontFamily: '\'Unica One\', sans-serif'
                  },
                },
                title: {
                  text: '배터리 차트',
                  style: {
                    color: '#000000',
                    textTransform: 'uppercase',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  },
                },
                credits: {
                  enabled: false,
                },
                xAxis: {
                  categories: doorlockBatteryListItems? doorlockBatteryListItems.map((batteryLog) => moment(batteryLog.created_at).format('YYYY-MM-DD HH:mm:ss')) : '',
                  gridLineColor: '#707073',
                  labels: {
                    style: {
                      color: '#333333',
                    },
                  },
                  lineColor: '#707073',
                  minorGridLineColor: '#505053',
                  tickColor: '#707073',
                  title: {
                    style: {
                      color: '#A0A0A3',
                    },
                  },
                },
                yAxis: {
                  min: 0,
                  max: 100,
                  gridLineColor: '#707073',
                  labels: {
                    style: {
                      color: '#333333',
                    },
                  },
                  lineColor: '#707073',
                  minorGridLineColor: '#505053',
                  tickColor: '#707073',
                  title: {
                    text: '',
                    style: {
                      color: '#A0A0A3',
                    },
                  },
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  style: {
                    color: '#F0F0F0',
                  },
                },
                legend: {
                  itemStyle: {
                    color: '#E0E0E3'
                  },
                  itemHoverStyle: {
                    color: '#FFF'
                  },
                  itemHiddenStyle: {
                    color: '#606063'
                  },
                  title: {
                    style: {
                      color: '#C0C0C0'
                    }
                  }
                },
                series: [{ name: '배터리', data: doorlockBatteryListItems? doorlockBatteryListItems.map((batteryLog) => batteryLog.fw_battery) : '', color: '#044dac' }]
              }
            }
          />
        </FormChart>
      </div>
    </FormCardDetail>
  );
};

export default DoorlockBatteryLogList;