import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InstalledDevices() {
  const navigate = useNavigate();
  const [installedDevices, setInstalledDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/installed-devices/?ordering=-installation_date')
      .then(res => res.json())
      .then(data => {
        const list = data.results || data; // in case pagination added
        setInstalledDevices(list);
        setFilteredDevices(list);
      });
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredDevices(installedDevices);
      return;
    }

    const keyword = search.toLowerCase();
    const filtered = installedDevices.filter(device =>
      device.serial_number.toLowerCase().includes(keyword)
    );
    setFilteredDevices(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Installed Devices</h2>
        <button
          onClick={() => navigate('/installed-devices/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add New
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by serial number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Serial Number</th>
            <th className="border p-2 text-left">Device</th>
            <th className="border p-2 text-left">Customer</th>
            <th className="border p-2 text-left">Installed</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">No installed devices found.</td>
            </tr>
          ) : (
            filteredDevices.map(device => (
              <tr
                key={device.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/installed-devices/${device.id}`)}
              >
                <td className="border p-2">{device.serial_number}</td>
                <td className="border p-2">{device.device?.name || 'N/A'}</td>
                <td className="border p-2">{device.customer?.name || 'N/A'}</td>
                <td className="border p-2">
                  {new Date(device.installation_date).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/installed-devices/${device.id}/add-service`);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Add Service
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
