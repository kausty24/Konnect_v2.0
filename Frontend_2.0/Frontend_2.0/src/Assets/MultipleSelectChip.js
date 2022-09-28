import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(service, serviceName, theme) {
  return {
    fontWeight:
      serviceName.indexOf(service) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  vendorServices,
  setSelectedServiceArr,
  editToggle,
  setFormEdited,
}) {
  const theme = useTheme();
  const [serviceName, setServiceName] = React.useState([]);
  const [services, setServices] = React.useState([]);

  const handleChange = (event) => {
    setFormEdited(true);
    const {
      target: { value },
    } = event;
    setServiceName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedServiceArr(typeof value === "string" ? value.split(",") : value);
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/reg/list")
      .then((response) => setServices(response.data))
      .catch((err) => console.log(err));
    var vendorServiceArr = vendorServices.map((service) => {
      return service["serviceType"];
    });
    setServiceName(vendorServiceArr);
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, width: "auto" }} disabled={editToggle}>
        <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={serviceName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Services" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {services.map((service) => (
            <MenuItem
              key={service}
              value={service}
              style={getStyles(service, serviceName, theme)}
            >
              {service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
