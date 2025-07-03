import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function DeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/devices/${id}/`)
      .then(res => res.json())
      .then(data => {
        setDevice(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching device:", err);
        setLoading(false);
      });
  }, [id]);

   const handleDelete = () => {
    fetch(`http://localhost:8000/api/devices/${id}/`, {
      method: 'DELETE',
    })
      .then(() => navigate('/devices'))
      .catch(err => {
        console.error("Failed to delete device:", err);
        alert("Delete failed");
      });
  };

  if (loading) return <p>Loading device...</p>;
  if (!device) return <p>Device not found.</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">{device.name}</h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {device.picture_url && (
          <img
            src={device.picture_url}
            alt={device.name}
            className="w-full max-h-64 object-contain rounded"
          />
        )}
        <p><span className="font-semibold">Type:</span> {device.type}</p>
        <p><span className="font-semibold">Brand:</span> {device.brand}</p>
        <p><span className="font-semibold">Price:</span> ${parseFloat(device.price).toFixed(2)}</p>
        <p><span className="font-semibold">Description:</span></p>
        <p className="text-gray-700">{device.description}</p>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate(`/devices/${device.id}/edit`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Edit Device
          </button>
          <button
            onClick={() => setShowModal(true)}  // this opens the modal!
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Delete Device
        </button>
        </div>
      </div>
      {/* Modal */}
      <ConfirmModal
        isOpen={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to permanently delete this device?"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
