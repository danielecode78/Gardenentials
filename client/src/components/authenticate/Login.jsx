import apiClient from "@/utils/apiClient";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useGardenContext } from "@/structure/GardenProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setSnackbar } = useGardenContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await apiClient
      .post("/login", data)
      .then((res) => {
        setUser(res.data.user);
        navigate("/");
        setSnackbar({
          open: true,
          message: "Login avvenuto con successo!",
          severity: "success",
        });
      })
      .catch((err) => {
        const dataError = err.response?.data;
        console.log("Status code:", dataError?.statusCode);
        console.log("Messaggio:", dataError?.message);
        console.log("Stack:", dataError?.stack);
      });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        border: 1,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        borderRadius: "4px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Accedi
        </Typography>
        <Typography variant="body2" align="center">
          Benvenuto! Inserisci le tue credenziali per continuare.
        </Typography>

        <TextField
          label="Nome utente"
          placeholder="Inserisci il tuo nome utente"
          fullWidth
          autoFocus
          type="text"
          {...register("username", { required: "Campo obbligatorio" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          placeholder="Inserisci la tua password"
          fullWidth
          autoFocus
          type="password"
          {...register("password", { required: "Campo obbligatorio" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" fullWidth>
          Accedi
        </Button>
      </Box>
    </Container>
  );
}
