import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function CustomerDetailsPopup(props) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customerId = props.customerId;
    const authToken = sessionStorage.getItem('authToken');

    fetch(`http://localhost:8080/api/customers/${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error('Error:', error));
  }, [props.customerId]);

  return (
    <div className="popup-content">
      {customer ? (
        <>
          <h2>Customer details</h2>
          <Table striped bordered hover className="mt-3">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{customer.fullName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{customer.email}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{customer.address}</td>
              </tr>
              <tr>
                <td>SSN:</td>
                <td>{customer.socialSecurity}</td>
              </tr>
            </tbody>
          </Table>
          <p style={{ textAlign: 'center' }}>
            <button className="btn btn-secondary" onClick={props.handleClose}>
              Close
            </button>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const Home = ({ isLoggedIn }) => {
  const [loans, setLoans] = useState([]);  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleCustomerDetailsClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedCustomerId(null);
    setShowPopup(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const role = sessionStorage.getItem('role');
      const authToken = sessionStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      if (role === 'CUSTOMER') {
        fetch('http://localhost:8080/api/loans', { headers })
          .then(response => response.json())
          .then(data => setLoans(data))
          .catch(error => console.error('Error:', error));
      } else if (role === 'ADVISER') {
        fetch('http://localhost:8080/api/loans/getAll', { headers })
          .then(response => response.json())
          .then(data => setLoans(data))
          .catch(error => console.error('Error:', error));
      }
    }
  }, [isLoggedIn]);

  return (
    <Container fluid="md" className="mt-5">
      {!isLoggedIn ? (
        <Row>
          <Col>
            <div className="card">
              <div className="card-header"><h4>What would you like to do?</h4></div>
              <div className="card-body">
                <h5 className="card-title">Sign up for a new account to apply for a loan or log in if you already have an account.</h5>
                <Link to="/signup">
                  <button style={{ fontSize: '20px', margin: '10px' }} className="btn btn-primary">Sign up</button>
                </Link>

                <Link to="/login">
                  <button style={{ fontSize: '20px', margin: '10px' }} className="btn btn-primary">Log in</button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <>
          {sessionStorage.getItem('role') === 'ADVISER' ? (
          <div>
            <div className="card">
              <div className="card-header"><h4>Welcome, Adviser!</h4></div>
              <div className="card-body">
                <h5 className="card-title">You can view all loans and their status here.</h5>
              </div>
            </div>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Loan Amount</th>
                  <th>Equity Amount</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map(loan => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{new Date(loan.created).toLocaleString()}</td>
                    <td>{new Date(loan.updated).toLocaleString()}</td>
                    <td>{loan.loanAmount}</td>
                    <td>{loan.equityAmount}</td>
                    <td>{loan.salary}</td>
                    <td>{loan.status}</td>
                    <td>
                      <button onClick={() => handleCustomerDetailsClick(loan.customerId)} style={{ fontSize: '20px', margin: '10px' }} className="btn btn-primary">Customer details</button>
                    </td>
                  </tr>
                  ))}
                  {showPopup && (
                    <CustomerDetailsPopup
                      customerId={selectedCustomerId}
                      handleClose={handleClosePopup}
                    />
                  )}
            </tbody>
          </Table>
        </div>
      ) : (
            <div>
              <div className="card">
                <div className="card-header"><h4>Welcome, Customer!</h4></div>
                <div className="card-body">
                  <h5 className="card-title">You can apply for a loan or view your existing loans here.</h5>
                  <Link to="/apply">
                    <button style={{ fontSize: '20px', margin: '10px' }} className="btn btn-primary">Apply for a new loan</button>
                  </Link>
                </div>
              </div>
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Created</th>
                    <th>Last Updated</th>
                    <th>Loan Amount</th>
                    <th>Equity Amount</th>
                    <th>Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => (
                    <tr key={loan.id}>
                    <td>{new Date(loan.created).toLocaleString()}</td>
                    <td>{new Date(loan.updated).toLocaleString()}</td>
                      <td>{loan.loanAmount}</td>
                      <td>{loan.equityAmount}</td>
                      <td>{loan.salary}</td>
                      <td>{loan.status}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
      )
    }
    </>
    )}
    </Container >
    );
  };

export default Home;
