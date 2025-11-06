import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  ImageList,
  ImageListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ImagesManager({
  gardenImages,
  setGardenImages,
  gardenOldImages,
  setGardenOldImages,
}) {
  const theme = useTheme();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 20 * 1024 * 1024,
    onDrop: (files) => {
      setGardenImages(files);
    },
  });

  return (
    <Box>
      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          backgroundImage: `url("/zone.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            backdropFilter: "blur(1px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            padding: 4,
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <input {...getInputProps()} />
          <Typography
            variant="h6"
            color="white"
            sx={{ textShadow: "1px 1px 5px black" }}
          >
            Trascina qui le immagini, oppure clicca per selezionarle
          </Typography>
        </Paper>
      </Paper>
      <Box sx={{ maxHeight: "40vh", overflow: "auto", borderRadius: 1 }}>
        <ImageList cols={3} gap={10}>
          {gardenOldImages?.length > 0 &&
            gardenOldImages?.map((file, index) => (
              <ImageListItem
                key={file.filename}
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img src={file.url} alt={file.filename} loading="lazy" />
                <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                  <Tooltip title="Elimina">
                    <IconButton sx={{ p: 0 }}>
                      <CloseIcon
                        onClick={() =>
                          setGardenOldImages((prev) =>
                            prev.filter((el) => el.filename !== file.filename)
                          )
                        }
                        fontSize="large"
                        sx={{
                          color: theme.palette.terracotta.main,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ImageListItem>
            ))}
          {gardenImages?.length > 0 &&
            gardenImages?.map((file, index) => (
              <ImageListItem
                key={file.path}
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.path}
                  loading="lazy"
                />
                <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                  <Tooltip title="Elimina">
                    <IconButton sx={{ p: 0 }}>
                      <CloseIcon
                        onClick={() =>
                          setGardenImages((prev) =>
                            prev.filter((el) => el.path !== file.path)
                          )
                        }
                        fontSize="large"
                        sx={{
                          color: theme.palette.terracotta.main,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
    </Box>
  );
}
