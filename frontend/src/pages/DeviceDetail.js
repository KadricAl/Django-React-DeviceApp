import React from 'react';
import { useParams } from 'react-router-dom';

export default function DeviceDetail() {
  const { id } = useParams();
  return <h2>Device Detail Page for device ID: {id}</h2>;
}
