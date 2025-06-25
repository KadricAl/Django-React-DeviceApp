import React from 'react';
import { useParams } from 'react-router-dom';

export default function AddService() {
  const { id } = useParams();
  return <h2>Add Service Page for device ID: {id}</h2>;
}
