import { withFormik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';

const RegForm = ({errors, touched}) => {
    return(
        <Form>
            <div>
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field name='username' type='text' placeholder='Username' />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field name='password' type='password' placeholder='Password' />
            </div>
            <button type='submit'>Register!</button>
        </Form>
    )
}

const FormikRegForm = withFormik({

    mapPropsToValues({ username, password }) {
        return{
            username: username || "",
            password: password || ""
        }
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .min(8, "Your username must contain at least 8 characters.")
            .required("This field is required."),
        password: Yup.string()
            .min(6, "Your password must contain at least 6 characters.")
            .required("This field is required.")
    }),

    handleSubmit(values){
        axios
            .post("http://localhost:5000/api/register", values)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

})(RegForm);

export default FormikRegForm;