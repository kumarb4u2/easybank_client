import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Account } from "../../types/account.type";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Transactions from "../common/Transactions";

export const AccountList = ({
  accounts,
  handleSeeMore,
  expandedIndex,
}: {
  accounts: Account[];
  handleSeeMore?: (index: number) => void;
  expandedIndex?: number;
}) => {
  return (
    <Box>
      <Typography variant="h6" marginBottom={5}>
        Expand below option to see more details
      </Typography>
      {accounts.map((account, index) => (
        <Accordion
          key={account.accountNumber}
          defaultExpanded={index === expandedIndex}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <span style={{ fontWeight: "bold" }}>Account number: </span>
              {account.accountNumber}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Type: {account.accountType}</Typography>
              <Typography variant="h6">
                Balance: {account.balance ? account.balance : 0}
              </Typography>
            </Box>
            {account.transactions?.length > 0 && (
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
                <Transactions transactions={account.transactions} />
              </Box>
            )}
            {handleSeeMore && (
              <Button
                sx={{
                  textTransform: "capitalize",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  handleSeeMore(index);
                }}
              >
                See more
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
