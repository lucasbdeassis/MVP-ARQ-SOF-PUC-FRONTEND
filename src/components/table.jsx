import React, { useState, useEffect } from "react";

function Table(props) {
  const [transactions, setTransactions] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const [currentTransaction, setCurrentTransaction] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/transactions", {
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("userToken2"),
      },
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, [props.count]);

  const deleteTransaction = (id) => {
    fetch(`http://127.0.0.1:5000/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("userToken2"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        props.onIncrement();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const updateTransaction = (event) => {
    let { amount, description, category } = currentTransaction;
    amount = amount * 100;
    const updatedFields = { amount, description, category };
    fetch(`http://127.0.0.1:5000/transactions/${currentTransaction.id}`, {
      method: "PUT",
      headers: {
        Authorization: sessionStorage.getItem("userToken2"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
  };

  const setCurrentTransactionFunction = (transaction) => {
    let new_transaction = { ...transaction };
    new_transaction.amount = transaction.amount / 100;
    setCurrentTransaction(new_transaction);
  };

  const filteredTransactions = transactions.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().indexOf(searchfield.toLowerCase()) > -1
    )
  );

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>Transações</div>
        <div className='card-body'>
          <div className='row' style={{ paddingBottom: "10px" }}>
            <div className='col-6' style={{ paddingLeft: "40px" }}>
              <div class='d-flex align-items-center'>
                <div class='flex-grow-1'>
                  <div class='small fw-bold text-primary mb-1'>Total Gasto</div>
                  <div class='h5'>
                    {(
                      filteredTransactions.reduce(
                        (total, transaction) =>
                          total + parseFloat(transaction.amount),
                        0
                      ) / 100
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
                <div class='ms-2'>
                  <i class='fas fa-dollar-sign fa-2x text-gray-200'></i>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <input
                type='text'
                className='form-control'
                onChange={onSearchChange}
              />
            </div>
          </div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>
                    {(transaction.amount / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                    {new Date(transaction.time).toLocaleDateString("pt-BR")}
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target={`#editTransactionModal`}
                      onClick={() => setCurrentTransactionFunction(transaction)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-danger delete-button'
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id='editTransactionModal' class='modal' tabIndex='-1'>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title'>Atualizar Transação</h5>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <form onSubmit={updateTransaction}>
              <div class='modal-body ms-2 me-2'>
                <div className='row mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='description'
                    value={currentTransaction.description}
                    onChange={(event) =>
                      setCurrentTransaction({
                        ...currentTransaction,
                        description: event.target.value,
                      })
                    }
                  />
                </div>
                <div className='row mb-3'>
                  <label htmlFor='category' className='form-label'>
                    Category
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='category'
                    value={currentTransaction.category}
                    onChange={(event) =>
                      setCurrentTransaction({
                        ...currentTransaction,
                        category: event.target.value,
                      })
                    }
                  />
                </div>
                <div className='row mb-3'>
                  <label htmlFor='amount' className='form-label'>
                    Amount
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='amount'
                    value={currentTransaction.amount}
                    onChange={(event) =>
                      setCurrentTransaction({
                        ...currentTransaction,
                        amount: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button type='submit' class='btn btn-primary'>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
