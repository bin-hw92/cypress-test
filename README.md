

### container
- 이벤트 핸들링 관련 명칭은 handle무슨이벤트명 으로 지정한다.
- 상태변경 및 리듀서 통신등은 콘테이너에서만 진행한다.
- 컴포넌트에는 필요한 값만 넘겨준다.

### component
- 컴포넌트 안에 동일 레벨 컴포넌트를 import 하지 않는다.
- 각 컴포넌트에는 이벤트 핸들링은 넣지 않는다.
- 각 컴포넌트 안에서 제일 큰 div는 styled-component를 이용해서 section, article 등 마크업에 따른다.

### redux
- saga
    - stores > index.ts에 reducer와 미들웨어인 rootSaga에 추가 필요
    - 동일명칭이 있을 수 있기 때문에 경로는 해당 리덕스 위치 추가 예) 'hotelList/HOTEL_LIST' 형식
- loading
    - stores > lib > createRequestSaga > yield put을 이용
    - container -> useSelector 훅스 사용 시 -> 통신에 대한 loading은 loading: loading['hotelList/HOTEL_LIST'] 형식으로 서치
- 규칙
    - 디스패치에 들어갈 액션은 각 명칭 뒤에 action을 붙인다. 예) setHeaderItem -> setHeaderItemAction
    - initialState 값은 생성 전에 interface 해당리덕스명State 로 기본 변수 타입 지정을 한다.
    - 리듀서를 대신해서 handleActions 함수를 이용한다. -> 이때 해당 함수명은 리덕스명으로 지정한다.

### Type 규칙 강화
- initial 초기 값에 대한 State는 OOOState로 정의
- 부모로부터 상속일 경우 OOOProps로 정의
- 서버로부터 받는 Pram은 OOOApi로 정의
- type 폴더에 각각 메뉴별로 정리해두기 (단 서버에서 받은 데이터 Param은 api 폴더 통신 부분 하단에 정의)
  - type 순서는 상단) - State -> Props 순서로 정의) -> Container -> Component

### Test Case 추가 (Cypress 사용)
- 테스트 케이스로 Cypress를 이용한 E2E Test Case 작성
- 테스트 시나리오는 it()으로 구분이 가능하며, 현재 무료 버전은 it()을 500까지 사용 가능
- Cypress 프로젝트 사용자를 3명까지 지정가능 함.
- 시나리오 작성 및 관리는 Jquery 형식을 이용해서 html 요소를 컨트롤 한다.
- Cypress 사이트에 CI 기록을 위한 명령어는 npx cypress run --record --key cb82b38f-9e71-4233-9372-a2edd1fa7eee 사용
- 로컬에서 자체적으로 실행을 위해서는 yarn e2e-open 아니면 yarn e2e