import {
  Box,
  Fade,
  Button,
  Typography,
  Card,
  CardHeader,
  Tooltip,
} from "@mui/material";
import ReadingIcon from "@mui/icons-material/AutoStories";

export default function ArticleList({
  el,
  setSwitchArticle,
  switchArticle,
  setOpenArticle,
}) {
  return (
    <Fade in={!switchArticle} timeout={500} unmountOnExit>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: { xs: "1 1 100%", xl: "0 1 48%" },
        }}
        elevation={3}
      >
        <CardHeader
          sx={{
            "& .MuiCardHeader-content": {
              display: "flex",
              flexDirection: "row",
              alignItems: "top",
              justifyContent: "space-between",
            },
            "& .MuiCardHeader-title": {
              color: "#3d3d3dff",
              textShadow: "0 0 1px #949494ff",
              fontSize: {
                xs: "0.8rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
              },
              fontWeight: 500,
            },
            "& .MuiCardHeader-subheader": {
              fontStyle: "italic",
              ml: 2,
              fontSize: {
                xs: "0.6rem",
                sm: "0.7rem",
                md: "0.8rem",
                lg: "0.9rem",
              },
              textAlign: "right",
            },
          }}
          title={el.title}
          subheader={new Date(el.createdAt).toLocaleDateString("it-IT")}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            m: 1,
            justifyContent: "end",
          }}
        >
          <Tooltip>
            <Button
              aria-label="expand article"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpenArticle(el._id);
                setSwitchArticle(true);
              }}
              sx={{ textTransform: "none" }}
            >
              <Typography
                sx={{
                  fontStyle: "italic",
                  pr: 1,
                  fontSize: {
                    xs: "0.8rem",
                    sm: "0.9rem",
                    md: "1rem",
                    lg: "1.1rem",
                  },
                }}
                color="primary"
                fontWeight={500}
              >
                Leggi articolo
              </Typography>
              <ReadingIcon />
            </Button>
          </Tooltip>
        </Box>
      </Card>
    </Fade>
  );
}
