import React, { useState } from "react";
import plan from "./plan.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [coordinates, setCoordinates] = useState<{ x: number; y: number }[]>([]);

  async function recordCoordinates(e: React.MouseEvent<HTMLImageElement>) {
    // @ts-ignore
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top; //y position within the element.
    console.log("X? : " + x + " ; Y? : " + y + ".");
    setCoordinates([...coordinates, { x, y }]);
  }

  console.log(coordinates);
  return (
    <div className="App">
      <map name="plan">
        {coordinates.map((coordinate, index) => (
          <area
            key={index}
            shape="circle"
            coords={`${coordinate.x},${coordinate.y},10`}
            href="https://www.google.com/"
            target="_blank"
            alt="test"
          /> // they are not visible, but they are clickable
        ))}
      </map>
      <div
        style={{
          position: "relative",
          width: "1000px",
        }}
      >
        {coordinates.map((coordinate) => (
          <aside
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
    </div>
  );
}

export default App;
