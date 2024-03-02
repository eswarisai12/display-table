import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/customers?page=${page}&search=${search}`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl px-4 py-5 bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <table className="min-w-full table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr className="bg-white border-b">
                <td className="px-4 py-2">{customer.sno}</td>
                <td className="px-4 py-2">{customer.customer_name}</td>
                <td className="px-4 py-2">{customer.age}</td>
                <td className="px-4 py-2">{customer.phone}</td>
                <td className="px-4 py-2">{customer.location}</td>
                <td className="px-4 py-2">{customer.date}</td>
                <td className="px-4 py-2">{customer.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
