import apiClient from "../../utils/apiClient";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useGardenContext } from "../../structure/GardenProvider";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Yard as GardenIcon,
  AcUnit as MeteoIcon,
  MenuBook as BookIcon,
  ListAlt as ToDoListIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  AppRegistration as AppRegistrationIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

export default function MiniDrawer({ children }) {
  const { user, setUser, snackbar, setSnackbar } = useGardenContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const firstItemRef = useRef(null);
  const toggleDrawer = () => setOpen((prev) => !prev);
  const clickItem = (choice) => {
    if (choice === "/logout") {
      const logout = async () => {
        await apiClient.post("/logout");
        setUser(null);
        navigate("/");
        setSnackbar({
          open: true,
          message: "Logout avvenuto con successo!",
          severity: "success",
        });
      };
      logout();
    } else {
      navigate(choice);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (open && isMobile && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [open, isMobile]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(!isMobile &&
            open && {
              marginLeft: `${drawerWidth}px`,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              marginRight: { xs: 0, sm: 5 },
              ...(open && !isMobile && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="button"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              color: "white",
              border: 0,
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{ fontFamily: "Amatic SC", fontWeight: 700 }}
            >
              Gardenentials
            </Typography>
            <img
              src="/plant2.png"
              alt="Foglia Gardenentias"
              style={{ width: 60, height: 60 }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor={isMobile ? "top" : "left"}
        open={open}
        onClose={toggleDrawer}
        ModalProps={isMobile ? { keepMounted: true } : undefined}
        sx={{
          width: isMobile
            ? "100%"
            : open
              ? drawerWidth
              : `calc(${theme.spacing(7)} + 1px)`,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: isMobile
              ? "100%"
              : open
                ? drawerWidth
                : `calc(${theme.spacing(7)} + 1px)`,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
            [theme.breakpoints.up("sm")]: {
              width: isMobile
                ? "100%"
                : open
                  ? drawerWidth
                  : `calc(${theme.spacing(8)} + 1px)`,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Box>
        {user && (
          <>
            {open && <Divider />}

            <List>
              {[
                {
                  text: "Giardini",
                  icon: (
                    <Tooltip title={!open ? "Giardini" : ""}>
                      <GardenIcon />
                    </Tooltip>
                  ),
                  submitChoice: "/gardens",
                },
                {
                  text: "Meteo",
                  icon: (
                    <Tooltip title={!open ? "Meteo" : ""}>
                      <MeteoIcon />
                    </Tooltip>
                  ),
                  submitChoice: "/meteo",
                },
                {
                  text: "WikiGarden",
                  icon: (
                    <Tooltip title={!open ? "WikiGarden" : ""}>
                      <BookIcon />
                    </Tooltip>
                  ),
                  submitChoice: "/wiki-garden",
                },
              ].map((item, index) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={!isMobile ? { display: "block" } : undefined}
                >
                  <ListItemButton
                    onClick={() => clickItem(item.submitChoice)}
                    ref={index === 0 ? firstItemRef : null}
                    sx={
                      !isMobile
                        ? {
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }
                        : undefined
                    }
                  >
                    <ListItemIcon
                      sx={
                        !isMobile
                          ? {
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }
                          : undefined
                      }
                    >
                      {item.icon ? item.icon : ""}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={!isMobile ? { opacity: open ? 1 : 0 } : undefined}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Divider />

        <List>
          {[
            {
              text: "Registrazione",
              icon: (
                <Tooltip title={!open ? "Registrazione" : ""}>
                  <AppRegistrationIcon />
                </Tooltip>
              ),
              submitChoice: "/register",
              visible: false,
            },
            {
              text: "Login",
              icon: (
                <Tooltip title={!open ? "Login" : ""}>
                  <LoginIcon />
                </Tooltip>
              ),
              submitChoice: "/login",
              visible: false,
            },
            {
              text: "Logout",
              icon: (
                <Tooltip title={!open ? "Logout" : ""}>
                  <LogoutIcon />
                </Tooltip>
              ),
              submitChoice: "/logout",
              visible: true,
            },
          ]
            .filter((el) => {
              if (user) {
                return el.visible;
              } else {
                return !el.visible;
              }
            })
            .map((item, index) => {
              return (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={!isMobile ? { display: "block" } : undefined}
                >
                  <ListItemButton
                    onClick={() => clickItem(item.submitChoice)}
                    sx={
                      !isMobile
                        ? {
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }
                        : undefined
                    }
                  >
                    <ListItemIcon
                      sx={
                        !isMobile
                          ? {
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }
                          : undefined
                      }
                    >
                      {item.icon ? item.icon : ""}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={!isMobile ? { opacity: open ? 1 : 0 } : undefined}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        />
        {children}
      </Box>
    </Box>
  );
}
