import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Register from '../pages/Register';

describe('Register Page test', () => {
    it('Check all Components', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>,
      );

      const name = getByText(/Nome/);
      expect(name).toBeInTheDocument();

      const email = getByText(/Email/);
      expect(email).toBeInTheDocument();

      const password = getByText(/Senha/);
      expect(password).toBeInTheDocument();

      const registerBtn = getByText(/Cadastrar/);
      expect(registerBtn).toBeInTheDocument();

      const nameField = getByTestId('common_register__input-name');
      expect(nameField).toBeInTheDocument();

      const emailField = getByTestId('common_register__input-email');
      expect(emailField).toBeInTheDocument();

      const passwordField = getByTestId('common_register__input-password');
      expect(passwordField).toBeInTheDocument();

    });

    it('Check Register Button', () => {
      const { getByText, getByTestId } = render(
          <MemoryRouter>
            <Register />
          </MemoryRouter>,
        );

      const registerBtn = getByText(/Cadastrar/);
      expect(registerBtn).toBeDisabled();

      const nameField = getByTestId('common_register__input-name');
      userEvent.type(nameField, 'Fulano da Silva');
      expect(registerBtn).toBeDisabled();
     

      const emailField = getByTestId('common_register__input-email');
      userEvent.type(emailField, 'email@email.com');
      expect(registerBtn).toBeDisabled();


      const passwordField = getByTestId('common_register__input-password');
      userEvent.type(passwordField, '123456');
      expect(registerBtn).not.toBeDisabled();

      userEvent.click(registerBtn);
      const warningMsg = getByTestId('common_register__element-invalid_register');
      expect(warningMsg).toBeInTheDocument();
   
    });
});