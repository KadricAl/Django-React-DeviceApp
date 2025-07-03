import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/customers/')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = () => {
    if (!customerToDelete) return;

    fetch(`http://localhost:8000/api/customers/${customerToDelete.id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setCustomers(prev => prev.filter(c => c.id !== customerToDelete.id));
        setShowModal(false);
        setCustomerToDelete(null);
      })
      .catch(err => {
        console.error("Delete failed:", err);
        alert("Failed to delete customer.");
      });
  };

  if (loading) return <p>Loading customers...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Customers</h2>
        <button
          onClick={() => navigate('/customers/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add New Customer
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Address</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Phone</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(customer => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">{customer.address}</td>
              <td className="border border-gray-300 p-2">{customer.email}</td>
              <td className="border border-gray-300 p-2">{customer.phone}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button
                  onClick={() => navigate(`/customers/${customer.id}/edit`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setCustomerToDelete(customer);
                    setShowModal(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={showModal}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${customerToDelete?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowModal(false);
          setCustomerToDelete(null);
        }}
      />
    </div>
  );
}
