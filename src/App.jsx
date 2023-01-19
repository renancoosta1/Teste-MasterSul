import WaterPage from "./Components/WaterPage";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import Payments from "./Components/Payments";
import 'devextreme/dist/css/dx.light.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <header>
        <div className="bg-blue-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">
            Projeto teste Mastersul
          </h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Teste de Lógica Booleana" {...a11yProps(0)} />
                <Tab label="Teste de Lógica de Programação" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <WaterPage />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Payments />
            </TabPanel>
          </Box>
        </div>
      </main>
    </div>
  )
}
