import styled from "styled-components";

/* Styled */
const NotFoundWrap = styled.section`
  position: relative;
  width: 100%;
  height: 100%;

  article {
    position: absolute;
    top: calc(50% - 113px);
    left: calc(50% - 244px);

    h1 {  
      margin: 0;
      font-size: 4rem;
      font-weight: 600;
    }
    h2 {  
      margin: 0;
      padding-top: 15px;
      font-size: 2.5rem;
      font-weight: 600;
    }
    p {
      margin: 0;
      padding: 20px 0;
      font-size: 1.25rem;
    }
  }
`;

const NotFound = () => {

    return (
      <NotFoundWrap>
        <article>
          <h1>404 Error</h1>
          <h2>페이지를 찾을 수 없습니다.</h2>
          <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
        </article>
      </NotFoundWrap>
    )
};

export default NotFound;