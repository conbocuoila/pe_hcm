import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  //   MenuItem,
  //   Select,
  Switch,
  Typography,
} from "@mui/material";
import { addNewSection } from "../../server/api";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
const Add = () => {
  const [value, setValue] = useState({});
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const onValueChange = (e) => {
    const { name, type, checked } = e.target;
      if (type === "checkbox") {
        // Handle Switch component
        setValue({ ...value, [name]: checked });
      } else {
      const { name, value: inputValue } = e.target;
      setValue({ ...value, [name]: inputValue });
      switch (name) {
        case "sectionName":
          if (!inputValue) {
            setErrors({ ...errors, sectionName: "sectionName is required" });
          } else if (inputValue.trim().split(" ").length < 3) {
            setErrors({
              ...errors,
              sectionName: "Name must be more than 2 words",
            });
          } else {
            setErrors({ ...errors, sectionName: null });
          }
          break;
        case "duration":
          if (!inputValue) {
            setErrors({ ...errors, duration: "duration is required" });
          } else {
            setErrors({ ...errors, duration: null });
          }
          break;
        //   case "isMainTask":
        //     if (!inputValue) {
        //       setErrors({ ...errors, isMainTask: "isMainTask is required" });
        //     } else {
        //       setErrors({ ...errors, isMainTask: null });
        //     }
        //     break;

        case "image":
          if (!inputValue) {
            setErrors({ ...errors, image: "image is required" });
          } else if (!inputValue.match(/^https?:\/\/.+/)) {
            setErrors({ ...errors, image: "image must be a valid URL" });
          } else {
            setErrors({ ...errors, image: null });
          }
          break;
        case "sectionDescription":
          if (!inputValue) {
            setErrors({
              ...errors,
              sectionDescription: "sectionDescription is required",
            });
          } else {
            setErrors({ ...errors, sectionDescription: null });
          }
          break;
        default:
          if (!inputValue) {
            setErrors({ ...errors, [name]: "This field is required" });
          } else {
            setErrors({ ...errors, [name]: null });
          }
      }
    }
  };
  const handleAdd = async () => {
    await addNewSection(value);
    navigate("/dashboard");
  };
  return (
    <div style={{ margin: "20px 300px" }}>
      <FormGroup sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h4">Add Section</Typography>
        <FormControl>
          <InputLabel>Section Name</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="sectionName" />
          {errors.sectionName && (
            <Typography color="error">{errors.sectionName}</Typography>
          )}
        </FormControl>

        <FormControl>
          <InputLabel>Duration</InputLabel>
          <Input
            type="number"
            onChange={(e) => onValueChange(e)}
            name="duration"
          />
          {errors.duration && (
            <Typography color="error">{errors.duration}</Typography>
          )}
        </FormControl>

        <FormControl>
          <FormControlLabel
            control={
              <Switch onChange={(e) => onValueChange(e)} name="isMainTask" />
            }
            label="Is MainTask?"
          />
        </FormControl>

        <FormControl>
          <InputLabel>Image</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="image" />
          {errors.image && (
            <Typography color="error">{errors.image}</Typography>
          )}
        </FormControl>

        <FormControl>
          <InputLabel>Section Description</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="sectionDescription" />
          {errors.sectionDescription && (
            <Typography color="error">{errors.sectionDescription}</Typography>
          )}
        </FormControl>

        <FormControl>
          <Button
            // disabled={
            //   Object.keys(value).length !== 5 ||
            //   Object.values(errors).some((error) => error !== null)
            // }
            disabled={
              Object.values(errors).some((error) => error !== null) ||
              !value.sectionName ||
              !value.duration ||
              !value.image ||
              !value.sectionDescription
            }
            onClick={handleAdd}
            variant="contained"
          >
            Add
          </Button>
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default Add;
