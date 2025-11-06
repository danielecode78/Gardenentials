import { categories } from "@/components/wiki-garden/utils/categories";
import { getGuides } from "@/components/wiki-garden/fetches/getGuides";

import WikiBar from "@/components/wiki-garden/WikiBar";
import ArticleList from "@/components/wiki-garden/ArticleList";
import ReadingArticle from "@/components/wiki-garden/ReadingArticle";
import WikiModal from "@/components/wiki-garden/WikiModal";

import { Box, Tabs, Tab, Paper, Collapse, Typography } from "@mui/material";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export default function WikiGarden() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(-1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalCreateGuide, setOpenModalCreateGuide] = useState(false);
  const [openArticle, setOpenArticle] = useState();
  const [switchArticle, setSwitchArticle] = useState(false);

  const [guides, setGuides] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const filtered = guides?.filter(
    (el) => el.categories === categories[tabValue]
  );

  useEffect(() => {
    getGuides(setGuides);
  }, []);

  return (
    <Box>
      <WikiBar
        setOpenDrawer={setOpenDrawer}
        setOpenModal={setOpenModalCreateGuide}
        setSearchResults={setSearchResults}
        setTabValue={setTabValue}
      />
      <WikiModal
        setOpenModalCreateGuide={setOpenModalCreateGuide}
        openModalCreateGuide={openModalCreateGuide}
        getGuides={getGuides}
        setGuides={setGuides}
        setSearchResults={setSearchResults}
      />
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          borderRadius: "0 0 10px 10px",
        }}
      >
        <Box>
          <Collapse in={openDrawer} orientation="horizontal" timeout="auto">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={(event, newValue) => {
                  setTabValue(newValue);
                  setSwitchArticle(false);
                  setOpenArticle();
                  setSearchResults([]);
                }}
                aria-label="Vertical tabs example"
                sx={{
                  borderRadius: "0 0 0 10px",
                  backgroundColor: "#d2691e0f",
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.terracotta.main,
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    opacity: 0.2,
                  },
                }}
              >
                <Tab
                  value={-1}
                  sx={{
                    visibility: "hidden",
                    height: 0,
                    minHeight: 0,
                    padding: 0,
                  }}
                />

                {categories.map((category, index) => (
                  <Tab
                    key={index}
                    value={index}
                    sx={{
                      position: "relative",
                      "&:hover::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        backgroundColor: theme.palette.terracotta.main,
                        opacity: 0.2,
                      },
                      "&:hover": {
                        color: theme.palette.terracotta.main,
                        fontWeight: 700,
                      },
                      width: {
                        xs: "120px",
                        sm: "220px",
                        lg: "300px",
                        xl: "400px",
                      },
                      fontSize: {
                        xs: "0.6rem",
                        sm: "0.8rem",
                        md: "1rem",
                        lg: "1.1rem",
                      },
                      fontWeight: 500,
                      "&.Mui-selected": {
                        color: theme.palette.terracotta.main,
                        fontWeight: 700,
                      },
                    }}
                    label={category}
                  />
                ))}
              </Tabs>
            </Box>
          </Collapse>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", xl: "row" },
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {searchResults.length < 1 && filtered.length > 0 ? (
              filtered.map((el, index) => {
                if (!switchArticle) {
                  return (
                    <ArticleList
                      key={`card-${index}`}
                      setSwitchArticle={setSwitchArticle}
                      switchArticle={switchArticle}
                      setOpenArticle={setOpenArticle}
                      el={el}
                    />
                  );
                } else if (switchArticle && openArticle === el._id) {
                  return (
                    <ReadingArticle
                      key={el._id}
                      setSwitchArticle={setSwitchArticle}
                      switchArticle={switchArticle}
                      setOpenArticle={setOpenArticle}
                      el={el}
                    />
                  );
                }
              })
            ) : searchResults.length > 0 ? (
              searchResults.map((el, index) => {
                if (!switchArticle) {
                  return (
                    <ArticleList
                      key={`card-${index}`}
                      setSwitchArticle={setSwitchArticle}
                      switchArticle={switchArticle}
                      setOpenArticle={setOpenArticle}
                      el={el}
                    />
                  );
                } else if (switchArticle && openArticle === el._id) {
                  return (
                    <ReadingArticle
                      key={el._id}
                      setSwitchArticle={setSwitchArticle}
                      switchArticle={switchArticle}
                      setOpenArticle={setOpenArticle}
                      el={el}
                    />
                  );
                }
              })
            ) : (
              <Typography variant="h5" textAlign="center">
                {tabValue === -1
                  ? "Seleziona una categoria oppure effettua una ricerca."
                  : "Nessun articolo trovato."}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
