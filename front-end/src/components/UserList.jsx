import React, { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import UsersContext from '../contexts/UsersContext';

function UserList() {
  const { users, setUsers } = useContext(UsersContext);
  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function getUsers() {
      const request = await axios.get('http://localhost:3001/users',
        { headers: { Authorization: token },
        });
      const list = request.data;
      const filteredList = list.filter((e) => e.role !== 'administrator');
      setUsers(filteredList);
    }
    getUsers();
  }, [setUsers, token]);

  async function handleClick(email) {
    const request = await axios.delete(`http://localhost:3001/users/${email}`,
      { headers: { Authorization: token },
      });
    const myList = request.data.data;
    const filteredList = myList.filter((e) => e.role !== 'administrator');
    setUsers(filteredList);
  }

  return (
    <div>
      <h2>Lista de usuários</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((u, i) => (
              <tr key={ u.name }>
                <td data-testid={ `admin_manage__element-user-table-item-number-${i}` }>
                  { i + 1 }
                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${i}` }>
                  { u.name }
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${i}` }>
                  { u.email }
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${i}` }>
                  { u.role }
                </td>
                <td>
                  <button
                    data-testid={ `admin_manage__element-user-table-remove-${i}` }
                    onClick={ () => handleClick(u.email) }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
