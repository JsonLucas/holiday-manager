describe('Forget password page tests', () => {
    it('Try to recovery the password of an account that exists', () => {
      cy.visit('/forgot-password');
      const successUpdatedPassword = /Updated Password/i;
    
      cy.get('[data-test="email-input-forgot-password"]').as('email-input');
      cy.get('[data-test="button-verificate-email"]').as('button-verificate-email').should('exist');
  
      cy.get("@email-input").focus().type("a2@a.com");
      cy.get('@button-verificate-email').click();

      cy.get("@email-input").should("not.exist");
      cy.get('@button-verificate-email').should("not.exist");
      
      cy.get('[data-test="password-input-forgot-password"]').as('password-input').should("exist");
      cy.get('[data-test="confirm-password-input-forgot-password"]').as('confirm-password-input').should("exist");
      cy.get('[data-test="button-recovery-password"]').as('button-confirm-recovery-password').should("exist");

      cy.get("@password-input").focus().type("Aa123456@");
      cy.get("@confirm-password-input").focus().type("Aa123456@");
      cy.get('@button-confirm-recovery-password').click();
      cy.contains(successUpdatedPassword).should('exist');
      cy.wait(3000);
      cy.contains(successUpdatedPassword).should('not.exist');
    });
  
    it('Try to recovery the password of an account that not  exists', () => {
      cy.visit('/forgot-password');
      const failureUpdatedPassword = /Error/i;
    
      cy.get('[data-test="email-input-forgot-password"]').as('email-input').should("exist");
      cy.get('[data-test="button-verificate-email"]').as('button-verificate-email').should("exist");
  
      cy.get("@email-input").focus().type("not@exists.com");
      cy.get('@button-verificate-email').click();

      cy.contains(failureUpdatedPassword).should('exist');
      cy.wait(3000);
      cy.contains(failureUpdatedPassword).should('not.exist');
    });
  })