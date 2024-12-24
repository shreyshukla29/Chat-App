import { toast } from 'react-toastify';
 const handleImageUpload = async (image) => {
    if (!image) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image); // Append the image file
    formData.append('upload_preset', import.meta.env.VITE_PresetName); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_cloudname}/upload`, {
        method: 'POST',

        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
     // Set the URL of the uploaded image
      console.log('Uploaded Image URL:', data.secure_url);

      return data.secure_url;

    } catch (error) {
      console.error('Error uploading image:', error);
      toast('Error uploading image. Please try again.');
    }
  };

  export default handleImageUpload;