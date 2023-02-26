import { useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  getWelcomeModalStatus,
  updateWelcomeModal,
} from "../../gql/welcomeModalStatus";
import { CurrentUser } from "../../store/slices/authSlice";
import TransitionsModal from "../Dashboard/Modal";

type Props = {
  currentUser: Partial<CurrentUser>;
  confirm: () => void;
};

function WelcomeModal({ currentUser, confirm }: Props) {
  const [mutateFunction] = useMutation(updateWelcomeModal, {
    refetchQueries: [{ query: getWelcomeModalStatus }, "getWelcomeModalStatus"],
  });

  const updateWelcomeModalStatus = async () => {
    await mutateFunction({
      variables: {
        userName: currentUser.userName,
        welcomeModalSeen: false,
      },
    });
    confirm();
  };

  return (
    <TransitionsModal open={true}>
      <Typography
        variant="h4"
        sx={{
          textTransform: "capitalize",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        Welcome to EasyBank {currentUser.name}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        We're glad you have decided to join us.
      </Typography>
      <Typography variant="body1">
        We want to make your onboarding experience free of worry. Feel free to
        send us an email if you have any questions at any point in time. We also
        recommend checking out these resources to get you off the ground: <br />
        You can also reach out to us through our live chat here or by calling us
        at +91 8888888888. We look forward to hearing from you! <br />
        EasyBank
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
        <Button variant="contained" onClick={updateWelcomeModalStatus}>
          Ok
        </Button>
      </Box>
    </TransitionsModal>
  );
}

export default WelcomeModal;
