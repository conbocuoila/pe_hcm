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
import { updateSection } from "../../server/api";
import { useEffect, useState } from "react";
import { getSectionDetails } from "../../server/api";
import { useNavigate, useParams } from "react-router-dom";
const Update = () => {
  const { id } = useParams();
  const [value, setValue] = useState({});
  const fetchGetSectionDetailID = async () => {
    const response = await getSectionDetails(id);
    setValue(response.data);
  };
  useEffect(() => {
    fetchGetSectionDetailID();
  }, []);
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
  const handleUpdate = async () => {
    await updateSection(id, value);
    // await addNewSection(value);
    navigate("/dashboard");
  };
  return (
    <div style={{ margin: "20px 300px" }}>
      <FormGroup sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h4">Update Section</Typography>
        <FormControl>
          <InputLabel shrink>Section Name</InputLabel>
          <Input
            value={value.sectionName}
            onChange={(e) => onValueChange(e)}
            name="sectionName"
          />
          {errors.sectionName && (
            <Typography color="error">{errors.sectionName}</Typography>
          )}
        </FormControl>

        <FormControl>
          <InputLabel shrink>Duration</InputLabel>
          <Input
            value={value.duration}
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
              <Switch
                checked={value.isMainTask === true}
                value={value.isMainTask}
                onChange={(e) => onValueChange(e)}
                name="isMainTask"
              />
            }
            label="Is MainTask?"
          />
        </FormControl>

        <FormControl>
          <InputLabel shrink>Image</InputLabel>
          <Input
            value={value.image}
            onChange={(e) => onValueChange(e)}
            name="image"
          />
          {errors.image && (
            <Typography color="error">{errors.image}</Typography>
          )}
        </FormControl>

        <FormControl>
          <InputLabel shrink>Section Description</InputLabel>
          <Input
            value={value.sectionDescription}
            onChange={(e) => onValueChange(e)}
            name="sectionDescription"
          />
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
            onClick={handleUpdate}
            variant="contained"
          >
            Update
          </Button>
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default Update;
