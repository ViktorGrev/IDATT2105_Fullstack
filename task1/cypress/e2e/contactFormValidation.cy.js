describe('Form Validation', () => {
    it('should disable submit button if the form is invalid', () => {
      // Gå til siden hvor skjemaet befinner seg
      cy.visit('/about');
  
      // Fyll ut kun ett av de nødvendige feltene
      cy.get('input[name="name"]').type('Testbruker');
      // Antar at e-post og melding er obligatoriske, og vi ikke fyller dem ut
  
      // Sjekk at "Send" knappen er deaktivert
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });