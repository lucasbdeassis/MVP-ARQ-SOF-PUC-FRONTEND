import React, { useState } from "react";

const CreateTransactionForm = (props) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    var transaction = { amount, category, time, description };
    transaction.amount = transaction.amount * 100;
    fetch("http://127.0.0.1:5000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("userToken2"),
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        props.onIncrement();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>Nova Transação</div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div
              className='row'
              style={{ position: "relative", paddingBottom: "10px" }}
            >
              <div className='col'>
                <label htmlFor='description' className='form-label'>
                  Description
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className='col'>
                <label htmlFor='category' className='form-label'>
                  Category
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='category'
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                />
              </div>
            </div>
            <div className='row' style={{ position: "relative" }}>
              <div className='col'>
                <label htmlFor='amount' className='form-label'>
                  Amount
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='amount'
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
              <div className='col'>
                <label htmlFor='date' className='form-label'>
                  Date
                </label>
                <input
                  type='date'
                  className='form-control'
                  id='date'
                  onChange={(event) => setTime(event.target.value)}
                />
              </div>
              <div className='col'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ position: "absolute", bottom: "0" }}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionForm;
