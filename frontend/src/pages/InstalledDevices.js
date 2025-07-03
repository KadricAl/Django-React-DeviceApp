import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InstalledDevices() {
  const [installedDevices, setInstalledDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/installed-devices/')
      .then(res => res.json())
      .then(data => {
        setInstalledDevices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading installed devices...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Installed Devices</h2>
        <button
          onClick={() => navigate('/installed-devices/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add New Installed Device
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Serial Number</th>
            <th className="border border-gray-300 p-2 text-left">Device</th>
            <th className="border border-gray-300 p-2 text-left">Customer</th>
            <th className="border border-gray-300 p-2 text-left">Installation Date</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {installedDevices.map(device => (
            <tr
              key={device.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/installed-devices/${device.id}`)}
            >
              <td className="border border-gray-300 p-2">{device.serial_number}</td>
              <td className="border border-gray-300 p-2">{device.device?.name || 'N/A'}</td>
              <td className="border border-gray-300 p-2">{device.customer?.name || 'N/A'}</td>
              <td className="border border-gray-300 p-2">
                {new Date(device.installation_date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={e => {
                    e.stopPropagation(); // Prevent row click
                    navigate(`/installed-devices/${device.id}/add-service`);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                >
                  Add Service
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
