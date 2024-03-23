describe('Login page tests', () => {
  it('Try to login into an account that not exists', () => {
    cy.visit('/');
    const toastFailureLogin = /Error/i;

    cy.get('[data-test="email-input-login"]').as('email-input');
    cy.get('[data-test="password-input-login"]').as('password-input');
    cy.get('[data-test="button-login"]').as('button-login');

    cy.get("@email-input").focus().type("a2@a.com");
    cy.get("@password-input").focus().type("a2@a.com");
    cy.get('@button-login').click();
    cy.contains(toastFailureLogin).should('exist');
    cy.wait(3000);
    cy.contains(toastFailureLogin).should('not.exist');
  });

  it('Try to login into an account that exists', () => {
    cy.visit('/');
    const toastSuccessLogin = /Successfuly logged in./i;

    cy.get('[data-test="email-input-login"]').as('email-input');
    cy.get('[data-test="password-input-login"]').as('password-input');
    cy.get('[data-test="button-login"]').as('button-login');

    cy.get("@email-input").focus().type("a@a.com");
    cy.get("@password-input").focus().type("Jj123456@");
    cy.get('@button-login').click();

    cy.contains(toastSuccessLogin).should('exist');
    cy.wait(3000);
    cy.contains(toastSuccessLogin).should('not.exist');
  });

  describe("Testng the complete flux while logged", () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-test="email-input-login"]').as('email-input');
      cy.get('[data-test="password-input-login"]').as('password-input');
      cy.get('[data-test="button-login"]').as('button-login');

      cy.get("@email-input").focus().type("a@a.com");
      cy.get("@password-input").focus().type("Jj123456@");
      cy.get('@button-login').click();
    });

    it("Try to create a holiday with only one day", () => {
      const hoje = new Date().toISOString().split("T")[0];
      
      cy.get('[data-test="start-range-date"]').as('start-date');
      cy.get('[data-test="button-open-modal-create-holiday"]').as('open-modal-create-holiday');

      cy.get('@start-date').type(hoje).trigger('change');
      cy.get('@open-modal-create-holiday').should("exist").click();
      
      // cy.get('[data-test="modal-create-holiday"]').as('modal-create-holiday').should('exist');
      cy.get('[data-test="create-holiday-title-input-0"]').as('title-input').should('exist');
      cy.get('[data-test="create-holiday-description-input-0"]').as('description-input').should('exist');
      cy.get('#create-holiday-coordinates-input-0').as('coordinates-input').should('exist');
      cy.get('[data-test="button-create-holiday"]').as('button-create-holiday').should('exist');
      
      cy.get('@title-input').type('some title');
      cy.get('@description-input').type('some description');
      cy.get('@coordinates-input').click();
      cy.get('@button-create-holiday').click();

      cy.contains(/Holiday successfuly created/i);
      cy.get('@button-create-holiday').should("not.exist");
    });

    it("Try to create a task for the created holiday", () => {
      const hoje = new Date().toISOString().split("T")[0];
      
      cy.get(`[data-test="holiday-${hoje}"]`).as('holiday').should('exist').click();
      cy.get(`[data-test='add-task-fields'`).as('add-task-fields').should('exist').click();
  
      cy.get('[data-test="create-task-title-input-0"]').as('title-input').should('exist');
      cy.get('[data-test="create-task-description-input-0"]').as('description-input').should('exist');
      cy.get('[data-test="button-create-holiday-tasks"]').as('button-create-holiday-tasks').should('exist');
      
      cy.get('@title-input').type('some title');
      cy.get('@description-input').type('some description');
      cy.get('@button-create-holiday-tasks').click();

      cy.contains(/Task successfuly created/i);
      cy.get('@button-create-holiday-tasks').should("not.exist");
    });

    it("Try to update a holiday", () => {
      const hoje = new Date().toISOString().split("T")[0];
      
      cy.get(`[data-test="update-holiday-icon-${hoje}"]`).as('holiday').should('exist').click();
      
      // cy.get('[data-test="modal-create-holiday"]').as('modal-create-holiday').should('exist');
      cy.get('[data-test="update-holiday-title-input"]').as('title-input').should('exist');
      cy.get('[data-test="update-holiday-description-input"]').as('description-input').should('exist');
      cy.get('#update-holiday-coordinates-input').as('coordinates-input').should('exist');
      cy.get('[data-test="button-update-holiday"]').as('button-update-holiday').should('exist');
      
      cy.get('@title-input').type('some modified title');
      cy.get('@description-input').type('some modified description');
      cy.get('@coordinates-input').click();
      cy.get('@button-update-holiday').click();

      cy.contains(/Holiday successfuly updated/i);
      cy.get('@button-update-holiday').should("not.exist");
    });

    it("Try to delete the holiday created in the last test", () => {
      const hoje = new Date().toISOString().split("T")[0];

      cy.get(`[data-test="delete-holiday-icon-${hoje}"]`).should('exist').click();
      cy.get(`[data-test="button-confirm-delete"]`).should('exist').click();
      cy.contains(/Holiday successfuly deleted/i);
    })
  });
});