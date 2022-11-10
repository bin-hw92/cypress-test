
describe('hotel test spec', () => {
  
/* 시나리오 순서
- 로그인
- 빌딩 목록 -> 등록 -> 상세화면 이동 -> 삭제
- 층 목록 -> 등록 -> 상세화면 이동 -> 삭제
- 객실 목록 -> 등록 -> 상세화면 이동 -> 키택 목록 -> 등록 -> 수정 -> 키택 삭제, 
- 도어락 목록 -> 상세화면 이동 -> 배터리 -> 로그 화면 확인
- 스태프 목록 -> 등록 -> 상세화면 이동 -> 스태프 키 목록 -> 등록 -> 수정 -> 스태프 키 삭제 -> 상세화면 이동 -> 스태프 삭제 (여기까지 완료)
- 리포트 목록
- 객실 상세화면 이동 -> 삭제
- 단지 정보 호텔 전체 삭제 진행
*/

  it('호텔 생성 시나리오.', () => {
    //로그인 화면
    cy.login(); //login.cy.ts -> 일반 로그인 진행 성공 시나리오를 Commands에 새로 모듈화

    //호텔 Detail 입장 시작
    cy.contains('cypress 테스트 호텔')
      .parents('tr')
      .find('.action-button')
      .find('svg')
      .click();

    cy.contains('단지 정보')
      .should('have.class', 'item-on');
    
    cy.get('select[name="notifyChannelId"]')
      .select('2')
      .get('.btn-item-add')
      .click();

    cy.contains('단지 정보 수정이 완료 되었습니다.') //수정완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //호텔 상세화면 끝

    //빌딩 메뉴 시작
    //빌딩 목록 이동 및 등록
    cy.contains('빌딩 목록')
      .click(); //빌딩 이동

    cy.contains('빌딩 목록')
      .should('have.class', 'item-on'); //빌딩 이동여부 확인

    cy.contains('빌딩 생성')
      .click();

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('빌딩이름');
    
    cy.get('input[name="name"]')
      .type('cypress 빌딩 등록 테스트')
      .get('input[name="commonrommInput"]')
      .type('빌딩 공용도어 cypress 테스트')
      .get('div')
      .find('.card-box-input-button')
      .click();

    cy.get('#building-create-add-btn')
      .click(); //빌딩 등록
    
    cy.contains('빌딩 생성이 완료 되었습니다.') //등록 완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    cy.contains('cypress 빌딩 등록 테스트')
      .parents('tr')
      .find('.action-button')
      .find('svg')
      .click();

    cy.contains('빌딩 목록으로')
    cy.get('input[name="name"]')
      .type('{selectall}')
      .type('빌딩 cypress 테스트')
      .get('.btn-item-add')
      .click();

    cy.contains('빌딩 정보 수정이 완료 되었습니다.') //수정완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //빌딩 종료 (층 다음에 빌딩 삭제로 다시 적용)

    //층 시작
    cy.contains('층 목록')
      .click(); //층 이동

    cy.contains('층 목록')
      .should('have.class', 'item-on'); //층 이동여부 확인

    cy.contains('층 생성')
      .first()
      .click(); //층 생성 팝업 클릭

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('층이름');
    
    cy.get('input[name="name"]')
      .type('cypress 층 등록 테스트')
      .get('#floor-create-add-btn')
      .click(); //층 등록
    
    cy.contains('층 생성이 완료 되었습니다.') //등록 완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된 건지

    cy.contains('cypress 층 등록 테스트')
      .parents('tr')
      .find('.action-button')
      .find('svg')
      .click();

    cy.contains('층 목록으로')
    cy.get('input[name="name"]')
      .type('{selectall}')
      .type('층 cypress 테스트')
      .get('.btn-item-add')
      .click();

    cy.contains('층 정보 수정이 완료 되었습니다.') //수정완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //상세화면 삭제 팝업 열기
    cy.get('#floor-detail-wrap')
      .find('.dropdown')
      .find('.dropdown-toggle')
      .click()
      .next()
      .should('have.class', 'show')
      .contains('층 삭제')
      .click();

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //삭제 팝업이 맞는지?
      .get('#floor-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('층 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    cy.contains('층 생성') //목록 화면으로 이동된 건지 확인

    //층 종료

    //객실 시작

    cy.contains('객실 목록')
      .click();//객실 이동

    cy.contains('객실 목록')
      .should('have.class', 'item-on'); //객실 이동여부 확인

    cy.contains('객실 생성')
      .first()
      .click(); //객실 생성 팝업 클릭


    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('객실이름')
    cy.contains('층');

    cy.get('input[name="name"]')
      .type('cypress 객실 등록 테스트')
      .get('select[name="floorId"]')
      .select('multifamily default') //option명이 multifamily default를 선택합니다.
      .get('#room-create-add-btn')
      .click(); //객실 등록
    
    cy.contains('객실 생성이 완료 되었습니다.') //등록 완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된 건지

    cy.contains('cypress 객실 등록 테스트')
      .parents('tr')
      .find('.action-button')
      .find('svg')
      .click(); //객실 상세화면 입장

    cy.contains('객실 목록으로')
    cy.get('input[name="name"]')
      .type('{selectall}')
      .type('객실 cypress 테스트')
      .get('.btn-item-add')
      .click();

    cy.contains('객실 정보 수정이 완료 되었습니다.') //수정완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //키택 목록 이동
    cy.contains('키택 목록')
      .click(); //키택 목록 이동

    cy.contains('키택 목록') //키택 이동 확인
      .should('not.have.class', 'inactive');

    cy.contains('키택 생성')
      .click();//등록 팝업 클릭

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('키택이름')
    cy.contains('딜레이 설정');

    cy.get('input[name="name"]')
      .type('cypress 키택 등록 테스트')
      .get('#keytag-create-add-btn')
      .click();
    
    cy.contains('키택 생성이 완료 되었습니다.') //등록 완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된 건지

    cy.contains('cypress 키택 등록 테스트')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('키택 수정')
      .click(); //수정 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('키택 수정'); //키택 수정 팝업이 맞는지? - 키택 수정 제목명 찾기
    cy.contains('키택이름');
    cy.contains('딜레이 설정');

    cy.get('input[name="name"]')
      .type('수정 완료')
      .get('#keytag-update-add-btn')
      .click(); //객실 수정
      
    cy.contains('키택 수정이 완료 되었습니다.');
    cy.get('.modal-dialog ').should('not.exist'); //수정 팝업 종료 여부 판단.

    cy.contains('cypress 키택 등록 테스트수정 완료')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('키택 삭제')
      .click(); //삭제 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //키택 삭제 팝업이 맞는지? - 삭제 하시겠습니까? 메세지 찾기
      .get('#keytag-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('키택 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //키택 종료

    //도어락 목록 확인

    cy.contains('도어락 목록')
      .click();//도어락 이동

    cy.contains('도어락 목록')
      .should('have.class', 'item-on'); //도어락 이동여부 확인
    
    cy.contains('객실 cypress 테스트')
      .parents('tr')
      .find('.action-button')
      .find('svg')
      .click(); //도어락 상세화면 입장

    cy.contains('빌딩 cypress 테스트'); //에러가 없으면 정상 나타남.

    cy.contains('도어락 배터리 로그')
      .click(); //도어락 배터리 로그 이동

    cy.contains('도어락 배터리 로그') //도어락 배터리 로그 이동 확인
      .should('not.have.class', 'inactive');

    cy.contains('배터리 차트'); //에러가 없으면 정상 나타남.


    cy.contains('도어락 로그')
      .click(); //도어락 로그 이동

    cy.contains('도어락 로그') //도어락 로그 이동 확인
      .should('not.have.class', 'inactive');

    cy.contains('로그ID'); //에러가 없으면 정상 나타남.

    //객실 종료

    // 스태프 시작

    cy.contains('스태프 목록')
      .click();//스태프 이동

    cy.contains('스태프 목록')
      .should('have.class', 'item-on'); //스태프 이동여부 확인

    cy.contains('스태프 생성')
      .first()
      .click(); //스태프 생성 팝업 클릭

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('스태프이름');
    cy.contains('권한');
    cy.contains('전화번호');

    cy.get('input[name="name"]')
      .type('cypress 스태프 등록 테스트')
      .get('select[name="role"]')
      .select('manager') //option value값이 manager를 선택
      .get('input[name="phoneNumber"]')
      .type('01055556666')
      .get('#staff-create-add-btn')
      .click(); //스태프 등록
    
    cy.contains('스태프 생성이 완료 되었습니다.') //등록 완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된 건지

    cy.contains('cypress 스태프 등록 테스트')
      .parents('tr')
      .find('.action-button')
      .find('svg')
      .click();

    cy.contains('스태프 목록으로')
    cy.get('input[name="name"]')
      .type('{selectall}')
      .type('스태프 cypress 테스트')
      .get('.btn-item-add')
      .click();

    cy.contains('스태프 정보 수정이 완료 되었습니다.') //수정완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지


    //스태프 키 관련
    cy.contains('스태프키 목록')
      .click(); //스태프키 목록 이동

    cy.contains('스태프키 목록') //스태프키 이동 확인
      .should('not.have.class', 'inactive');

    cy.contains('키 발급')
      .click(); //키 발급 등록 팝업

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('시작일자');
    cy.contains('종료일자');
    cy.contains('빌딩');
    cy.contains('객실');
    cy.contains('스태프이름');
    cy.contains('전화번호');

    cy.get('input[name="startAt"]')
      .click();
    cy.contains('13:00')
      .click(); //시작 시간을 당일에 13:00로
    cy.get('input[name="endAt"]')
      .click();
    cy.contains('15:00')
      .click(); //종료 시간을 당일에 15:00로
    cy.get('select[name="buildingId"]')
      .select('빌딩 cypress 테스트')
      //.get('select[name="rooms"]')
      //.select('객실 cypress 테스트') 객실에 설치된 도어락이 없어서 빼고, 빌딩만 넣기
      .get('#staffkey-issue-add-btn')
      .click();
    
    cy.contains('키 발급이 완료 되었습니다.') //등록 완료
      .get('#sms-wrap')
      .find('.modal-btn-cancel')
      .click(); //SMS 전송여부는 그냥 취소를 클릭
    cy.get('.modal-dialog').should('not.exist'); //팝업 종료된 건지

    cy.contains('스태프 cypress 테스트')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('스태프키 삭제')
      .click(); //삭제 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('선택하신 스태프키를 삭제 하시겠습니까?') //스태프키 삭제 팝업이 맞는지? - 삭제 하시겠습니까? 메세지 찾기
      .get('#staffkey-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('스태프키 삭제가 완료 되었습니다.') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지
    //스태프키 완료

    //스태프 정보 상세화면 삭제까지
    cy.contains('스태프 정보')
      .click(); //스태프 정보 이동

    cy.contains('스태프 정보') //스태프 정보 이동 확인
      .should('not.have.class', 'inactive');

    cy.get('#staff-detail-wrap')
      .find('.dropdown')
      .find('.dropdown-toggle')
      .click()
      .next()
      .should('have.class', 'show')
      .contains('스태프 삭제')
      .click();

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //삭제 팝업이 맞는지?
      .get('#staff-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('스태프 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    // 스태프 종료

    //리포트 메뉴
    cy.contains('리포트')
      .click();//리포트 이동

    cy.contains('리포트')
      .should('have.class', 'item-on'); //리포트 이동여부 확인

    cy.contains('키타입'); //키발급 리포트에 해당 열이 있는지

    cy.get('.filter-item-wrap')
      .find('select')
      .select('시설정보 리포트');
    
    cy.contains('시설'); //시설정보 리포트에 해당 열이 있는지

    cy.get('.filter-item-wrap')
      .find('select')
      .select('스태프정보 리포트');

    cy.contains('행위자 이름'); //시설정보 리포트에 해당 열이 있는지

    cy.contains('Cancel StaffKey')
      .parents('tr')
      .find('.action-button')
      .find('svg')
      .click();

    cy.contains('리포트 상세정보');
    cy.get('#report-detail-close-btn')
      .click();

    cy.get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    cy.get('.filter-item-wrap')
      .find('select')
      .select('모바일키 사용이력 리포트');

    cy.contains('사용자명'); //시설정보 리포트에 해당 열이 있는지

    //리포트 종료
    
    //객실 상세화면 삭제 팝업 열기
    cy.contains('객실 목록')
      .click();//객실 이동

    cy.contains('객실 목록')
      .should('have.class', 'item-on'); //객실 이동여부 확인

    cy.contains('객실 정보')
      .click(); //객실 정보 탭으로 이동 (키택에서 객실 정보로 이동)

    cy.contains('객실 정보') //객실 정보 탭 이동 확인
      .should('not.have.class', 'inactive');

    cy.get('#room-detail-wrap')
      .find('.dropdown')
      .find('.dropdown-toggle')
      .click()
      .next()
      .should('have.class', 'show')
      .contains('객실 삭제')
      .click();

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //삭제 팝업이 맞는지?
      .get('#room-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('객실 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    cy.contains('객실 생성') //목록 화면으로 이동된 건지 확인
    // 객실 상세화면 삭제

    //상세화면 빌딩 삭제 팝업 열기
    cy.contains('빌딩 목록')
     .click(); //빌딩 이동

    cy.contains('빌딩 목록')
      .should('have.class', 'item-on'); //빌딩 이동여부 확인

    cy.get('#building-detail-wrap')
      .find('.dropdown')
      .find('.dropdown-toggle')
      .click()
      .next()
      .should('have.class', 'show')
      .contains('빌딩 삭제')
      .click();

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //삭제 팝업이 맞는지?
      .get('#building-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('빌딩 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    cy.contains('빌딩 생성'); //목록 화면으로 이동된 건지 확인
    //빌딩 삭제 완료


    //호텔 삭제 시작
    cy.contains('단지 정보')
      .click(); //단지 이동

    cy.contains('단지 정보')
      .should('have.class', 'item-on'); //단지 이동여부 확인

    cy.get('#hotel-detail-wrap')
      .find('.dropdown')
      .find('.dropdown-toggle')
      .click()
      .next()
      .should('have.class', 'show')
      .contains('단지 삭제')
      .click();

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //삭제 팝업이 맞는지?
      .get('#hotel-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭
    
    cy.contains('단지 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    cy.contains('단지 목록')
      .location('pathname')
      .should('equal', '/hotel');
    //시나리오 종료
  })
  
})