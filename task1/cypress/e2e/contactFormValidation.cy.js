describe('Form Validation', () => {
    it('should disable submit button if the form is invalid', () => {
      cy.visit('/about');
  
      cy.get('input[name="name"]').type('Testbruker');
  
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });