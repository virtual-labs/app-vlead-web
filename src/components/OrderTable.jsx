// not in use

import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { ExperimentCard } from "./ExperimentCard.jsx";
import { bulma_component } from "yatharth-super-lemon";
// import { Icon } from "astro-icon";
import Fuse from "fuse.js";
import Loader from "./loader.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

const uniques = (myArray) =>
  myArray.filter((value, index, array) => array.indexOf(value) === index);

const RenderFilters = ({
  dispCategories,
  labCategories,
  setDiscipline,
  setLab,
}) => {
  const [categoryValue, setCategoryValue] = React.useState(
    sessionStorage.getItem("selectedCard")
  );
  const [labValue, setLabValue] = React.useState(null);
  return (
    <React.Fragment>
      <FormControl size="sm">
        {/* <FormLabel>Discipline</FormLabel> */}
        <Box sx={{ width: "300px" }}>
          <Select
            value={categoryValue}
            onChange={(e, newValue) => {
              setDiscipline(newValue);
              setCategoryValue(newValue);
            }}
            placeholder="Filter on discipline..."
            {...(categoryValue && {
              endDecorator: (
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setCategoryValue(null);
                    setDiscipline("not available");
                  }}
                >
                  <CloseRounded />
                </IconButton>
              ),
              indicator: null,
            })}
            sx={{ minWidth: 160 }}
          >
            {dispCategories.map((category, i) => {
              return (
                <Option value={category} key={i}>
                  {category}
                </Option>
              );
            })}
          </Select>
        </Box>
      </FormControl>

      <FormControl size="sm">
        {/* <FormLabel>Lab</FormLabel> */}
        <Box sx={{ width: "300px" }}>
          <Select
            value={labValue}
            onChange={(e, newValue) => {
              setLab(newValue);
              setLabValue(newValue);
            }}
            placeholder="Filter on Lab..."
            {...(labValue && {
              // display the button and remove select indicator
              // when user has selected a value
              endDecorator: (
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onMouseDown={(event) => {
                    // don't open the popup when clicking on this button
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setLabValue(null);
                    setLab(null);
                  }}
                >
                  <CloseRounded />
                </IconButton>
              ),
              indicator: null,
            })}
            sx={{ minWidth: 160 }}
          >
            {labCategories.map((category, i) => {
              return (
                <Option value={category} key={i}>
                  {category}
                </Option>
              );
            })}
          </Select>
        </Box>
      </FormControl>
    </React.Fragment>
  );
};

