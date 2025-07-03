import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function InstalledDeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [installedDevice, setInstalledDevice] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch installed device details
    fetch(`http://localhost:8000/api/installed-devices/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch installed device');
        return res.json();
      })
      .then(data => {
        setInstalledDevice(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load installed device.");
        navigate('/installed-devices');
      });

    // Fetch last 10 services for this installed device
    fetch(`http://localhost:8000/api/services/?installed_device=${id}&ordering=-end_date&page_size=10`)
      .then(res => res.json())
      .then(data => {
        // Adjust if your API paginates differently:
        // Assuming data.results if paginated
        const servicesList = data.results || data;
        setServices(servicesList);
      })
      .catch(err => {
        console.error("Failed to load services:", err);
      });
  }, [id, navigate]);

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/installed-devices/${id}/`, {
      method: 'DELETE',
    })
      .then(() => navigate('/installed-devices'))
      .catch(err => {
        console.error("Delete failed:", err);
        alert("Failed to delete installed device.");
      });
  };

  if (loading) return <p>Loading installed device...</p>;
  if (!installedDevice) return <p>Installed device not found.</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-3xl font-semibold mb-4">Installed Device Details</h2>

        <p><strong>Serial Number:</strong> {installedDevice.serial_number}</p>
        <p><strong>Installation Date:</strong> {new Date(installedDevice.installation_date).toLocaleDateString()}</p>
        <p><strong>Device:</strong> {installedDevice.device?.name || 'N/A'}</p>
        <p><strong>Customer:</strong> {installedDevice.customer?.name || 'N/A'}</p>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate(`/installed-devices/${id}/edit`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/installed-devices/${id}/add-service`)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Add Service
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">Service History (Last 10)</h3>

        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">Start Date</th>
                <th className="border border-gray-300 p-2 text-left">End Date</th>
                <th className="border border-gray-300 p-2 text-left">Price</th>
                <th className="border border-gray-300 p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{service.type}</td>
                  <td className="border border-gray-300 p-2">{new Date(service.start_date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">{new Date(service.end_date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">${parseFloat(service.price).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{service.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to permanently delete this installed device?"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
