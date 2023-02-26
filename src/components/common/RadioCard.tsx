import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RadioCardItem } from "../../types/RadioCardItem";

type props = {
  item: RadioCardItem;
  handleRadioSelect: (item: RadioCardItem) => void;
};

export default function RadioCard({ item, handleRadioSelect }: props) {
  return (
    <Card
      sx={{
        width: "100%",
        cursor: "pointer",
        ...(item.selected && {
          backgroundColor: "#2196f3",
          color: "#fff",
        }),
      }}
      onClick={() => handleRadioSelect(item)}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {item.name}
        </Typography>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
    </Card>
  );
}