// @ts-ignore
export default function OrderTable(props) {
  const [experiments, setExperiments] = React.useState([]);
  const [discipline, setDiscipline] = React.useState(null);
  const [lab, setLab] = React.useState(null);
  const [loaded1, setLoaded1] = React.useState(false);

  const [results, setResults] = React.useState([]);

  const cardsPerIndex = 20;
  const [maxIndex, setMaxIndex] = React.useState(
    Math.ceil(props.experiments.length / cardsPerIndex)
  );
  const [pageIndex, setPageIndex] = React.useState(-1);
  const [paginated, setPaginated] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    AOS.init();
    sessionStorage.getItem("selectedCard") !== null
      ? setDiscipline(sessionStorage.getItem("selectedCard"))
      : setDiscipline("not available");
    if (sessionStorage.getItem("search") === null) {
    } else {
      setSearchQuery(sessionStorage?.getItem("search"));
    }
    setExperiments(props.experiments);
  }, []);

  React.useEffect(() => {
    setResults(experiments);
  }, [experiments]);

  const options = {
    includeScore: false,
    keys: ["Experiment Name"],
  };

  const fuse = new Fuse(experiments, options);

  React.useEffect(() => {
    let newData = fuse.search(searchQuery).map((d) => d.item);
    if (!searchQuery) newData = experiments;
    let all = uniques(experiments.map((e) => e["Discipline Name"]));
    if (all.includes(discipline) || discipline === "not available") {
      let filtered;
      filtered = newData
        .filter((d) =>
          discipline !== "not available" ? d["Discipline Name"] === discipline : true
        )
        .filter((d) => (lab ? d["Lab Name"] === lab : true));
      // @ts-ignore
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery, discipline, lab]);

  function nextIndex() {
    setPageIndex((pIndex) => {
      if (pIndex + 1 < maxIndex) return pIndex + 1;
      return pIndex;
    });
  }

  function previousIndex() {
    setPageIndex((pIndex) => {
      if (pIndex - 1 >= 0) return pIndex - 1;
      return pIndex;
    });
  }

  function setParticularIndex(i) {
    if (i >= 0 && i < maxIndex) setPageIndex((p) => i);
    return;
  }

  React.useEffect(() => {
    setPageIndex(0);
    setMaxIndex(Math.ceil(results.length / cardsPerIndex));
  }, [results]);

  React.useEffect(() => {
    setPaginated((p) =>
      results.slice(pageIndex * cardsPerIndex, (pageIndex + 1) * cardsPerIndex)
    );
    setLoaded1(true);
  }, [results, pageIndex]);

  return loaded1 ? (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          value={sessionStorage.getItem("search")}
          defaultValue={sessionStorage.getItem("search")}
          startDecorator={<i data-feather="search" />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          {/* <i data-feather="moon"></i> */}
          {/* <Icon data-feather="filter" /> */}
          {/* <Icon name="feather:filter"/> */}
          <p>filter</p>
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <RenderFilters
                dispCategories={uniques(
                  experiments.map((e) => e["Discipline Name"])
                )}
                labCategories={uniques(experiments.map((e) => e["Lab Name"]))}
                setDiscipline={setDiscipline}
                setLab={setLab}
                domain={props.domain}
              />
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: {
            xs: "none",
            sm: "flex",
          },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: {
              xs: "120px",
              md: "160px",
            },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          {/* <FormLabel className="text theme" size="md">Search for Experiments</FormLabel> */}
          <Input
            placeholder="Search"
            value={sessionStorage.getItem("search")}
            startDecorator={<i data-feather="search" />}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              sessionStorage.setItem("search", event.target.value);
            }}
          />
        </FormControl>

        <RenderFilters
          dispCategories={uniques(experiments.map((e) => e["Discipline Name"]))}
          labCategories={uniques(experiments.map((e) => e["Lab Name"]))}
          setDiscipline={setDiscipline}
          setLab={setLab}
          domain={props.domain}
        />
      </Box>

      <Grid container spacing={2} style={{display: "flex", justifyContent: "center", alignItems: "center"  }}>
        
        {paginated.length > 0 ?(
          // @ts-ignore
          paginated.map((experiment, i) => {
            return (
              <Grid
                xs={6}
                md={3}
                key={i}
                data-aos="zoom-in-up"
                data-aos-delay={(i % 4) * 100}
              >
                <ExperimentCard data={experiment} />
                {/* <bulma_component/> */}
              </Grid>
            );
          })
        ):(
          discipline !== "not available" ? (
        <div style={{ height: "100vh", display:"flex", justifyContent: "center", alignItems: "center"}}>
        <h1 style={{fontSize: "3rem"}}> <b>No Results Found</b></h1>
      </div>):(<></>))}
      </Grid>

      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={previousIndex}
          disabled={pageIndex === 0}
        >
          <i data-feather="arrow-left" />
        </IconButton>
        <Typography className="text theme" level="body2" mx="auto">
          Page {pageIndex + 1} of {maxIndex}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={nextIndex}
          disabled={pageIndex + 1 === maxIndex}
        >
          <i data-feather="arrow-right" />
        </IconButton>
      </Box>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 4,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="plain"
          color="neutral"
          startDecorator={<i data-feather="arrow-left" />}
          onClick={previousIndex}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {/* {
          [...Array(maxIndex).keys()].map((index) => (
            <IconButton
              key={index}
              size="sm"
              variant="outlined"
              color="neutral"
              disabled={pageIndex === index}
              onClick={() => setParticularIndex(index)}
            >
              {index + 1}
            </IconButton>
          ))
        } */}

        <Typography className="text theme" level="body2" mx="auto">
          Page {pageIndex + 1} of {maxIndex}
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="plain"
          color="neutral"
          endDecorator={<i data-feather="arrow-right" />}
          onClick={nextIndex}
          disabled={pageIndex + 1 === maxIndex}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader />
    </div>
  );
}
