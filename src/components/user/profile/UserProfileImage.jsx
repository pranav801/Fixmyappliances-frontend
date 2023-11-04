import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { decodedToken } from '../../../Context/auth';
import logo from './../../../assets/logo.png'


function UserProfileImage() {
  const [profileImage, setProfileImage] = useState(null);
  const token = decodedToken('userJwt')
  const [newProfileImage, setNewProfileImage] = useState(null);

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user-profile-detail/' + token.id);

      setProfileImage(response.data.profile_image);


    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  // Function to handle file input change for updating the image
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setNewProfileImage(image);
  };

  // Function to handle image update
  const handleImageUpdate = async (newImage) => {
    const formData = new FormData();
    formData.append('profile_image', newImage);
    console.log('New profile image --> ', newProfileImage, newImage);
    setProfileImage(URL.createObjectURL(newImage));

    try {
      // Make a PATCH request to your API to update the image
      await axios.patch('http://localhost:8000/api/update-profile-image/' + token.id, formData, {

      });
      fetchProfileImage()
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  const fileInputRef = React.createRef();

  const handleRemoveImage = async () => {
    try {
      setProfileImage(null);
      setNewProfileImage(null)
    } catch (error) {
      console.error('Error removing profile image:', error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    fetchProfileImage();
  }, []);

  return (
    < div className="user-profile-image">
      <div className="profile-image-container">

        <div onClick={handleImageClick} className="block mx-auto mt-10 cursor-pointer rounded-10 relative group">
          <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => {
            if (e.target.value[0] != null)
              setNewProfileImage(e.target.files[0]);
            console.log(e.target.files[0]);
            handleImageUpdate(e.target.files[0]);
          }} />
          {profileImage ? (
            <img
              alt="User-Dp"
              src={profileImage}
              className= "block mx-auto rounded-10 w-28 lg:w-28 h-28 lg:h-28 object-cover ring-4 ring-gray-50 transition-all duration-500 ease-out group-hover:opacity-50"
            />
          ) : (
            <img src={logo} alt="Default Profile" className="profile-image w-28 block mx-auto " />
          )}
          <span className="text-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-2 px-4 duration-500 ease-out font-semibold text-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {profileImage ? 'Change' : 'Add'}
          </span>
        </div>



        {/* <input type="file" accept="image/*" onChange={handleImageChange} className="image-input" />
        <button onClick={handleImageUpdate} className="update-button">
          Update Profile Image
        </button>
        {profileImage && (
          <button onClick={handleRemoveImage} className="remove-button">
            Remove Profile
          </button>
        )} */}
      </div>
    </div>
  );
}

export default UserProfileImage;
