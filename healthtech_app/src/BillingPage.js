// src/BillingPage.js
import React, { useState, useEffect } from 'react';
import api from './apiClient';
import './App.css';

function BillingPage() {
  // state
  const [billing, setBilling] = useState({
    amount: '',
    status: 'pending',
    dueDate: ''
  });
  const [loaded, setLoaded]   = useState(false);

  // fetch on mount
  useEffect(() => {
    async function fetchBilling() {
      try {
        const res = await api.get('/api/billing');
        setBilling({
          amount:  res.data.amount,
          status:  res.data.status,
          dueDate: res.data.dueDate.slice(0, 10)
        });
      } catch (err) {
        console.log('No billing found, you can create one');
      } finally {
        setLoaded(true);
      }
    }
    fetchBilling();
  }, []);

  // input handler
  const handleChange = e => {
    const { name, value } = e.target;
    setBilling(prev => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/billing', billing);
      setBilling({
        amount:  res.data.amount,
        status:  res.data.status,
        dueDate: res.data.dueDate.slice(0, 10)
      });
      alert('Billing saved');
    } catch (err) {
      console.error('Failed to upsert billing', err.response || err);
      alert('Error saving billing');
    }
  };

  return (
    <div className="page-container">
      <h1>Billing</h1>

      {!loaded ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="shift-form">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={billing.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={billing.status}
              onChange={handleChange}
            >
              <option value="pending">pending</option>
              <option value="paid">paid</option>
              <option value="failed">failed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={billing.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Save
          </button>
        </form>
      )}
    </div>
  );
}

export default BillingPage;
