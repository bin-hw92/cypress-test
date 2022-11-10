
describe('hotel test spec', () => {
  
/* (모두 목록에서)
- 빌딩 등록, 수정, 삭제
- 층 등록, 수정, 삭제
- 객실 등록, 수정, 삭제
- 스태프 등록, 수정, 삭제
- 알림 템플릿 등록, 수정, 삭제
순서 : 빌등 등록, 수정 -> 층 등록, 수정, 삭제 -> 객실 등록, 수정, 삭제 -> 스태프 등록, 수정, 삭제
 -> 알림 등록, 수정, 삭제 -> 빌딩 삭제
*/

  it('호텔 생성 시나리오.', () => {
    //로그인 화면
    cy.login(); //login.cy.ts -> 일반 로그인 진행 성공 시나리오를 Commands에 새로 모듈화

    //로그인 후 호텔 생성
    cy.contains('단지 생성')
      .click();

    //팝업 내용 테스트
    cy.contains('일반 생성');
    cy.contains('벌크 생성');
    cy.contains('단지이름');
    cy.contains('타임존');
    cy.contains('주소');
    cy.contains('비고');
    cy.contains('슬림키 사용');
    cy.contains('알림 채널');
    //해당 명칭들이 존재하는지

    cy.get('input[name="name"]')
      .type('cypress 테스트 호텔')
      .get('input[name="address"]')
      .type('주소 테스트')
      .get('input[name="desc"]')
      .type('비고 테스트')
      .get('select[name="pincodeVersion"]')
      .select('V3')
      .get('input[name="commonrommInput"]')
      .type('공용도어 press 테스트')
      .get('div')
      .find('.card-box-input-button')
      .click();
      
    cy.get('#hotel-create-add-btn')
      .click();

    cy.get('.modal-dialog ').should('not.exist');

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
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('빌딩 수정')
      .click(); //수정 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('빌딩 수정'); //빌딩 수정 팝업이 맞는지? - 빌딩 수정 제목명 찾기
    cy.contains('빌딩이름');
    cy.contains('타입');

    cy.get('input[name="name"]')
      .type('수정 완료')
      .get('input[name="commonrommInput"]')
      .type('공용도어 press 테스트 수정용 추가')
      .next()
      .click() //공용도어 새로 등록
      .get('.card-box-text-container')
      .find('.card-box-text')
      .first() //공용도어 목록 중 첫번째 줄 찾기
      .find('.card-box-input-button')
      .first()
      .click() //수정 버튼 클릭 하기
      .parent()
      .find('input') 
      .type('빌딩 공용도어 cypress 테스트 수정') //새로운 수정 내용 입력
      
    cy.get('#building-update-add-btn')
      .click(); //수정 내용 저장

    cy.contains('빌딩 정보 수정이 완료 되었습니다.');
    cy.get('.modal-dialog ').should('not.exist'); //수정 팝업 종료 여부 판단.


    //빌딩 목록 종료 (층 다음에 빌딩 삭제로 다시 적용)

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
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('층 수정')
      .click(); //수정 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('층 수정'); //빌딩 수정 팝업이 맞는지? - 층 수정 제목명 찾기
    cy.contains('층이름');

    cy.get('input[name="name"]')
      .type('수정 완료')
      .get('#floor-update-add-btn')
      .click(); //수정 내용 저장

    cy.contains('층 정보 수정이 완료 되었습니다.');
    cy.get('.modal-dialog ').should('not.exist'); //수정 팝업 종료 여부 판단.

    cy.contains('cypress 층 등록 테스트수정 완료')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('층 삭제')
      .click(); //삭제 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //층 삭제 팝업이 맞는지? - 삭제 하시겠습니까? 메세지 찾기
      .get('#floor-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('층 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

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
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('객실 수정')
      .click(); //수정 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('객실 수정'); //객실 수정 팝업이 맞는지? - 객실 수정 제목명 찾기
    cy.contains('객실이름');
    cy.contains('층');

    cy.get('input[name="name"]')
      .type('수정 완료')
      .get('#room-update-add-btn')
      .click(); //객실 수정
      
    cy.contains('객실 정보 수정이 완료 되었습니다.');
    cy.get('.modal-dialog ').should('not.exist'); //수정 팝업 종료 여부 판단.

    cy.contains('cypress 객실 등록 테스트수정 완료')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('객실 삭제')
      .click(); //삭제 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //객실 삭제 팝업이 맞는지? - 삭제 하시겠습니까? 메세지 찾기
      .get('#room-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('객실 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //객실 종료

    //스태프 시작

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
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('스태프 수정')
      .click(); //수정 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('스태프 수정'); //스태프 수정 팝업이 맞는지? - 스태프 수정 제목명 찾기
    cy.contains('스태프이름');
    cy.contains('권한');

    cy.get('input[name="name"]')
      .type('수정 완료')
      .get('#staff-update-add-btn')
      .click(); //객실 수정
      
    cy.contains('스태프 정보 수정이 완료 되었습니다.');
    cy.get('.modal-dialog ').should('not.exist'); //수정 팝업 종료 여부 판단.

    cy.contains('cypress 스태프 등록 테스트수정 완료')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('스태프 삭제')
      .click(); //삭제 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //스태프 삭제 팝업이 맞는지? - 삭제 하시겠습니까? 메세지 찾기
      .get('#staff-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('스태프 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //스태프 종료


    //알림템플릿 시작

    cy.contains('알림 템플릿')
      .click();//알림 템플릿 이동

    cy.contains('알림 템플릿')
      .should('have.class', 'item-on'); //알림 템플릿 이동여부 확인

    cy.contains('단지 템플릿 생성')
      .first()
      .click(); //스태프 생성 팝업 클릭

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('단지');
    cy.contains('템플릿타입');
    cy.contains('템플릿ID');

    cy.get('select[name="notifyContext"]')
      .select('nc_pincode_ko') //option value값이 nc_pincode_ko 선택
      .get('select[name="notifyTemplateId"]')
      .select('1') //option value값이 1 선택
      .get('#hotelNotify-create-add-btn')
      .click(); //알림 템플릿 등록
      
    cy.contains('단지 알림 템플릿 생성이 완료 되었습니다.') //등록 완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된 건지

    cy.contains('단지이름')
      .parents('table')
      .contains('cypress 테스트 호텔')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('단지 템플릿 삭제')
      .click(); //삭제 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //알림 템플릿 삭제 팝업이 맞는지? - 삭제 하시겠습니까? 메세지 찾기
      .get('#hotelNotify-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('단지 알림 템플릿 삭제가 완료 되었습니다.') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //알림템플릿 종료

    //빌딩 삭제 팝업 열기
    cy.contains('빌딩 목록')
      .click();//빌딩 목록 이동

    cy.contains('빌딩 목록')
      .should('have.class', 'item-on'); //빌딩 목록 이동여부 확인

    cy.contains('cypress 빌딩 등록 테스트수정 완료')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('빌딩 삭제')
      .click(); //삭제 팝업 클릭
     
    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('삭제 하시겠습니까?') //빌딩 삭제 팝업이 맞는지? - 삭제 하시겠습니까? 메세지 찾기
      .get('#building-delete-wrap')
      .find('.modal-btn-confirm')
      .click(); //삭제 클릭

    cy.contains('빌딩 삭제가 완료 되었습니다') //삭제완료
      .get('.modal-dialog ').should('not.exist'); //팝업 종료된건지

    //빌딩 삭제 완료

    //시나리오 종료
  })
  
})