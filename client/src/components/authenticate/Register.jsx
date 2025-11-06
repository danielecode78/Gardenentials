import apiClient from "@/utils/apiClient";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useGardenContext } from "@/structure/GardenProvider";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setSnackbar } = useGardenContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const formValues = watch();

  const onSubmit = async (data) => {
    await apiClient
      .post("/register", data)
      .then((res) => {
        setUser(res.data.user);
        navigate("/");
        setSnackbar({
          open: true,
          message: "Registrazione avvenuta con successo!",
          severity: "success",
        });
      })
      .catch((err) => {
        const dataError = err.response?.data;
        console.log("Status code:", dataError?.statusCode);
        console.log("Messaggio:", dataError?.message);
        console.log("Stack:", dataError?.stack);
        if (
          dataError.message ===
          "A user with the given username is already registered"
        ) {
          setSnackbar({
            open: true,
            message: "Username già utilizzato!",
            severity: "error",
          });
        } else if (dataError.message.includes("email")) {
          setSnackbar({
            open: true,
            message: "Email già presente nel sistema!",
            severity: "error",
          });
        }
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
          È il momento di iniziare!
        </Typography>
        <Typography variant="body2" align="center">
          Compila i campi qui sotto per creare il tuo account.
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
          label="Email"
          placeholder="Inserisci la tua email"
          fullWidth
          autoFocus
          type="email"
          {...register("email", { required: "Campo obbligatorio" })}
          error={!!errors.email}
          helperText={errors.email?.message}
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
        <TextField
          label="Conferma password"
          placeholder="Inserisci di nuovo la tua password"
          fullWidth
          autoFocus
          type="password"
          {...register("confirmPassword", {
            required: "Campo obbligatorio",
            validate: (value) =>
              value === formValues.password || "Le password non coincidono",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained" fullWidth>
          Registrati
        </Button>
      </Box>
    </Container>
  );
}
