describe('Signup page tests', () => {
    it('Try to create an account that not exists', () => {
      cy.visit('/signup');
      const toastSuccessSignUp = /Account created./i;
      
      cy.get('[data-test="name-input-signup"]').as('name-input');
      cy.get('[data-test="email-input-signup"]').as('email-input');
      cy.get('[data-test="password-input-signup"]').as('password-input');
      cy.get('[data-test="button-signup"]').as('button-signup');
  
      cy.get("@name-input").focus().type("a2@a.com");
      cy.get("@email-input").focus().type("a2@a.com");
      cy.get("@password-input").focus().type("Aa123456@");
      cy.get('@button-signup').click();
      cy.contains(toastSuccessSignUp).should('exist');
      cy.wait(3000);
      cy.contains(toastSuccessSignUp).should('not.exist');
    });
  
    it('Try to create an account that already exists', () => {
      cy.visit('/signup');
      const toastFailureSignUp = /Error./i;
      
      cy.get('[data-test="name-input-signup"]').as('name-input');
      cy.get('[data-test="email-input-signup"]').as('email-input');
      cy.get('[data-test="password-input-signup"]').as('password-input');
      cy.get('[data-test="button-signup"]').as('button-signup');
  
      cy.get("@name-input").focus().type("a2@a.com");
      cy.get("@email-input").focus().type("a2@a.com");
      cy.get("@password-input").focus().type("Aa123456@");
      cy.get('@button-signup').click();
      cy.contains(toastFailureSignUp).should('exist');
      cy.wait(3000);
      cy.contains(toastFailureSignUp).should('not.exist');
    });
  })