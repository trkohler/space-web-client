import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  spaceName: string;
};

export const SecondStep = ({ setSpaceName }) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data) => {
    const { spaceName } = data;
    setSpaceName(spaceName);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="space_name">Space Name</label>
        <input {...register("spaceName")} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
