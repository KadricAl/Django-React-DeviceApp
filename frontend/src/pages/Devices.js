import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDelete = () => {
  if (!deviceToDelete) return;

  fetch(`http://localhost:8000/api/devices/${deviceToDelete.id}/`, {
    method: 'DELETE',
  })
    .then(() => {
      setDevices(prev => prev.filter(d => d.id !== deviceToDelete.id)); // remove from list
      setShowModal(false);
      setDeviceToDelete(null);
    })
    .catch(err => {
      console.error("Delete failed:", err);
      alert("Failed to delete device.");
    });
};

  useEffect(() => {
    fetch('http://localhost:8000/api/devices/')
      .then(res => res.json())
      .then(data => {
        setDevices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading devices...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Devices</h2>
        <button
          onClick={() => navigate('/devices/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add New Device
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Type</th>
            <th className="border border-gray-300 p-2 text-left">Brand</th>
            <th className="border border-gray-300 p-2 text-left">Price</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
            {devices.map(device => (
                <tr
                key={device.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/devices/${device.id}`)} // 👈 make entire row clickable
                >
                <td className="border border-gray-300 p-2">
                    {device.name}
                </td>
                <td className="border border-gray-300 p-2">
                    {device.type}
                </td>
                <td className="border border-gray-300 p-2">
                    {device.brand}
                </td>
                <td className="border border-gray-300 p-2">
                    ${parseFloat(device.price).toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2 text-center space-x-2">
                  <button
                    onClick={e => {
                      e.stopPropagation(); // Prevent row click
                      navigate(`/devices/${device.id}/edit`);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setDeviceToDelete(device);     // ← set which device to delete
                      setShowModal(true);            // ← open modal
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
          message={`Are you sure you want to permanently delete "${deviceToDelete?.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowModal(false);
            setDeviceToDelete(null);
          }}
        />
    </div>
  );
}
