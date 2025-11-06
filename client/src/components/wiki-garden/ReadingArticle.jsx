import {
  Box,
  Fade,
  Typography,
  Card,
  CardContent,
  Tooltip,
  IconButton,
} from "@mui/material";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { useTheme } from "@mui/material/styles";

export default function ReadingArticle({
  el,
  switchArticle,
  setOpenArticle,
  setSwitchArticle,
}) {
  const theme = useTheme();

  return (
    <Fade in={switchArticle} timeout={500} unmountOnExit>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "16px",
            py: 1,
            boxShadow: "0 1px 5px gray",
          }}
        >
          <Typography
            variant="h6"
            color="#7e7e7eb0"
            fontWeight={700}
            textAlign="center"
            sx={{
              flexGrow: 1,
              textShadow: "0 0 1px #bbbbbbff",
            }}
          >
            {el.title}
          </Typography>
          <Tooltip title="Torna indietro">
            <IconButton
              aria-label="expand article"
              size="medium"
              onClick={(e) => {
                e.stopPropagation();
                setOpenArticle();
                setSwitchArticle(false);
              }}
            >
              <KeyboardReturnIcon fontSize="large" color="terracotta" />
            </IconButton>
          </Tooltip>
        </Box>
        <CardContent>
          <Box
            sx={{
              "& h1": { color: theme.palette.primary.main },
              "& h2": { color: theme.palette.primary.main },
              "& h3": { color: theme.palette.primary.main },
              "& h4": { color: theme.palette.primary.main },
              "& h5": { color: theme.palette.primary.main },
              "& h6": { color: theme.palette.primary.main },
              "& strong": {
                color: theme.palette.terracotta.dark,
              },
            }}
            dangerouslySetInnerHTML={{ __html: el.content }}
          />
        </CardContent>
      </Card>
    </Fade>
  );
}
