import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { FloorPlan } from "../components/FloorPlan";
import { BookingForm } from "../components/BookingForm";
import { faker } from "@faker-js/faker";
import { Layout } from "../components/Layout";

const queryPlanAndResources = loader("../queries/getPlanAndResources.gql");

type Resource = {
  id: number;
  booked: boolean;
  x: number;
  y: number;
  name: string | null;
  team: string | null;
};

export const EmployeePage = () => {
  let [coordinates, setCoordinates] = useState<Resource[]>([]);
  let [bookingId, setBookingId] = useState<number | null>(null);
  let [confirmedBooking, setConfirmedBooking] = useState<Resource | null>(null);
  let { data } = useQuery(queryPlanAndResources);

  useEffect(() => {
    if (data) {
      const queryCoordinates = data.plan.resources.map((resource: any) => {
        const booked = Math.random() < 0.5;
        const name = faker.person.fullName();
        const team = faker.word.noun();
        return {
          id: genRandomId(),
          booked,
          x: resource.coordinate.x,
          y: resource.coordinate.y,
          name: booked ? name : null,
          team: booked ? team : null,
        };
      });
      setCoordinates(queryCoordinates);
    }
  }, [data]);

  return (
    <Layout>
      <FloorPlan coordinates={coordinates} setBookingId={setBookingId} />
      <BookingForm
        bookingId={bookingId}
        coordinates={coordinates}
        setConfirmedBooking={setConfirmedBooking}
        setCoordinates={setCoordinates}
      />
      {confirmedBooking && (
        <div>
          <h2>Booking confirmed!</h2>
        </div>
      )}
    </Layout>
  );
};
function genRandomId() {
  return Math.floor(Math.random() * 10000000);
}
