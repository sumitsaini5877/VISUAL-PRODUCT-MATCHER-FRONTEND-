import { Form, Formik } from "formik"


function Category() {
  return (
    <>
    <Formik>
        <Form>
            <h1>Add Category</h1>
            <div>
                <label htmlFor="">Category Name </label>
                
            </div>
        </Form>
    </Formik>
    </>
  )
}

export default Category