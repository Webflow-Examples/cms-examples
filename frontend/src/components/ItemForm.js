import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'

const CollectionItemForm = ({ collectionId }) => {
  const [fields, setFields] = useState([]);  // To store field definitions from the API
  const [formData, setFormData] = useState({});  // To store user inputs

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/collections/${collectionId}`);
        setFields(response.data.fields);  // Assuming fields are directly in response.data
        initializeFormData(response.data.fields);
      } catch (error) {
        console.error('Error fetching collection fields:', error);
      }
    };

    fetchData();
  }, [collectionId]);

  // Initialize form data state based on fields
  const initializeFormData = (fields) => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.displayName] = '';  // Initialize each field with an empty string or a default value
    });
    setFormData(initialData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post(`/collections/items/${collectionId}`, formData);
      console.log('Collection item created successfully');
      // Optionally reset form or give user feedback
    } catch (error) {
      console.error('Error creating collection item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.displayName}>
          <label htmlFor={field.displayName}>{field.displayName}</label>
          <input
            type="text"  // Adjust input type based on field.type if necessary
            id={field.displayName}
            name={field.displayName}
            value={formData[field.displayName] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CollectionItemForm;