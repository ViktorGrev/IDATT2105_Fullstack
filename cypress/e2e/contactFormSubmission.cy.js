describe('Successful Submission', () => {
    beforeEach(() => {
      // Fange opp POST forespørselen
      cy.intercept('POST', 'http://localhost:3000/submissions', {
        statusCode: 200,
        body: {
          message: 'Form submitted successfully',
        },
      }).as('formSubmission');
    });
  
    it('should display a success message upon form submission', () => {
      cy.visit('/about');
  
      cy.get('input[name="name"]').type('Testbruker');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('textarea[name="comment[text]"]').type('Dette er en testmelding.');
  
      cy.get('button[type="submit"]').should('not.be.disabled').click(); //Sender inn
  
      // Vent på at POST forespørselen skal fullføres
      cy.wait('@formSubmission');
  
      cy.contains('Form submitted successfully').should('exist');
    });
  });
  