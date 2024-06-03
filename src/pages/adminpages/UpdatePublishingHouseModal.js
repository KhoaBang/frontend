import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UpdatePublishingHouseModal.module.css"; // Import CSS module

function UpdatePublishingHouseModal({ isOpen, onClose, house }) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (house) {
      setFormData({
        email: house.email,
        phone: house.phone,
        location: house.location,
      });
    }
  }, [house]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/publishinghouse/admin/update/${house._id}`, formData);
      onClose();
      // Optionally, you can update the publishing house list after successful update
    } catch (error) {
      console.error("Error updating publishing house:", error);
      // Handle error
    }
  };

  if (!isOpen || !house) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <button className={styles.close} onClick={onClose}>
        x
      </button>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
              rows={4} // Specify the number of rows for the textarea
              cols={50} // Optionally specify the number of columns
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePublishingHouseModal;
