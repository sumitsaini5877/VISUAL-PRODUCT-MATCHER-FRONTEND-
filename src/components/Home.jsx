
  import { Form, Formik, Field, ErrorMessage } from "formik";
  import { useEffect, useState } from "react";
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

  function Home() {
    const [loading, setLoading] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false); // Track submission status

    const initialValues = {
      image_url: null, // This will hold the selected file
      product_url: "", // This will hold the product URL
    };

    // const validate = (values) => {
    //   const errors = {};

    //   // Only validate URL format if it's not empty
    //   if (values.product_url && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.product_url)) {
    //     errors.product_url = "Invalid URL format";
    //     toast.error('Invalid URL format')
    //   }

    //   // If neither image_url nor product_url is provided, show general error
    //   if (!values.image_url && !values.product_url) {
    //     errors.general = "Please provide either an image or a product URL.";
    //   }

    //   return errors;
    // };

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
      // If neither field is provided, show an error toast and stop submission
      if (!values.image_url && !values.product_url) {
        toast.error("Please select an image or provide a product URL.");
        setSubmitting(false);
        return;
      }

      // If URL is invalid, show a toast and stop submission
      if (values.product_url && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.product_url)) {
        toast.error("Invalid URL format.");
        setSubmitting(false);
        return;
      }

      // Simulate an action depending on which field is provided
      if (values.image_url) {
        // Handle image file submission (e.g., upload the file)
        console.log("Submitting image:", values.image_url);
        toast.success("Image uploaded successfully!");
      } else if (values.product_url) {
        // Handle product URL submission (e.g., submit the URL)
        console.log("Submitting URL:", values.product_url);
        toast.success("Product URL submitted successfully!");
      }

      // Update state to indicate form submission is successful
      setFormSubmitted(true);

      // Reset form after successful submission
      resetForm();
      setSubmitting(false);
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 250);

      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return (
        <div className="flex justify-center mt-64">
          <l-tail-chase size="40" speed="1.75" color="gray"></l-tail-chase>
        </div>
      );
    }

    return (
      <>
        {/* ToastContainer for toast notifications */}
        <ToastContainer />

        {/* Conditional Rendering: Show form or new page after submission */}
        {!formSubmitted ? (
          <Formik
            initialValues={initialValues}
            // validate={validate}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <div className="container flex justify-center mt-8 px-4 sm:px-6 lg:px-8">
                  <div className="h-max w-full sm:w-10/12 lg:w-7/12 grid grid-cols-1 sm:grid-cols-4 gap-4 py-12">
                    {/* Heading */}
                    <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl flex justify-center col-span-1 sm:col-start-2 sm:col-span-2">
                      Find visually similar products
                    </h1>

                    {/* Description */}
                    <p className="flex justify-center col-span-1 sm:col-span-4 text-sm sm:text-md leading-tight mt-4 text-center">
                      Upload an image of a product or provide a product URL to
                      find visually similar products.
                    </p>

                    {/* Image 1 */}
                    <img
                      src="https://cdn.usegalileo.ai/sdxl10/763fd1cc-95f6-43bd-a7fa-a72c2b2cc04c.png"
                      className="w-full sm:col-start-1 sm:col-span-2 mt-4 rounded-xl bg-slate-600"
                      alt="Product 1"
                    />

                    {/* Image 2 */}
                    <img
                      src="https://cdn.usegalileo.ai/sdxl10/1dad029b-2865-40b4-9352-8193382b45eb.png"
                      className="w-full h-auto hidden sm:block sm:col-start-3 sm:col-span-2 mt-4 rounded-xl bg-pink-400"
                      alt="Product 2"
                    />

                    {/* File Input */}
                    <label
                      htmlFor="image_url"
                      className="bg-zinc-300 col-start-1 col-span-1 sm:col-span-2 mt-4 p-3 rounded-md sm:p-3 font-semibold"
                    >
                      <input
                        type="file"
                        id="image_url"
                        accept="image/*"
                        onChange={(e) =>
                          setFieldValue("image_url", e.target.files[0])
                        }
                      />
                      Browse files
                    </label>
                    {/* Error message for image_url */}
                    <ErrorMessage
                      name="image_url"
                      component="div"
                      className="text-red-500 text-sm mt-2"
                    />

                    {/* Product URL Input */}
                    <div className="col-start-1 col-span-1 sm:col-span-2 mt-4">
                      <Field
                        type="text"
                        id="product_url"
                        name="product_url"
                        placeholder="Enter product URL"
                        className="w-full p-3 rounded-md border-2 border-gray-300"
                      />
                      <ErrorMessage
                        name="product_url"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>

                    {/* General Error */}
                    {errors.general && touched.general && (
                      <div className="text-red-500 text-sm mt-2">
                        {errors.general}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="col-start-1 col-span-1 sm:col-span-2 bg-blue-500 rounded-md p-2 mt-4"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          // New Page after submission (Conditional Rendering)
          <div className="container flex justify-center mt-8 px-4 sm:px-6 lg:px-8">
            <div className="h-max w-full sm:w-10/12 lg:w-7/12 grid grid-cols-1 sm:grid-cols-4 gap-4 py-12">
              {/* New Content Page */}
              <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl flex justify-center col-span-1 sm:col-start-2 sm:col-span-2">
                Form Submitted Successfully!
              </h1>
              <p className="flex justify-center col-span-1 sm:col-span-4 text-sm sm:text-md leading-tight mt-4 text-center">
                Your form has been successfully submitted. We will process the information shortly.
              </p>

              {/* Optionally, add additional buttons or actions here */}
              <button
                onClick={() => setFormSubmitted(false)}
                className="col-start-1 col-span-1 sm:col-span-2 bg-green-500 rounded-md p-2 mt-4"
              >
                Submit Another Form
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  export default Home;
