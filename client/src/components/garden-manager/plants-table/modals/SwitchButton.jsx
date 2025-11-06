import { Button } from "@mui/material";

export default function SwitchButton({
  switchButton,
  setSwitchButton,
  type,
  choice,
}) {
  return !switchButton ? (
    <Button
      variant="contained"
      fullWidth
      color="sage"
      onClick={(e) => {
        e.preventDefault();
        setSwitchButton(true);
      }}
    >
      {choice === "one"
        ? `Esegui modifica ${type}
                      ${
                        type === "trattamento"
                          ? "già effettuati"
                          : "già effettuate"
                      }`
        : choice === "two"
          ? `Esegui modifica ${type} da effettuare`
          : null}
    </Button>
  ) : (
    <Button type="submit" variant="contained" fullWidth color="terracotta">
      Confermi di voler applicare questa modifica?
    </Button>
  );
}
