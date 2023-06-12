import BookableResource from "./BookableResource";
import plan from "../plan.jpg";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const createBookableResourceMutation = loader("../queries/createResource.gql");

export const FloorPlan = ({ coordinates, setBookingId }) => {
  const handleIconClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    booking_id: number
  ) => {
    e.preventDefault();
    setBookingId(booking_id);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "1000px",
      }}
    >
      {coordinates.map((coordinate) => (
        <BookableResource.User
          coordinate={coordinate}
          handleIconClick={handleIconClick}
        />
      ))}
      <img
        useMap="#plan"
        src={plan}
        alt="plan"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
};

FloorPlan.Admin = ({ coordinates, setCoordinates }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [createResource] = useMutation(createBookableResourceMutation);

  async function recordCoordinates(e: React.MouseEvent<HTMLImageElement>) {
    // @ts-ignore
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top; //y position within the element.
    console.log("X? : " + x + " ; Y? : " + y + ".");
    setCoordinates([...coordinates, { x, y }]);
    createResource({ variables: { planId: 1, x, y } });
  }

  return (
    <div
      style={{
        position: "relative",
        width: "1000px",
      }}
    >
      {coordinates.map((coordinate) => (
        <BookableResource.Admin {...coordinate} />
      ))}

      <img
        useMap="#plan"
        src={plan}
        alt="plan"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        onClick={recordCoordinates}
      />
    </div>
  );
};
