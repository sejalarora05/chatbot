import * as yup from "yup";

export const validationsForm = {
  employeeid: yup.string().required("Employee ID is Required"),
  experience: yup.string().required("Experience is Required"),
  techstack: yup.string().required("Tech Stack is Required"),
  topics: yup.string().required("Topics are Required"),
  username: yup.string().required("Topics are Required"),
  name: yup.string().required("Topics are Required"),
  time: yup.string().required("Topics are Required"),
};

export const TechnicalForm = {
  employeeid: yup.string().required("Employee ID is Required"),
  experience: yup.string().required("Experience is Required"),
  techstack: yup.string().required("Tech Stack is Required"),
  topics: yup.string().required("Topics are Required"),
};

