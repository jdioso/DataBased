import React, { useState } from "react";

export function useForm(initialFormData) {
   const [formData, setFormData] = useState(initialFormData);
   const [errors, setErrors] = useState({});

   // handles input changes
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const resetForm = () => {
      setFormData(initialFormData);
      setErrors({});
   };
   return [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ];
}
