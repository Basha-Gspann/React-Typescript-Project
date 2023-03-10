import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import candidateJson from "./ResourceDashboard/Candidate.json";
import Pagination from "@mui/material/Pagination";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [rows] = React.useState(candidateJson);

  // Pagination Start

  const [page, setPage] = React.useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const currentData = rows.slice((page - 1) * 5, page * 5);

  // Pagination End

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Accordion</h1>
      {currentData.map((row, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <div style={{ display: "flex" }}>
                <Typography style={{ width: "50%", flexShrink: 0 }}>
                  {row.role}
                </Typography>
                <Typography style={{ width: "50%", flexShrink: 0 }}>
                  {row.skillSet}
                </Typography>
                <Typography style={{ width: "30%", flexShrink: 0 }}>
                  {row.experience}
                </Typography>
                <Typography style={{ width: "40%", color: "textSecondary" }}>
                  {row.location}
                </Typography>
                <div
                  style={{ width: "10%", display: "flex", marginLeft: "3rem" }}
                >
                  <Button variant="outlined" component={Link} to="/login">
                    Edit
                  </Button>
                  <Button variant="outlined" style={{ marginLeft: "25px" }}>
                    View
                  </Button>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{row.location}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}

      <Pagination
        count={Math.ceil(rows.length / 5)} 
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}