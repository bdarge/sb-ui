describe('User Login', () => {
  it('should visit login page', () => {
    cy.visit('/')
    cy.getBySel("login-username").should("exist");
    cy.getBySel("login-password").should("exist");
    cy.getBySel("login-submit").should("exist");
    cy.getBySel("register").should("exist");
  })
})
