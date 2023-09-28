import React from 'react';
import { atom, useAtom } from 'jotai';

function Navbar() {
  const [count, setCounter] = useAtom(counter);
  const onClick = () => setCounter(prev => prev - 1);
  return (
    <ul className="nav justify-content-center">
    <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Active</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
    </li>
    <li className="nav-item">
        <a className="nav-link disabled">Disabled</a>
    </li>
    <li className="nav-item">
      <button onClick={onClick}>Click</button>
    </li>
    </ul>
  );
}

export default Navbar;