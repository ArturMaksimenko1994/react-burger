/// <reference types="cypress" />

import login from '../fixtures/login.json';

describe('constructor page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/');
    });

    it('shows ingredient detail', () => {
        cy.contains('Конструктор');
        cy.contains('Выберите начинку');

        // Используем data-testid для клика на первый ингредиент
        cy.get('[data-testid^=burger-ingredient]').first().click();

        // Явное ожидание появления модального окна
        cy.get('[data-testid^=modal-block]').should('be.visible')
            .contains('Детали ингредиента');

        // Закрываем модальное окно
        cy.get('[data-testid^=close-modal]').click(); // исправлен селектор здесь

        // Проверяем, что модальное окно исчезло
        cy.get('[data-testid^=modal-block]').should('not.exist');
    });

    it('creates order', () => {
        cy.get('[data-testid^=list-ingredients-all]').as('list');
        cy.get('@list').eq(0).find('[data-testid^=burger-ingredient]').first().as('bun');
        cy.get('@list').eq(1).find('[data-testid^=burger-ingredient]').first().as('ingredient');
        cy.get('[class^=burger-constructor_group').first().as('dest');
        cy.get('@dest').children().first().as('bun-dest')
        cy.get('@bun-dest').next().as('ingredient-dest');
        cy.get('[class^=burger-constructor_row] button').as('order-button');

        cy.contains('Выберите булочку');
        cy.contains('Выберите начинку');

        cy.get('@bun').trigger('dragstart');
        cy.get('@bun-dest').trigger('drop');
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@ingredient-dest').trigger('drop');
        cy.get('@order-button').click();

        // Логинимся
        cy.contains('Вход');
        cy.get('[name=email]').type(login.email);
        cy.get('[name=password]').type(login.password);
        cy.contains('button', 'Войти').click();

        // Проверяем, что заказ был создан успешно
        cy.get('@order-button').click();
        cy.get('[class^=order-details_row]', { timeout: 20000 }).contains(/\d+/);
        cy.get('[data-testid^=close-modal]').click(); // исправлен селектор здесь

        // Проверяем, что перетащить булку и ингредиенты снова доступны
        cy.contains('Конструктор');
        cy.contains('Выберите начинку');
    });
});
