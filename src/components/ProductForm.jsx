 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    name: '',
    price: '',
    description: '',
    image_url: null, // field for file upload
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Product Name is required';
    }
    if (!values.price) {
      errors.price = 'Product Price is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    return errors;
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create image preview
      setFieldValue('image', file); // Store the selected file
    }
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // Check if image is selected
    if (!values.image) {
      alert('Please select an image to upload');
      setSubmitting(false);
      return;
    }

    // Create FormData to send both text and image to the backend
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('image_url', values.image); // Image as file (req.file)

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // This is important for sending file data
        },
      });

      console.log('Form submitted successfully:', response.data);
      resetForm(); // Reset the form fields after successful submission
      alert('Product added successfully!');
      
    } catch (error) {
      console.error('Error submitting the form', error);
      alert('Error submitting the form');
    }
    setSubmitting(false); // Stop the submitting spinner
    setImagePreview(null); // Clear the image preview+
   
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="bg-gray-100 max-w-sm mt-28 mx-auto p-4 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">Add Product</h1>

          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block font-medium mb-2">Price</label>
            <Field
              type="text"
              id="price"
              name="price"
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage name="price" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">Description</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="w-full px-3 py-2 border rounded-md"
              rows="4"
            />
            <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="image_url" className="block font-medium mb-2">Upload an Image</label>
            <input
              type="file"
              id="image_url"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setFieldValue)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage name="image" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {imagePreview && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Image Preview</h3>
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ProductForm;
