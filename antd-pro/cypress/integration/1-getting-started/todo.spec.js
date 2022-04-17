describe('E-form Automate Testing', () => {
    beforeEach(() => {
        cy.visit('http://159.138.89.74:8000/user/login')
        cy.get('.ant-form');
    })

    //Incorrect Login Credentials
    it('Enter incorrect credentials', () => {
        cy.get('#username')
            .type('admin')
            .should('have.value', 'admin');
        cy.get('#password')
            .type('123123')
            .should('have.value', '123123');
        cy.get('.ant-form').submit().wait(1000)
    })

    //Correct Login Credentials
    it('Check Notification', () => {
        cy.get('#username')
            .type('manager')
            .should('have.value', 'manager');
        cy.get('#password')
            .type('ant.design')
            .should('have.value', 'ant.design');
        cy.get('.ant-form').submit()

        // //Check Notification
        // cy.get('.ant-badge > .anticon').click().wait(1000)

        //Create Project
        cy.visit('http://159.138.89.74:8000/manager/projects')
        cy.get('.ant-btn > :nth-child(2)').click().wait(3000)
        cy.get('.ant-btn-primary').click().wait(3000)
        cy.get('[data-inspector-line="99"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Create Project')
        .should('have.value', 'Create Project');
        cy.get('[data-inspector-line="102"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Create Project 1')
        .should('have.value', 'Create Project 1');
        cy.get('.ant-btn-primary').click().wait(3000)

        //Edit Project
        cy.get(':nth-child(1) > :nth-child(4) > .ant-space > :nth-child(1) > a').click().wait(3000)

        cy.get('[data-inspector-line="115"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type(' 123')
        .should('have.value', 'Create Project 123');
        cy.get('[data-inspector-line="120"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('23')
        .should('have.value', 'Create Project 123');
        cy.get('.ant-btn-primary').click().wait(3000)

        //Delete Project
        cy.visit('http://159.138.89.74:8000/manager/projects')
        cy.get(':nth-child(1) > :nth-child(4) > .ant-space > :nth-child(3) > a').click().wait(2000)

        cy.visit('http://159.138.89.74:8000/manager/bin')
    })

    //Create Form
    it('Create Form', () => {
        cy.get('#username')
            .type('manager')
            .should('have.value', 'manager');
        cy.get('#password')
            .type('ant.design')
            .should('have.value', 'ant.design');
        cy.get('.ant-form').submit()

        cy.visit('http://159.138.89.74:8000/manager/projects')
        cy.get('.ant-btn > :nth-child(2)').click().wait(3000)
        cy.get('.ant-btn-primary').click().wait(3000)
        cy.get('[data-inspector-line="99"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Create Project')
        .should('have.value', 'Create Project');
        cy.get('[data-inspector-line="102"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Create Project 1')
        .should('have.value', 'Create Project 1');
        cy.get('.ant-btn-primary').click().wait(3000)

        cy.get(':nth-child(1) > :nth-child(4) > .ant-space > :nth-child(2) > a').click().wait(1000)
        cy.get('.ant-btn').click()

        cy.get('[data-inspector-line="164"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Testing Form 1')
        .should('have.value', 'Testing Form 1');

        cy.get('[data-inspector-line="167"] > .ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Testing description')
        .should('have.value', 'Testing description');

        cy.get('.ant-picker').click().wait(1000)
        cy.get('.ant-picker-cell-inner').contains('30').click().wait(2000)

        cy.get('.ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click().wait(1000)
        cy.get('.ant-select-item-option-content').contains('Template 1').click().wait(2000)
        cy.get('.ant-col-50 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn').click().wait(2000)

        cy.get('[data-inspector-line="220"] > div > .ant-btn-primary').click().wait(1000)
    

        //Update Form
        cy.get('[data-inspector-line="30"] > .ant-btn').click()

        cy.get('.ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
        cy.get('.ant-select-item-option-content').contains('Text Area').click().wait(2000)
        cy.get('.ant-form-item-control-input-content > .ant-btn').click(1000)

        cy.get('[data-inspector-line="16"][data-inspector-relative-path="src/pages/ManagerEForm/Projects/Forms/Manage/components/FormBuilderComponents/BuilderTextAreaElement.js"] > .ant-col-0 > .ant-form-item-control-input > .ant-form-item-control-input-content > input.ant-input')
        .type('Testing question 5')
        .should('have.value', 'Testing question 5');

        cy.get('[data-inspector-line="16"][data-inspector-relative-path="src/pages/ManagerEForm/Projects/Forms/Manage/components/FormBuilderComponents/BuilderTextAreaElement.js"] > .ant-col-0 > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-inspector-line="26"] > [data-inspector-line="27"] > .ant-space > [style=""] > .ant-switch').click().wait(2000)

        cy.get('[data-inspector-line="203"] > div > .ant-btn-primary').click().wait(1000)
    

        //Delete Form
        cy.get('[data-inspector-line="30"] > .ant-btn').click()
        cy.get('.ant-btn-danger').click().wait(2000)
        cy.get('.ant-popover-buttons > .ant-btn-primary').click().wait(2000)

        cy.visit('http://159.138.89.74:8000/manager/bin')
    })

     //Fill Form
    it('Fill Form', () => {
        cy.get('#username')
            .type('worker')
            .should('have.value', 'worker');
        cy.get('#password')
            .type('ant.design')
            .should('have.value', 'ant.design');
        cy.get('.ant-form').submit()

        cy.visit('http://159.138.89.74:8000/EFormWorker/forms')
        cy.get(':nth-child(1) > :nth-child(5) > .ant-space > .ant-space-item > a').click().wait(3000)
        cy.get('.ant-btn-primary').click().wait(3000)

        cy.get(':nth-child(1) > .ant-col-0 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Testing')
        .should('have.value', 'Testing');
        cy.get(':nth-child(2) > .ant-col-0 > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input')
        .type('Testing')
        .should('have.value', 'Testing');

        cy.get(':nth-child(1) > .ant-space > .ant-space-item > .ant-radio-wrapper > .ant-radio > .ant-radio-input').click()
        cy.get('[style=""] > .ant-space > .ant-space-item > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()
        cy.get(':nth-child(2) > .ant-space > .ant-space-item > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click()

        cy.get('.ant-space > :nth-child(1) > .ant-btn').click().wait(5000)
    })

    //Approve Form
    it('Approve Form', () => {
        cy.get('#username')
            .type('manager')
            .should('have.value', 'manager');
        cy.get('#password')
            .type('ant.design')
            .should('have.value', 'ant.design');
        cy.get('.ant-form').submit()

        cy.visit('http://159.138.89.74:8000/manager/formreview')

        cy.get('.ant-card-extra > a').click().wait(1000)
        cy.get('[data-inspector-line="119"]').click().wait(1000)
    })

     //Check Form
    it('Check Form', () => {
        cy.get('#username')
            .type('worker')
            .should('have.value', 'worker');
        cy.get('#password')
            .type('ant.design')
            .should('have.value', 'ant.design');
        cy.get('.ant-form').submit()

        cy.visit('http://159.138.89.74:8000/EFormWorker/status')
    })
})