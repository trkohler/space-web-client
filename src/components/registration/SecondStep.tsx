import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  spaceName: string;
};

export const SecondStep = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // persist spaceName in local storage
    const { spaceName } = data;
    localStorage.setItem("spaceName", spaceName);
    navigate("/admin", { state: { from: "/registration/second" }})
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
