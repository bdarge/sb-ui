declare namespace Cypress {
  interface Chainable {
    getBySel(dataTestAttribute: string, args?: any): Cypress.Chainable<JQuery<HTMLElement>>
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid="${selector}"]`, ...args);
})
