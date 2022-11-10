import "cypress-localstorage-commands"

describe('login test spec', () => {
  
  it('일반 로그인 진행 실패 시나리오.', () => {
    cy.visit('/')
      .get('input[name="phoneNumber"]')
      .type('01021113355')
      .get('input[name="password"]')
      .type('12345')
      .get('button[name="loginBtn"]')
      .click();

      cy.contains('로그인 실패');
  });

  it('일반 로그인 진행 성공 시나리오.', () => {
    cy.visit('/')
      .get('input[name="phoneNumber"]')
      .type('01021113355')
      .get('input[name="password"]')
      .type('1234')
      .get('button[name="loginBtn"]')
      .click();

      cy.contains('삭제 테스트')
      .location('pathname')
      .should('equal', '/hotel');
  });

/*   it('구글 로그인을 진행한다.', () => {
    cy.visit('/')
      .get('#googleloginButton')
      .find('button')
      .click({ force: true });

    cy.request({
      method: 'post',
      url: 'https://dev.api.hospitality.imgate.co.kr/v2/multifamily/admin/session',
    })
    .should((response) => {
        cy.log(JSON.stringify(response.body))
    });

    cy.contains('관리자')
      .location('pathname')
      .should('equal', '/hotel');
  }) */
})