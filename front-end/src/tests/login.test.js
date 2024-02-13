import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Login Page test', () => {
    it('Check all components', () => {
        const { getByText, getByTestId } = render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>,
        );

        
        const email = getByText(/Email address/);
        expect(email).toBeInTheDocument();
        
        const password = getByText(/Password/);
        expect(password).toBeInTheDocument();
        
        const loginBtn = getByText(/LOGIN/);
        expect(loginBtn).toBeInTheDocument();
        
        const registerBtn = getByText(/AINDA NÃO TENHO CONTA/);
        expect(registerBtn).toBeInTheDocument();
        
        const emailField = getByTestId('common_login__input-email');
        expect(emailField).toBeInTheDocument();
        
        const passwordField = getByTestId('common_login__input-password');
        expect(passwordField).toBeInTheDocument();
    
    });
    it('Check Login Buton', () => {
        const { getByText, getByTestId } = render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>,
        );

        const loginBtn = getByText(/LOGIN/);
        expect(loginBtn).toBeDisabled();
        
        const emailField = getByTestId('common_login__input-email');
        userEvent.type(emailField, 'email@email.com');
        expect(loginBtn).toBeDisabled();
        
        const passwordField = getByTestId('common_login__input-password');
        userEvent.type(passwordField, '123456');
        expect(loginBtn).not.toBeDisabled();
        
        userEvent.click(loginBtn);
        const warningMsg = getByText(/Email não cadastrado!/);
        expect(warningMsg).toBeInTheDocument();
    });
    it('Check Register Button', () => {
        const { getByText, getByTestId } = render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>,
        );

        const history = createMemoryHistory();

        const registerBtn = getByTestId('common_login__button-register');
        expect(registerBtn).toBeInTheDocument();
        userEvent.click(registerBtn);
    });
})