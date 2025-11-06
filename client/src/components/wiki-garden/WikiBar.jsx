import apiClient from "@/utils/apiClient";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MagicIcon from "@mui/icons-material/AutoFixHigh";
import { useState } from "react";

export default function WikiBar({
  setOpenDrawer,
  setOpenModal,
  setSearchResults,
  setTabValue,
}) {
  const theme = useTheme();
  const [inputSearch, setInputSearch] = useState("");

  const getSearchResults = async () => {
    await apiClient
      .get("/wiki-search", {
        params: { search: inputSearch },
      })
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => {
        const dataError = err.response?.data;
        console.log("Status code:", dataError?.statusCode);
        console.log("Messaggio:", dataError?.message);
        console.log("Stack:", dataError?.stack);
        console.log("Raw:", dataError?.metadata.raw);
      });
  };

  return (
    <Box>
      <AppBar
        position="static"
        color="warning"
        sx={{
          borderRadius: "10px 10px 0px 0px",
          boxShadow: "none",
          position: "relative",
          "&::before": {
            content: `""`,
            inset: 0,
            position: "absolute",
            backgroundImage: `url("/flower-bar-light.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
          },
        }}
      >
        <Toolbar>
          <Tooltip title="Menu argomenti">
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                mr: 3,
                backgroundColor: "#246606c3",
                "&:hover": {
                  backgroundColor: "#1c4f05ff",
                  color: "#FDDA00",
                },
              }}
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              <MenuBookIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Genera argomento">
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                backgroundColor: "#246606c3",
                "&:hover": {
                  backgroundColor: "#1c4f05ff",
                  color: "#FDDA00",
                },
              }}
              onClick={() => {
                setOpenModal(true);
                document.activeElement?.blur();
              }}
            >
              <MagicIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box
            sx={{
              position: "relative",
              borderRadius: theme.shape.borderRadius,
              border: "1px solid #d0d0d0ff",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              },
              marginLeft: 0,
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
              },
            }}
          >
            <Box
              sx={{
                padding: theme.spacing(0, 2),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon sx={{ color: "#246606c3" }} />
            </Box>
            <InputBase
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputSearch.length > 0) {
                    getSearchResults();
                    setInputSearch("");
                    setOpenDrawer(false);
                    setTabValue(-1);
                  }
                }
              }}
              autoComplete="off"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "#246606c3",
                fontWeight: 600,
                width: "100%",
                "& .MuiInputBase-input": {
                  color: "	#246606c3",
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create("width"),
                  [theme.breakpoints.up("sm")]: {
                    width: "12ch",
                    "&:focus": {
                      width: "20ch",
                    },
                  },
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
