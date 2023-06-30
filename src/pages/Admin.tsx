import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { loader } from "graphql.macro";
import { FloorPlan } from "../components/FloorPlan";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/auth";
import { AuthContext } from "..";

const deleteResourceMutation = loader("../queries/deleteResource.gql");
const queryPlanAndResources = loader("../queries/getPlanAndResources.gql");

export const AdminPage = () => {
  const { profile } = useAuth();

  let [coordinates, setCoordinates] = useState<{ x: number; y: number }[]>([]);
  let { data } = useQuery(queryPlanAndResources);

  useEffect(() => {
    if (data) {
      const queryCoordinates = data.plan.resources.map((resource: any) => {
        return {
          x: resource.coordinate.x,
          y: resource.coordinate.y,
        };
      });
      setCoordinates(queryCoordinates);
    }
  }, [data]);

  const [deleteResource] = useMutation(deleteResourceMutation);

  async function deleteLastMark(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const lastCoordinate = coordinates[coordinates.length - 1];
    deleteResource({
      variables: { planId: 1, x: lastCoordinate.x, y: lastCoordinate.y },
    }).catch((err) => console.log(err));
    setCoordinates(coordinates.slice(0, -1));
  }

  return (
    <Layout>
      {profile && (
        <div>
          <h1>Admin Page</h1>
          <p>Hi {profile.displayName}!</p>
        </div>
      )}
      <FloorPlan.Admin
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
      <button onClick={deleteLastMark}>Click me to remove last mark</button>
    </Layout>
  );
};
