describe('Quiz Integration', ()=>{
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('should get all the way to the summary', ()=>{
    cy.get('button[data-show="idle"').click()
    for (let step = 0; step < 10; step++) {
      cy.get('input').then(($input)=>{      
        if($input.length > 1 ) return cy.get('input').first().check()    
        return cy.get('input').type('something')
      })
      cy.get('button[data-show="question"').click()
    }        
    cy.get('.ant-descriptions-title').should('have.text', 'Summary')
    cy.get('button[data-show="summary"').should('have.text', 'Restart')
  })
})