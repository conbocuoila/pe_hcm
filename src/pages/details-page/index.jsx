import { useParams } from "react-router-dom";
import { getSectionDetails } from "../../server/api";
import { useEffect, useState } from "react";
import "./index.scss";
const Details = () => {
  const { id } = useParams();
  const [value, setValue] = useState({});
  const fetchDataDetails = async () => {
    const response = await getSectionDetails(id);
    setValue(response.data);
  };
  useEffect(() => {
    fetchDataDetails();
  }, []);
  return (
    <div className="wrapper__details">
      <div className="container">
        <div className="content">
          <p>
            <strong>sectionName: </strong>
            {value.sectionName}
          </p>
          <p>
            <strong>sectionDescription: </strong>
            {value.sectionDescription}
          </p>
          <p>
            <strong>duration: </strong>
            {value.duration}
          </p>
          <img src={value.image} width={200} />
          <div
            style={{
              width: "500px",
              display: "flex",
              justifyContent: "center",
            }}
            className="wrapper__gift"
          >
            {value.isMainTask ? (
              <div
                style={{
                  width: "200px",
                  height: "40px",
                  background: "#ccc",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="rippon"
              >
                <strong>Main Task</strong>
              </div>
            ) : (
              <p>
                <strong>isMainTask: </strong>false
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
