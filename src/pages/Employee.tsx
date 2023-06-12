import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { FloorPlan } from "../components/FloorPlan";
import { BookingForm } from "../components/BookingForm";

const queryPlanAndResources = loader("../queries/getPlanAndResources.gql");

type Resource = {
  id: number;
  booked: boolean;
  x: number;
  y: number;
};

export const EmployeePage = () => {
  let [coordinates, setCoordinates] = useState<Resource[]>([]);
  let [bookingId, setBookingId] = useState<number | null>(null);
  let { data } = useQuery(queryPlanAndResources);

  useEffect(() => {
    if (data) {
      const queryCoordinates = data.plan.resources.map((resource: any) => {
        return {
          id: genRandomId(),
          booked: false,
          x: resource.coordinate.x,
          y: resource.coordinate.y,
        };
      });
      setCoordinates(queryCoordinates);
    }
  }, [data]);

  return (
    <>
      <FloorPlan coordinates={coordinates} setBookingId={setBookingId} />
      <BookingForm
        bookingId={bookingId}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
    </>
  );
};
function genRandomId() {
  return Math.floor(Math.random() * 10000000);
}
