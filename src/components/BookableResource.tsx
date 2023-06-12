import { faCircle, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookableResource = {
  Admin: (coordinate: { x: number; y: number }) => {
    return (
      <aside
        key={coordinate.x + coordinate.y}
        style={{
          position: "absolute",
          left: coordinate.x - 10,
          top: coordinate.y - 10,
          textAlign: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faCircle}
          style={{
            color: "red",
            opacity: 0.2,
            position: "relative",
            top: "calc(50% - 10px)",
          }}
        />
      </aside>
    );
  },

  User: ({ coordinate, handleIconClick }) => {
    return (
      <aside
        key={coordinate.x + coordinate.y}
        style={{
          position: "absolute",
          left: coordinate.x - 10,
          top: coordinate.y - 40,
          textAlign: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faLocationDot}
          style={{
            fontSize: "40px",
            color: coordinate.booked ? "red" : "lightgreen",
            position: "relative",
            top: "calc(50% - 10px)",
          }}
          onClick={(e) => handleIconClick(e, coordinate.id)}
        />
      </aside>
    );
  },
};

export default BookableResource;
