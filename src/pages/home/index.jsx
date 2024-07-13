import { useEffect } from "react";
import { getAllSections } from "../../server/api";
import { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const fetchAllSections = async () => {
    const response = await getAllSections();
    setData(response.data);
  };
  useEffect(() => {
    fetchAllSections();
  }, []);
  const navigate = useNavigate();
  const handleNavigateDetails = (id) => {
    navigate(`/details/${id}`);
  };
  return (
    <div className="wrapper">
      {data
        .filter((item) => item.isMainTask === true)
        .map((item) => {
          return (
            <div key={item.id} className="container">
              <div className="content">
                <p>
                  <strong
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNavigateDetails(item.id)}
                  >
                    sectionName:{" "}
                  </strong>
                  {item.sectionName}
                </p>
                <p>
                  <strong>Duration: </strong>
                  {item.duration}
                </p>
                <p>
                  <strong>Image: </strong>
                  {item.image}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
