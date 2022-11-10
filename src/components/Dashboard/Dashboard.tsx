import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Doughnut } from "react-chartjs-2";
import styled from 'styled-components';
ChartJS.register(...registerables);

/* Styled */
const ChartWrap = styled.article`
    margin: 1.25rem auto;
    padding-bottom: 1.25rem;
    box-sizing: border-box;
`;
const ChartTitle = styled.div`
    padding: 1.25rem 0;
    width: 100%;

    h1 {
        margin: auto;
        font-size: 1rem;
        font-weight: 600;
    }
`;
const ChartUl = styled.ul`
    display: flex;
    margin: auto;
    padding: 0;
    list-style: none;

    li {
        margin-right: 1.25rem;
        padding: 1rem;
        width: calc(50% - 0.625rem);
        max-width: 350px;
        text-align: center;
        border: 1px solid #cccccc;
        background: #ffffff;
        box-sizing: border-box;
        box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
        0 2px 4px -2px rgb(0 0 0 / 30%);

        h2 {
            margin: 0 auto;
            margin-bottom: 1.25rem; 
            font-size: 1.25rem;
            font-weight: 600;
        }
    }

`;
const ChartContent = styled.div`
    padding: 2rem;
    width: 100%;
    height: 20rem;
    border: 1px solid #cccccc;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
    0 2px 4px -2px rgb(0 0 0 / 30%);
`;

const Dashboard = () => {
    const data = {
        labels: ['일','월','화','수','목','금','토'],
        datasets: [
            {
                borderColor: '#4c9ffe',
                backgroundColor: '##4c9ffe',
                borderWidth: 2,
                data: [11,9,6,8,4,5,6],
            },
        ],
    };
    const data2 = {
        labels: ['마스터','관리 스태프','하우스키핑','스태프 모바일키','도어락 세팅'],
        datasets: [
            {
                borderColor: '#4c9ffe',
                backgroundColor: '#4c9ffe',
                borderWidth: 2,
                data: [11,9,6,8,4],
            },
        ],
    };

    const data3 = {
        labels: ['설치','미설치'],
        datasets: [
          {
            data: [321, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: false
            }
        }
    }
        
    const options2 = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
              borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
              display: false
            },
        },
        maintainAspectRatio: false,
    }
            
    const options3 = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <ChartWrap>
            <ChartTitle>
                <h1>알림판</h1>
            </ChartTitle>
            <ChartUl>
                <li>
                    <h2>스태프 수</h2>
                    <div>
                        <Bar data={data2} options={options2} />
                    </div>
                </li>
                <li>
                    <h2>도어락 설치</h2>
                    <div>
                        <Doughnut data={data3} options={options3}/>
                    </div>
                </li>
            </ChartUl>
            <ChartTitle>
                <h1>예약 건수</h1>
            </ChartTitle>
            <ChartContent>
                <Bar data={data} options={options} />
            </ChartContent>
        </ChartWrap>
    );
};

export default Dashboard;