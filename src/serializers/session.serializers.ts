import * as yup from "yup"



export const userLoginSerializer= yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });