describe('My First Test', () => {
  it('should visit login page', () => {
    cy.visit('/')
    cy.get('.main-div').find('mat-card-content')
  })
})
