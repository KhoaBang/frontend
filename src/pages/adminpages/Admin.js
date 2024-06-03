import React, { useState } from "react";
import AddBook from "./book-op/AddBook";
import DeleteBook from "./book-op/DeleteBook";
import UserIdModal from "./UserIdModal";
import ImageUpload from './book-op/ImageUpload';
import AllBookPages from "./book-op/bookgridadmin/AllBookPages"; // Import the AllBookPages component
import PublishingHousesList from "./PublishingHousesList"; // Import the PublishingHousesList component
import { useSelector } from "react-redux";

function Admin() {
  const isadmin = useSelector((state) => state.user.isadmin);
  
  // State variables for modals
  const [isAddBookOpen, setAddBookOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserIdModalOpen, setIsUserIdModalOpen] = useState(false);
  const [isAllBookOpen, setIsAllBookOpen] = useState(false); // State for AllBookPages modal
  const [isPublishingHousesModalOpen, setIsPublishingHousesModalOpen] = useState(false); // State for PublishingHousesList modal

  // Functions to open and close modals
  const openModal = () => setAddBookOpen(true);
  const closeModal = () => setAddBookOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openUserIdModal = () => setIsUserIdModalOpen(true);
  const closeUserIdModal = () => setIsUserIdModalOpen(false);
  const openAllBookModal = () => setIsAllBookOpen(true); // Function to open AllBookPages modal
  const closeAllBookModal = () => setIsAllBookOpen(false); // Function to close AllBookPages modal
  const openPublishingHousesModal = () => setIsPublishingHousesModalOpen(true); // Function to open PublishingHousesList modal
  const closePublishingHousesModal = () => setIsPublishingHousesModalOpen(false); // Function to close PublishingHousesList modal

  const handleDelete = (bookId) => {
    console.log(`Book with ID ${bookId} deleted`);
    closeDeleteModal();
  };

  const handleUserIdSubmit = (userId) => {
    // Implement the functionality to handle the userId here
    console.log(`User ID submitted: ${userId}`);
    closeUserIdModal();
  };

  return (
    <div>
      {!isadmin && <h3>Đây là khu vực admin, không phận sự miễn vào.</h3>}
      {isadmin && (
        <div>
          <h3>Welcome admin !!!</h3>
          <p>Hôm nay bạn muốn làm gì ?</p>
          <ul>
            có các công việc như:
            <li>Tạo nhà xuất bản mới</li>
            <li>Lấy tên các nhà xuất bản</li>
            <li>Lấy chi tiết các nhà xuất bản</li>
            <li>Cập nhật nhà xuất bản</li>
            <li>Xóa nhà xuất bản</li>
            <li>Gửi email tới nhà xuất bản</li>
            <li>
              <button onClick={openModal}>Thêm sách mới</button>
            </li>
            <li>
              <button onClick={openAllBookModal}>Xem tất cả sách</button> {/* Button to open AllBookPages modal */}
            </li>
            <li>
              <button onClick={openPublishingHousesModal}>Xem tất cả nhà xuất bản</button> {/* Button to open PublishingHousesList modal */}
            </li>
          </ul>
          <AddBook isOpen={isAddBookOpen} onClose={closeModal} />
          <div>
            <button onClick={openDeleteModal}>Xóa sách</button>
            <DeleteBook
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onDelete={handleDelete}
            />
          </div>
          <div>
            <button onClick={openUserIdModal}>Enter User ID</button>
            <UserIdModal
              isOpen={isUserIdModalOpen}
              onClose={closeUserIdModal}
              onSubmit={handleUserIdSubmit}
            />
          </div>
          <AllBookPages isOpen={isAllBookOpen} onClose={closeAllBookModal} /> {/* AllBookPages modal */}
          {isPublishingHousesModalOpen && <PublishingHousesList close ={closePublishingHousesModal} />} {/* Rendering PublishingHousesList component as modal */}
        </div>
      )}
    </div>
  );
}

export default Admin;
