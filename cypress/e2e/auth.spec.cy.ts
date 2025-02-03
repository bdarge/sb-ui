import * as jose from 'jose'
describe('User Login', () => {
  beforeEach(function () {
    const token = new jose.SignJWT({
      userId: 'superuser',
      accountId: 'test_id',
      email: 'mike@gmail.com',
      roles: ['admin'],
      businessId: 'bus_test_id'
    }).setProtectedHeader({alg: 'HS256'}).sign(new TextEncoder().encode('some_key'));

    cy.wrap(token).then((result) =>
      cy.intercept(
        {
          method: 'POST',
          url: 'http://127.0.0.1:8080/v1/auth/login',
        },
        {
          token: result
        }
      ).as('login').then(() =>
        cy.intercept(
          {
            method: 'GET',
            url: 'http://127.0.0.1:8080/v1/transaction?RequestType=&Page=0&Limit=5&SortDirection=desc&SortProperty=id&Search=',
          },
          {
            status: 200,
            total: 0,
            page: 0,
            data: []
          }
        ).as('transaction')
      )
    )
  })

  it('should visit login page', () => {
    cy.visit('/')
    cy.getBySel('login-username').should('exist');
    cy.getBySel('login-password').should('exist');
    cy.getBySel('login-submit').should('exist');
    cy.getBySel('register').should('exist');
  })

  it('should login user', () => {
    const userInfo = {
      username: 'mike@gmail.com',
      password: 'P@ssword'
    }
    cy.visit('/')
    cy.getBySel('login-username').type(userInfo.username);
    cy.getBySel('login-password').type(userInfo.password);
    // Login User
    cy.getBySel('login-submit').click();

    cy.getBySel('add-btn').should('exist');
    cy.getBySel('search-input').should('exist');
    cy.getBySel('tran-table').should('exist');
    cy.getBySel('header').should('exist');
  })
})
