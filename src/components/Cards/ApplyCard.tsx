import { useMutation } from "@apollo/client";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { applyCreditCard } from "../../gql/applyCreditCard";
import { getCards } from "../../gql/getCards";
import { useAppSelector } from "../../store/hooks";
import { currentUserSelector, CurrentUser } from "../../store/slices/authSlice";
import { RadioCardItem } from "../../types/RadioCardItem";
import RadioCard from "../common/RadioCard";
import { initialCards } from "./content";

const ApplyCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cards, setCards] = useState<RadioCardItem[]>(initialCards);
  const [error, setError] = useState<Error>();
  const [selectedCardType, setSelectedCardType] = useState("");
  const currentUser: CurrentUser = useAppSelector(currentUserSelector);
  const navigate = useNavigate();

  useEffect(() => {
    // reset card state on re-load
    setCards(
      cards.map((item) => {
        item.selected = false;
        return item;
      })
    );
  }, []);

  const setRadioSelection = (selectedItem: RadioCardItem) => {
    setSelectedCardType(selectedItem.type);
    setCards(
      cards.map((item) => {
        item.selected = item.name === selectedItem.name;
        return item;
      })
    );
  };

  const [mutateFunction] = useMutation(applyCreditCard, {
    refetchQueries: [{ query: getCards }, "getCards"],
  });

  const onSubmit = async (data: any) => {
    try {
      await mutateFunction({
        variables: {
          userName: currentUser.userName,
          cardCategory: selectedCardType,
          income: data?.income,
        },
      });
      navigate("/cards");
    } catch (error: any) {
      error.graphQLErrors.forEach((item: any) => {
        setError(item);
      });
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          borderBottom: "1px solid black",
          paddingBottom: 1,
          marginBottom: 5,
        }}
      >
        Select a card to apply:
      </Typography>
      {error && (
        <Alert sx={{ marginBottom: 3 }} severity="error">
          {error.message}
        </Alert>
      )}

      <Grid container spacing={2}>
        {cards.map((item) => (
          <Grid item xs={12} md={6} key={item.name}>
            <RadioCard item={item} handleRadioSelect={setRadioSelection} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <TextField
            size="small"
            required
            autoComplete="income"
            fullWidth
            id="income"
            label="Income (Yearly)"
            autoFocus
            error={!!errors.income}
            helperText={errors.income && "Enter a valid income."}
            data-testid="income"
            inputProps={{
              maxLength: 30,
            }}
            {...register("income", { required: true, pattern: /\d$/g })}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!selectedCardType}
        >
          Open
        </Button>
      </Box>
    </Box>
  );
};

export default ApplyCard;
