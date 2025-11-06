import Button from "@mui/material/Button";
import "../styles/flower.css";

export default function FlowerButton({ children, onClick, ...props }) {
  const handleClick = (e) => {
    const button = e.currentTarget;
    button.classList.add("animate");
    setTimeout(() => {
      button.classList.remove("animate");
      onClick(e);
    }, 1500);
  };

  return (
    <Button
      variant="contained"
      className="flower-button"
      color="sage"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}
