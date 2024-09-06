import React, { FC, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Tooltip,
  Collapse,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import {
  deleteExistingChatApi,
  getHistoryApi,
  loadExistingChatApi,
} from "../../api_config/api_services";
import { toast, ToastContainer } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOrganization } from "../../api_config/slices/authSlice";
import { InfinitySpin } from "react-loader-spinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteConfirmationDialog from "./DeleteConfirmation";

const Sidebar: React.FC<any> = ({
  isSideVisible,
  setSideVisible,
  handleNewChat,
  organizationListOption,
  chat_id,
  setConversation,
}) => {
  const selectedOrgId = useSelector((state: any) => state?.auth?.selectedOrgId);
  const navigate = useNavigate();
  const [convHistory, setConvHistory]: any = useState({});
  const dispatch = useDispatch();
  const [open, setOpen]: any = useState(false);
  const token =
    useSelector((state: any) => state?.auth?.token) ||
    localStorage.getItem("token");

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSelectedOrganization({ org_id: event.target.value as string }));
    navigate("/");
    setConversation([]);
  };
  const notifyError = (message: string) => toast.error(message);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [conversationId, setConversationId]: any = useState("");

  const handleOpenDialog = (e: any, conversation_id: any) => {
    setConversationId(conversation_id);
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleLoadHistory = () => {
    if (selectedOrgId !== "") {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const payload: any = { org_id: selectedOrgId };
      getHistoryApi(payload)
        .then((result: any) => {
          setOpen(true);
          console.log({ result });
          if (result?.success) {
            // setLoading(false)
            const coversationValues: any = categorizeConversations(
              result?.data?.conversations
            );
            console.log({ coversationValues });
            setConvHistory(coversationValues);
            setOpen(false);
          } else {
            const message: string =
              result.data?.message || "Something Went Wrong.";
            notifyError(message);
            setOpen(false);
            // setLoading(false)
          }
        })
        .catch((err: any) => {
          const error = err as AxiosError;
          // Consolidated error handling
          let errorMessage = "Something went wrong.";
          if (error.response) {
            const responseData = error.response.data as { error?: string };
            if (responseData?.error) {
              errorMessage = responseData.error;
            }
          } else {
            errorMessage =
              "Error occurred while setting up the request: " + error.message;
          }
          // Notify error and set response message
          notifyError(errorMessage);
          setOpen(false);
          // setLoading(false)
        });
    }
  };

  const deleteExistingConversation = async (conversationId: any) => {
    setOpen(true);
    if (selectedOrgId !== "" && conversationId) {
      const payload: any = {
        org_id: selectedOrgId,
        conversation_id: conversationId,
      };
      await deleteExistingChatApi(payload)
        .then((result: any) => {
          console.log("$$$$", { result });
          if (result?.success) {
            // setConversation(result?.data)
            handleLoadHistory();
            setOpen(false);
            navigate("/");
            setConversation([]);

            // setLoading(false)
          } else {
            const message: string =
              result.data?.message || "Something Went Wrong.";
            notifyError(message);
            setOpen(false);
            // setLoading(false)
          }
        })
        .catch((err: any) => {
          const error = err as AxiosError;
          // Consolidated error handling
          let errorMessage = "Something went wrong.";
          if (error.response) {
            const responseData = error.response.data as { error?: string };
            if (responseData?.error) {
              errorMessage = responseData.error;
            }
          } else {
            errorMessage =
              "Error occurred while setting up the request: " + error.message;
          }
          // Notify error and set response message
          notifyError(errorMessage);
          setOpen(false);
          // setLoading(false)
        });
    }
  };

  const handleConfirmDelete = () => {
    setIsDialogOpen(false);
    if (conversationId && conversationId !== "") {
      deleteExistingConversation(conversationId);
    }
  };

  function categorizeConversations(conversations: any) {
    const now: any = new Date();
    const today: any = [];
    const yesterday: any = [];
    const daysAgo: any = [];

    conversations.forEach((conversation: any) => {
      const createdAt: any = new Date(conversation.created_at);
      const deltaDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

      if (deltaDays === 0) {
        today.push(conversation);
      } else if (deltaDays === 1) {
        yesterday.push(conversation);
      } else {
        daysAgo.push(conversation);
      }
    });

    return { today, yesterday, daysAgo };
  }

  useEffect(() => {
    handleLoadHistory();
  }, [selectedOrgId, chat_id]);

  const loadExistingConversation = async (conversationId: any) => {
    setOpen(true);
    if (selectedOrgId !== "" && conversationId) {
      const payload: any = {
        org_id: selectedOrgId,
        conversation_id: conversationId,
      };
      await loadExistingChatApi(payload)
        .then((result: any) => {
          console.log({ result });
          if (result?.success) {
            console.log("--------$$$", result);
            setConversation(result?.data);
            setOpen(false);
            // setLoading(false)
          } else {
            const message: string =
              result.data?.message || "Something Went Wrong.";
            notifyError(message);
            setOpen(false);
            // setLoading(false)
          }
        })
        .catch((err: any) => {
          const error = err as AxiosError;
          // Consolidated error handling
          let errorMessage = "Something went wrong.";
          if (error.response) {
            const responseData = error.response.data as { error?: string };
            if (responseData?.error) {
              errorMessage = responseData.error;
            }
          } else {
            errorMessage =
              "Error occurred while setting up the request: " + error.message;
          }
          // Notify error and set response message
          notifyError(errorMessage);
          setOpen(false);
          // setLoading(false)
        });
    }
  };

  return (
    <>
      <Box>
        <Collapse in={isSideVisible} orientation="horizontal" timeout={300}>
          <Box
            sx={{
              marginTop: 9,
              width: 300,
              bgcolor: "#fff",
              height: "93vh",
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
              transition: "width 0.3s ease",
            }}
          >
            <ToastContainer position="bottom-right" autoClose={2000} />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Organization
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOrgId}
                  label="Organization"
                  onChange={handleChange}
                >
                  {organizationListOption &&
                    organizationListOption.map((item: any) => {
                      return (
                        <MenuItem key={item.value} value={item?.value}>
                          {item?.label}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <IconButton onClick={() => setSideVisible(false)}>
                  <MenuIcon sx={{ color: "#7e7e7e" }} />
                </IconButton>
                <Tooltip title={"New Chat"}>
                  <IconButton onClick={() => handleNewChat()}>
                    <CreateIcon sx={{ color: "#7e7e7e" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Divider />

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none", // Hide the scrollbar
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <HistoryIcon />
                <Typography variant="h6" sx={{ fontSize: 20, ml: 1 }}>
                  History
                </Typography>
              </Box>
              <List>
                <div>
                  {convHistory &&
                    Object.keys(convHistory).map(
                      (key: any) =>
                        convHistory[key].length > 0 && (
                          <Box sx={{ mb: 2 }} key={key}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: "bold",
                                color: "#7e7e7e",
                                mb: 1,
                              }}
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                              {/* Capitalize the key */}
                            </Typography>
                            {convHistory[key].map((item: any) => (
                              <ListItemButton
                                key={item.conversation_id}
                                to={`/c/${item.conversation_id}`}
                                text={
                                  item?.conversation_title
                                    ? item?.conversation_title
                                    : "NA"
                                }
                                handleClick={() =>
                                  loadExistingConversation(item.conversation_id)
                                }
                                handleOpenDialog={(e: any) =>
                                  handleOpenDialog(e, item.conversation_id)
                                }
                              />
                            ))}
                          </Box>
                        )
                    )}
                </div>
              </List>
            </Box>
          </Box>
        </Collapse>
      </Box>
      {open ? (
        <div className="spinner-container">
          <InfinitySpin width="200" color="#F86F03" />
        </div>
      ) : null}

      <CloseDrawer
        visible={isSideVisible}
        onClick={() => setSideVisible(true)}
      />

      {/* {!isSideVisible && (
        <Box
          mt={9}
          sx={{
            width: "auto",
            bgcolor: "#fff",
            height: "93vh",
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <IconButton onClick={() => setSideVisible(true)}>
            <MenuIcon sx={{ color: "#7e7e7e" }} />
          </IconButton>
        </Box>
      )} */}

      <DeleteConfirmationDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        itemToDelete="Sample Item"
      />
    </>
  );
};

const CloseDrawer = ({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) => {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setShowElement(true);
      }, 150);
    } else {
      setShowElement(false);
    }
  }, [visible]);

  return (
    <>
      {showElement && (
        <Box
          mt={9}
          sx={{
            width: "auto",
            bgcolor: "#fff",
            height: "93vh",
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <IconButton onClick={onClick}>
            <MenuIcon sx={{ color: "#7e7e7e" }} />
          </IconButton>
        </Box>
      )}
    </>
  );
};

interface ListItemButtonProps {
  to: string;
  text: string;
  handleClick: any;
  handleOpenDialog: any;
}

const ListItemButton: React.FC<ListItemButtonProps> = ({
  to,
  text,
  handleClick,
  handleOpenDialog,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleIconClick = (event: React.MouseEvent) => {
    // Prevent click event from propagating to the NavLink
    event.stopPropagation();

    // Perform delete action here, e.g., call a delete function
    console.log("Delete icon clicked");
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 1,
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink
        onClick={() => handleClick()}
        to={to}
        style={{ textDecoration: "none" }}
      >
        {({ isActive }) => (
          <ListItem
            button
            sx={{
              borderRadius: 1,
              backgroundColor: isActive ? "#e0e0e0" : "transparent",
              fontWeight: isActive ? "bold" : "normal",

              transition: "background-color 0.2s ease",
            }}
          >
            <ListItemText primary={text} sx={{ color: "#333" }} />
          </ListItem>
        )}
      </NavLink>
      {isHovered && (
        <IconButton
          onClick={handleOpenDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%) scale(1)",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-50%) scale(1.2)", // Zoom effect on hover
            },
          }}
        >
          <DeleteOutlineIcon
            sx={{
              color: "black",
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default Sidebar;
