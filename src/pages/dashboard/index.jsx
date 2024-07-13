import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAllSections } from "../../server/api";
import { deleteSection } from "../../server/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { toast } from "react-toastify";
const Dashboard = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [staffIdToDelete, setStaffIdToDelete] = useState(null);
  const [dataSections, setDataSections] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await getAllSections();
    setDataSections(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleNavigateAdd = () => {
    navigate("/add");
  };
  const handleNavigateUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async (id) => {
    setStaffIdToDelete(id);
    setShowConfirm(true);
  };
  const handleConfirmDelete = async () => {
    await deleteSection(staffIdToDelete);
    setDataSections(dataSections.filter((item) => item.id !== staffIdToDelete));
    setShowConfirm(false);
    toast.success("Delete successfully!!");
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };
  return (
    <div className="wrapper__dashboard">
      {" "}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        className="button__add"
      >
        <Button onClick={handleNavigateAdd} variant="contained">
          Add new section
        </Button>
      </div>
      <div style={{ margin: "20px 0px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ccc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>sectionName</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>duration</TableCell>
              <TableCell sx={{ fontWeight: "600" }}> isMainTask</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>image</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                sectionDescription
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSections.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.sectionName}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.isMainTask ? "true" : "false"}</TableCell>
                  <TableCell>{item.image}</TableCell>
                  <TableCell>{item.sectionDescription}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant="contained"
                        color="secondary"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleNavigateUpdate(item.id)}
                        variant="contained"
                      >
                        Update
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className={`box-confirm ${showConfirm ? "active" : ""}`}>
        {showConfirm && (
          <div className="content-main">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this staff member?</p>
            <div>
              <Button onClick={handleConfirmDelete}>Yes, delete</Button>
              <Button onClick={handleCancelDelete}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
