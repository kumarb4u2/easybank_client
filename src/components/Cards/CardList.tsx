import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card } from "../../types/card.type";
import { CARD_TYPE } from "../../utils/constants";
import Transactions from "../common/Transactions";

export const CardList = ({ cards }: { cards: Card[] }) => {
  return (
    <Box>
      <Typography variant="h6" marginBottom={5}>
        Expand below option to see more details
      </Typography>
      {cards.map((card, index) => (
        <Accordion key={card.cardNumber} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <span style={{ fontWeight: "bold" }}>Card number: </span>
              {card.cardNumber}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h6">
                  Type:{" "}
                  <Typography
                    variant="inherit"
                    sx={{
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    {card.cardCategory ? card.cardCategory : "Debit"}
                  </Typography>
                </Typography>
                <Typography variant="h6">
                  Annual charges:{" "}
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    {card.annualCharges ? card.annualCharges : 0}
                  </Typography>
                </Typography>
              </Box>
              {CARD_TYPE.CREDIT === card.cardType && (
                <Typography variant="h6">
                  Limit:{" "}
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    {card.creditLimit ? card.creditLimit : 0}
                  </Typography>
                </Typography>
              )}
            </Box>
            {card.transactions?.length > 0 && (
              <Box
                sx={{ borderTop: "2px solid #333", paddingY: 3, marginTop: 3 }}
              >
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  sx={{ marginBottom: 2 }}
                >
                  Transactions
                </Typography>
                <Transactions transactions={card.transactions} />
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
