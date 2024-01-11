describe('User Login', () => {
  beforeEach(function () {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://127.0.0.1:8080/v1/auth/login',
      },
      [] // and force the response to be: []
    ).as('login')
  });
  it('should visit login page', () => {
    cy.visit('/')
    cy.get('.main-div').find('mat-card-content')
  })

  it('should login user', () => {
    const userInfo = {
      username: "mike@gmail.com",
      password: "P@ssword"
    }

    cy.getBySel("signup-username", "d").type(userInfo.username);
    cy.getBySel("signup-password").type(userInfo.password);
    cy.getBySel("signup-confirmPassword").type(userInfo.password);

    cy.visit('/')
    // Login User
    // cy.login(userInfo.username, userInfo.password);
  })
})
