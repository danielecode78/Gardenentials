import { uploadDiary } from "../fetches/uploadDiary";
import { deleteDiary } from "../fetches/deleteDiary";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGardenContext } from "@/structure/GardenProvider";

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Collapse,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  ClickAwayListener,
  TextField,
  Grid,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  DeleteOutline as CloseIcon,
  AddBox as AddBoxIcon,
} from "@mui/icons-material";

import { useState, useRef, useEffect } from "react";

export default function DiaryCollapse({
  rowId,
  gardenId,
  rowDiary,
  setOpen,
  switchDiary,
  refresh,
}) {
  const { setSnackbar } = useGardenContext();

  const [idDiary, setIdDiary] = useState();
  const [openDiary, setOpenDiary] = useState({});
  const [imageDiary, setImageDiary] = useState();
  const [inputDiary, setInputDiary] = useState({
    title: "",
    date: null,
    content: "",
  });
  const [editDiary, setEditDiary] = useState({
    title: false,
    date: false,
    content: false,
  });
  const dateRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (idDiary) {
      setOpen((prev) => ({ ...prev, [idDiary]: true }));
      setOpenDiary((prev) => ({ ...prev, [idDiary]: true }));
      setIdDiary(null);
    }
  }, [switchDiary]);

  return (
    <>
      <Box sx={{ margin: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6" gutterBottom component="div">
            Diario
          </Typography>
          <Tooltip
            title={openDiary[rowId] ? "Nascondi diario" : "Mostra diario"}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDiary((prev) => ({
                  ...prev,
                  [rowId]: !prev[rowId],
                }));
              }}
            >
              {openDiary[rowId] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Collapse in={openDiary[rowId]} timeout={300} unmountOnExit>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 2,
            pl: 1,
          }}
        >
          <Paper
            sx={{
              width: "100%",
            }}
            elevation={5}
          >
            <Grid container sx={{ p: 1 }}>
              <Grid
                size={{ xs: 12, sm: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    width: "150px",
                    maxWidth: "100%",
                    aspectRatio: "1",
                  }}
                >
                  <Tooltip title="Aggiungi immagine">
                    <CardActionArea
                      sx={{
                        height: "100%",
                        width: "100%",
                      }}
                      onClick={() => imageRef.current?.click()}
                    >
                      {imageDiary ? (
                        <CardMedia
                          component="img"
                          src={URL.createObjectURL(imageDiary)}
                          alt={imageDiary.name}
                          loading="lazy"
                          sx={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Box
                          component="img"
                          src="/add-diary-image.png"
                          alt="aggiungi immagine a diario"
                          width={150}
                          height={150}
                        />
                      )}

                      <input
                        ref={imageRef}
                        hidden
                        type="file"
                        accept=".jpeg,.jpg,.png"
                        onChange={(e) => {
                          setImageDiary(e.target.files[0]);
                        }}
                      />
                    </CardActionArea>
                  </Tooltip>
                </Card>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 9 }}
                sx={{
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      width: "100%",
                    }}
                  >
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={it}
                    >
                      <DatePicker
                        enableAccessibleFieldDOMStructure={false}
                        maxDate={new Date()}
                        open={editDiary.date}
                        onOpen={() =>
                          setEditDiary((prev) => ({
                            ...prev,
                            date: true,
                          }))
                        }
                        onClose={() =>
                          setEditDiary((prev) => ({
                            ...prev,
                            date: false,
                          }))
                        }
                        value={inputDiary.date ?? null}
                        onChange={(e) => {
                          setInputDiary((prev) => ({
                            ...prev,
                            date: e,
                          }));
                        }}
                        slots={{ field: () => null }}
                        slotProps={{
                          popper: {
                            anchorEl: dateRef.current,
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <Typography
                      ref={dateRef}
                      onClick={() =>
                        setEditDiary((prev) => ({
                          ...prev,
                          date: true,
                        }))
                      }
                      sx={{
                        "&:hover": { cursor: "pointer" },
                        pr: 1,
                      }}
                    >
                      {inputDiary.date
                        ? inputDiary.date.toLocaleDateString("it-IT")
                        : "Inserisci una data"}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    {editDiary.title ? (
                      <ClickAwayListener
                        onClickAway={() =>
                          setEditDiary((prev) => ({
                            ...prev,
                            title: false,
                          }))
                        }
                      >
                        <TextField
                          autoComplete="off"
                          variant="standard"
                          value={inputDiary.title}
                          onChange={(e) =>
                            setInputDiary((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setEditDiary((prev) => ({
                                ...prev,
                                title: false,
                              }));
                            }
                          }}
                          sx={{
                            maxWidth: "100%",
                            width: "100%",
                            "& input": {
                              textAlign: "center",
                              fontSize: "1.25rem",
                              fontWeight: 500,
                              padding: 0,
                              pt: 0.1,
                              mb: 0.3,
                            },
                          }}
                        />
                      </ClickAwayListener>
                    ) : (
                      <Typography
                        variant="h6"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                        onClick={() =>
                          setEditDiary((prev) => ({
                            ...prev,
                            title: true,
                          }))
                        }
                      >
                        {inputDiary.title
                          ? inputDiary.title
                          : "Inserisci il titolo"}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      borderRadius: 1,
                      height: "5rem",
                    }}
                  >
                    {editDiary.content ? (
                      <ClickAwayListener
                        onClickAway={() =>
                          setEditDiary((prev) => ({
                            ...prev,
                            content: false,
                          }))
                        }
                      >
                        <TextField
                          autoComplete="off"
                          multiline
                          rows={3}
                          variant="outlined"
                          value={inputDiary.content}
                          onChange={(e) =>
                            setInputDiary((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setEditDiary((prev) => ({
                                ...prev,
                                content: false,
                              }));
                            }
                          }}
                          sx={{
                            width: "100%",
                            p: 0,
                            "& .MuiInputBase-root": {
                              fontSize: "1rem",
                              fontWeight: 400,
                              p: 0.5,
                              lineHeight: "1.5",
                            },
                          }}
                        />
                      </ClickAwayListener>
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          p: 0.5,
                          textAlign: !inputDiary.content ? "center" : null,
                        }}
                        onClick={() =>
                          setEditDiary((prev) => ({
                            ...prev,
                            content: true,
                          }))
                        }
                      >
                        {inputDiary.content
                          ? inputDiary.content
                          : "Inserisci il contenuto"}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  {!inputDiary.date || !inputDiary.title ? (
                    <Button
                      disabled
                      variant="outlined"
                      sx={{
                        py: 0.2,
                        pr: 0.5,
                        pl: 1.2,
                        fontSize: "0.7rem",
                      }}
                    >
                      Inserisci scheda
                      <AddBoxIcon fontSize="small" color="grey" />
                    </Button>
                  ) : (
                    <Tooltip title="Inserisci scheda">
                      <Button
                        onClick={() =>
                          uploadDiary(
                            rowId,
                            gardenId,
                            setIdDiary,
                            imageDiary,
                            inputDiary,
                            refresh,
                            setSnackbar
                          )
                        }
                        variant="outlined"
                        color="primary"
                        sx={{
                          py: 0.2,
                          pr: 0.5,
                          pl: 1.2,
                          fontSize: "0.7rem",
                        }}
                      >
                        Inserisci scheda
                        <AddBoxIcon fontSize="small" color="primary" />
                      </Button>
                    </Tooltip>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {rowDiary &&
            rowDiary.length > 0 &&
            rowDiary
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((el, index) => {
                return (
                  <Paper
                    key={`diary-${index}`}
                    sx={{
                      width: "100%",
                      display: !rowDiary || (rowDiary.length < 1 && "none"),
                      position: "relative",
                    }}
                    elevation={5}
                  >
                    <Grid container sx={{ p: 1 }}>
                      <Grid
                        size={{ xs: 12, sm: 3 }}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Card
                          sx={{
                            width: "150px",
                            maxWidth: "100%",
                            aspectRatio: "1",
                          }}
                        >
                          {el.image?.url ? (
                            <CardMedia
                              component="img"
                              src={el.image.url}
                              alt={el.image.filename}
                              loading="lazy"
                              sx={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                                userSelect: "none",
                                pointerEvents: "none",
                              }}
                            />
                          ) : (
                            <Box
                              component="img"
                              src="/no-image.png"
                              alt="aggiungi immagine a diario"
                              width={150}
                              height={150}
                            />
                          )}
                        </Card>
                      </Grid>
                      <Grid
                        size={{ xs: 12, sm: 9 }}
                        sx={{
                          minWidth: 0,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              width: "100%",
                              gap: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                pr: 1,
                              }}
                            >
                              {el.date &&
                                new Date(el.date).toLocaleDateString("it-IT")}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: "center" }}>
                            {el.title && (
                              <Typography
                                variant="h6"
                                sx={{
                                  wordBreak: "break-word",
                                  whiteSpace: "normal",
                                }}
                              >
                                {el.title}
                              </Typography>
                            )}
                          </Box>
                          <Box
                            sx={{
                              borderRadius: 1,
                              height: "5rem",
                            }}
                          >
                            {el.content && (
                              <Typography
                                variant="body1"
                                sx={{
                                  wordBreak: "break-word",
                                  whiteSpace: "normal",
                                  p: 0.5,
                                }}
                              >
                                {el.content}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <Tooltip title="Cancella scheda">
                            <Button
                              onClick={() =>
                                deleteDiary(
                                  rowId,
                                  el._id,
                                  el.image?.filename,
                                  gardenId,
                                  setIdDiary,
                                  refresh,
                                  setSnackbar
                                )
                              }
                              variant="outlined"
                              color="terracotta"
                              sx={{
                                py: 0.2,
                                pr: 0.5,
                                pl: 1.2,
                                fontSize: "0.7rem",
                              }}
                            >
                              Cancella scheda
                              <CloseIcon fontSize="small" color="terracotta" />
                            </Button>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
        </Box>
      </Collapse>
    </>
  );
}
