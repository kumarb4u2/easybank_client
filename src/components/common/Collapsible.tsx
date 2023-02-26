import { Fragment, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Button } from "@mui/material";

type DataType = {
  name: string;
  features: string[];
  additionalInfo: string;
};

const Collapsible = ({ data }: { data: DataType }) => {
  const [expand, toggleExpand] = useState(false);
  return (
    <Fragment>
      <Button
        sx={{ paddingLeft: 0, textTransform: "capitalize" }}
        variant="text"
        onClick={() => {
          toggleExpand(!expand);
        }}
      >
        {expand ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        {data.name}
      </Button>
      {expand && (
        <Box>
          <ul>
            {data.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {data.additionalInfo}
        </Box>
      )}
    </Fragment>
  );
};

export default Collapsible;
