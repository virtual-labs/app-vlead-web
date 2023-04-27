import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import useScript from "./useScript";
import OrderTable from "./OrderTable";
import ColorSchemeToggle from "./ColorSchemeToggle";
import Divider from "@mui/joy/Divider";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SearchIcon from '@mui/icons-material/Search';
// import customTheme from "./theme";
// import Intro from "./components/intro";
// import './css/intro.css';

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate(props) {
  const status = useScript(`https://unpkg.com/feather-icons`);
  const [index, setIndex] = React.useState(2);
  const [experiments, setExperiments] = React.useState([]);
  const [results, setResults] = React.useState([]);

  useEnhancedEffect(() => {
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  React.useEffect(() => {
    fetch('https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items')
      .then(resp => resp.json())
      .then(data => {

      setExperiments(data);
    })
  }, []);

  function filterData() {
    if (index === 0) {
      let historyStack = localStorage.getItem('history');
      if (!historyStack)
        return [];
      historyStack = JSON.parse(historyStack);
      historyStack.reverse();
      return historyStack;
    } else if (index === 1) {
      return [];
    } else if (index === 2) {
      return experiments;
    }
  }

  React.useEffect(() => {
    setResults(filterData());
  }, [experiments, index]);

  return (
    <CssVarsProvider disableTransitionOnChange > 
    {/* theme={customTheme} */}
      <GlobalStyles
        styles={{
          "[data-feather], .feather": {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            width: "1em",
            height: "1em"
          },
          "[data-openmoji], .openmoji": {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            width: "1em",
            height: "1em"
          }
        }}
      />
      <CssBaseline />
      <Box sx={{display: "flex" }}>
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            px: { xs: 2, md: 6 },
            pt: { xs: 3, sm: 3, md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            gap: 1
          })}
        >
          <Box sx={{
            marginTop: { xs: '0', md: '-1vh' },
          }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                my: 1,
                gap: 2,
                flexWrap: "wrap",
                "& > *": {
                  // minWidth: "clamp(0px, (500px - 100%) * 999, 100%)",
                  // flexGrow: 1
                }
              }}
            >
            </Box>
            <OrderTable experiments={results} key={results}/>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
    
  );
}