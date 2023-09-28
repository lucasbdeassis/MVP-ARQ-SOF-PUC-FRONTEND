import Navbar from "./components/navbar.jsx";
import Table from "./components/table.jsx";
import Hero from "./components/hero.jsx";
import Login from "./components/login.jsx";
import BtcBanner from "./components/btc_banner.jsx";
import CreateTransactionForm from "./components/create_transaction_form.jsx";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    sessionStorage.removeItem("userToken2");
    window.location.reload();
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const userToken2 = sessionStorage.getItem("userToken2");

  try {
    fetch("http://127.0.0.1:5000/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: userToken2 }),
    });
  } catch (error) {
    console.error("Error:", error);
    sessionStorage.removeItem("userToken2");
    window.location.reload();
  }

  console.log("userToken2");
  console.log(userToken2);

  if (userToken2) {
    return (
      <div>
        <div className='container text-center'>
          <button type='button' className='btn btn-danger' onClick={onClick}>
            SAIR
          </button>
        </div>
        <Hero />
        <BtcBanner />
        <CreateTransactionForm count={count} onIncrement={handleIncrement} />
        <Table count={count} onIncrement={handleIncrement} />
      </div>
    );
  }

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
