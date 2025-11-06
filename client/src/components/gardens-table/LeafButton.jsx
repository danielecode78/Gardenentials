import Button from "@mui/material/Button";
import "./styles/leaf.css";

export default function LeafButton({ children, onClick, ...props }) {
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
      className="leaf-button"
      color="sage"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}
