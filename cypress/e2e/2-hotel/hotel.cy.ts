
describe('hotel test spec', () => {
  //벌크 제외 그냥 등록만
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
    //호텔 등록 끝

    //호텔 수정 시작
    cy.contains('cypress 테스트 호텔')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
      .should('have.class', 'show')
      .contains('단지 수정')
      .click();

    cy.get('.modal-dialog ').should('exist') //팝업 오픈 완료
      .contains('단지 수정'); //단지 수정 팝업이 맞는지? - 단지 수정 제목명 찾기
    cy.contains('단지이름');
    cy.contains('타임존');
    cy.contains('주소');
    cy.contains('비고');
    cy.contains('슬림키 사용');
    cy.contains('알림 채널');

    cy.get('input[name="name"]')
      .type('cypress 테스트 호텔 수정 완료')
      .get('input[name="address"]')
      .type('주소 테스트 수정 완료')
      .get('input[name="desc"]')
      .type('비고 테스트 수정 완료')
      .get('select[name="pincodeVersion"]')
      .select('V2')
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
      .type('공용도어 press 테스트 수정') //새로운 수정 내용 입력
      
    cy.get('#hotel-update-add-btn')
      .click(); //수정 내용 저장

    cy.contains('단지 정보 변경에 성공 하였습니다.');
    cy.get('.modal-dialog ').should('not.exist'); //수정 팝업 종료 여부 판단.

    //호텔 삭제용
    cy.contains('cypress 테스트 호텔')
      .parents('tr')
      .find('.dropdown')
      .find('button')
      .click() //더보기 클릭
      .parent()
      .find('.dropdown-menu')
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
  })
  
})