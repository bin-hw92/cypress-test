import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import styled from 'styled-components';
ChartJS.register(...registerables);

/* Styled */
const ChartWrap = styled.article`
    margin: 1.25rem auto;
    padding-bottom: 1.25rem;
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
        padding: 1.5rem 2rem 0.5rem 2rem;
        width: calc(100% / 4);
        min-width: 200px;
        max-width: 300px;
        text-align: center;
        border: 1px solid #cccccc;
        background: #ffffff;
        box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
        0 2px 4px -2px rgb(0 0 0 / 30%);

        h2 {
            margin: 0 auto;
            margin-bottom: 1.25rem; 
            font-size: 1.25rem;
            font-weight: 600;
        }
        div{
            display: flex;        
            align-items: center;
            justify-content: center;
            p {
                margin-left: 0.25rem;

                :first-child {
                    margin-left: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #044dac;
                }
            }
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

const DashboardMain = () => {

    const data = {
        labels: ['일','월','화','수','목','금','토'],
        datasets: [
            {
                label: '호텔포코',
                borderColor: '#25c465',
                backgroundColor: '#25c465',
                borderWidth: 2,
                data: [9,6,5,2,4,11,20],
            },
            {
                label: '여수유탑',
                borderColor: '#fa5858',
                backgroundColor: '#fa5858',
                borderWidth: 2,
                data: [117,10,50,30,31,62,19],
            },
            {
                label: '제주유탑',
                borderColor: '#044dac',
                backgroundColor: '#044dac',
                borderWidth: 2,
                data: [11,9,6,8,4,5,6],
            },
        ],
    };
    
    const options = {
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
                    <h2>단지 수</h2>
                    <div>
                        <p>80</p>
                    </div>
                </li>
                <li>
                    <h2>도어락 설치</h2>
                    <div>
                        <p>321</p>
                        <p>/ 351</p>
                    </div>
                </li>
                <li>
                    <h2>예약 건수</h2>
                    <div>
                        <p>159</p>
                    </div>
                </li>
                <li>
                    <h2>스태프 수</h2>
                    <div>
                        <p>1005</p>
                    </div>
                </li>
            </ChartUl>
            <ChartTitle>
                <h1>체크인 알림</h1>
            </ChartTitle>
            <ChartContent>
                <Bar data={data} options={options} />
            </ChartContent>
        </ChartWrap>
    );
};

export default DashboardMain;