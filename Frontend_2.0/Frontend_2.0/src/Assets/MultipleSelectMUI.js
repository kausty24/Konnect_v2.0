import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios'

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



export default function MultipleSelectCheckmarks({ vendorServices, editToggle, setSelectedServiceArr }) {


  const [serviceName, setServiceName] = React.useState([]);
  const [services, setServices] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setServiceName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setSelectedServiceArr(
        typeof value === 'string' ? value.split(',') : value,
    );
  };

  React.useEffect(()=> {
    axios.get("http://localhost:8080/reg/list").then(response=> setServices(response.data)).catch(err=> console.log(err));
    var vendorServiceArr = vendorServices.map(service => {return service["serviceType"]})
    setServiceName(vendorServiceArr);
}, [])

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} disabled={editToggle}>
        <InputLabel id="demo-multiple-checkbox-label">Services</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={serviceName}
          onChange={handleChange}
          input={<OutlinedInput label="Services" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {services.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={serviceName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}