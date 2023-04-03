import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState('');
  const [equityAmount, setEquityAmount] = useState('');
  const [salary, setSalary] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = {
      loanAmount,
      equityAmount,
      salary,
    };

    const authToken = sessionStorage.getItem('authToken');

    fetch('http://localhost:8080/api/loans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container mt-5 mx-auto">
      <form onSubmit={handleFormSubmit} className="mx-auto" style={{ width: "50%" }}>
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount:</label>
          <input
            type="number"
            className="form-control"
            id="loanAmount"
            value={loanAmount}
            onChange={(event) => setLoanAmount(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="equityAmount">Equity Amount:</label>
          <input
            type="number"
            className="form-control"
            id="equityAmount"
            value={equityAmount}
            onChange={(event) => setEquityAmount(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Apply;