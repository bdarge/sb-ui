declare namespace Cypress {
  interface Chainable {
    getBySel(
      dataTestAttribute: string,
      args?: any
    ): Cypress.Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) =>
  cy.get(`[data-testid="${selector}"]`, ...args)
);
