// Home.tsx
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Grid,
  InputAdornment,
  CircularProgress,
  Skeleton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  circularProgressClasses,
  Button,
  Link,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { ThreeDots } from "react-loader-spinner";
import chatBot from "../../assets/images/chatbot.png";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { NETSMARTZ_THEME_COLOR } from "../theme/colors";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  chatStartApi,
  generateTicket,
  loadExistingChatApi,
  newChatCreateApi,
} from "../../api_config/api_services";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import { UploadFile } from "@mui/icons-material";
import { AppDispatch, RootState } from "../../api_config/store";
import { setSelectedChatBotModel } from "../../api_config/slices/chatBotSlice";

const ChatBotLoader = () => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={16}
        sx={{
          "svg circle": {
            stroke: "url(#my_gradient)",
          },
        }}
      />
    </React.Fragment>
  );
};

const Home: React.FC<any> = ({
  isSideVisible,
  setSideVisible,
  conversation,
  setConversation,
}) => {
  const chatModelSelector = useSelector((state: RootState) => state.chatbot);
  console.log('blah', chatModelSelector)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [query, setQuery] = useState<any>("");
  // const [conversation, setConversation] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex]: any = useState(null);

  const [isListening, setIsListening] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [utterance, setUtterance]: any = useState(null);
  const [open, setOpen]: any = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const lastMessageRef = useRef<HTMLBodyElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

  const { chat_id } = useParams();
  console.log('chatId', { chat_id });

  const selectedOrgId = useSelector((state: any) => state?.auth?.selectedOrgId);
  console.log('Selected Organisation Id', selectedOrgId)

  const caresmartzId = "aee39f85-3f5a-4bb7-9c4d-4e6e3a4826dc";

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // in progress
  const handleGenerateTicket = async () => {
    if (selectedOrgId !== "") {
      const payload: any = { conversation_id: chat_id, org_id: selectedOrgId };
      console.log("payload of generateTicket", payload);
      await generateTicket(payload)
        .then((result: any) => {
          console.log({ result });
          if (result?.success) {
            console.log("Generate Ticket----->", result);
            setSnackbarMessage(result?.data.message);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
          } else {
            const message: string =
              result.data?.message || "Something Went Wrong.";
            notifyError(message);
            setSnackbarMessage('Something went wrong!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
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

  useEffect(() => {
    // Scroll to the last message whenever the conversation changes
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [conversation]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const notifyError = (message: string) => toast.error(message);

  const handleMicButton = () => {
    if (!isMicrophoneAvailable) {
      notifyError("Microphone is not available.");
      return;
    }
    if (!browserSupportsSpeechRecognition) {
      notifyError("Feature not supported in this browser.");
      return;
    }
    handleStartListening();
  };

  useEffect(() => {
    if (listening && transcript) {
      setQuery(transcript);
    }
  }, [listening, transcript]);

  const newChatInitialization = async (val: any) => {
    // setOpen(true);
    if (selectedOrgId !== "") {
      const payload: any = { org_id: selectedOrgId, question: val };
      console.log(payload, "payload");
      await newChatCreateApi(payload)
        .then((result: any) => {
          console.log({ result });
          if (result?.success) {
            console.log("NewChat----->", result);
            const conversationId =
              result?.data?.conversations[0]?.conversation_id;

            handleApiCall(val, conversationId);
            navigate(`/c/${conversationId}`);
            // setLoading(false)
            // setConversation([])
          } else {
            const message: string =
              result.data?.message || "Something Went Wrong.";
            notifyError(message);
            // setOpen(false);
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

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsDialogOpen(true);
    setIsListening(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    setIsDialogOpen(false);
    resetTranscript();
  };

  const handleStop = () => {
    setActiveIndex(null);
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsStart(false);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    console.log(synth, "synth---->");
    return () => {
      synth.cancel();
      handleStop();
    };
  }, []);

  const handleSpeak = (text: any, index: number) => {
    handleStop();
    setActiveIndex(index);
    setIsStart(true);
    const u: any = new SpeechSynthesisUtterance(text);
    setUtterance(u);
    const synth = window.speechSynthesis;
    synth.speak(u);
  };

  const handleApiCall = async (val: string, conversationId: any) => {
    // setOpen(true);
    if (selectedOrgId !== "") {
      const payload: any = {
        org_id: selectedOrgId,
        conversation_id: chat_id || conversationId,
        question: val,
        llmtype: chatModelSelector.selectedModel.value,
      };
      setConversation((prevState: object[]) => [
        ...prevState,
        { content: val, type: "human" },
        { content: "", type: "ai" },
      ]);

      setIsChatEnabled(false);
      setQuery("");
      await chatStartApi(payload, setConversation).then(() => {
        setIsChatEnabled(true);
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //setValue(event.target.value);
      // Execute your desired function here
      event.preventDefault();
      const inputValue = (event.target as HTMLInputElement).value;

      if (chat_id === undefined) {
        newChatInitialization(inputValue);
      }

      if (inputValue !== "" && chat_id && chat_id !== "") {
        handleApiCall(inputValue, undefined);
        console.log("You entered:", inputValue);
      } else {
        console.log("You entered nothing:");
      }
    }
  };

  const onSendIcon = (event: any) => {
    if (chat_id === undefined) {
      newChatInitialization(query);
    }

    if (query !== "" && chat_id && chat_id !== "") {
      handleApiCall(query, undefined);
      console.log("You entered:", query);
    } else {
      console.log("You entered nothing:");
    }
  };

  const loadExistingConversation = async (conversationId: any) => {
    setOpen(true);
    if (selectedOrgId !== "" && (chat_id || conversationId)) {
      const payload: any = {
        org_id: selectedOrgId,
        conversation_id: chat_id || conversationId,
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
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      mt={9}
      sx={{
        height: "90vh",
        p: 2,
        overflow: "hidden", // Hide scrollbars
        bgcolor: "#F7F7F7", // Background color for better contrast
      }}
    >

      <Box
        height={"100vh"}
        display="flex"
        flexDirection="column"
        bgcolor={"#F7F7F7"}
      >
        <ToastContainer position="bottom-right" autoClose={2000} />

        {/* <Grid bgcolor={'#F7F7F7'} container sx={{ flex: 1, padding: 2, }}> */}
        <Grid bgcolor={"#F7F7F7"} item xs={15} lg={12}>
          {/* Chat Container */}
          <Grid>
            <Paper
              sx={{
                padding: "20px",
                // marginLeft: isSideVisible === false ? "30px" : "0px", // Use ternary operator to handle the conditional styling
                borderRadius: "8px",
                minHeight: "90vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ maxWidth: 100, minWidth: 100 }}>
                <FormControl fullWidth variant="standard">
                  {/* <InputLabel id="demo-simple-select-label">
                    Chat Model
                  </InputLabel> */}
                  {/* model selector */}
                  {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chatModelSelector.selectedModel.value}
                    label="Chat Model"
                    onChange={(event: SelectChangeEvent) => {
                      dispatch(
                        setSelectedChatBotModel({ value: event.target.value })
                      );
                    }}
                  >
                    {chatModelSelector.chatBotModels.map((item: any) => {
                      return (
                        <MenuItem key={item?.value} value={item?.value}>
                          {item?.label}
                        </MenuItem>
                      );
                    })}
                  </Select> */}
                </FormControl>
              </Box>

              {/* Display Conversation */}
              <Box
                sx={{
                  maxHeight: "calc(80vh - 120px)",
                  overflowY: "auto",
                  marginBottom: "20px",
                  "&::-webkit-scrollbar": {
                    display: "none", // Hide the scrollbar
                  },
                }}
              >
                {/* Display Welcome Message */}
                {!conversation.length && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "50vh",
                      fontStyle: "italic",
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontSize={"18px"}
                      fontWeight={"600"}
                      textAlign="center"
                    >
                      Welcome to ConverseAI: Your Virtual Companion
                    </Typography>
                    <Typography variant="body2">
                      How can I assist you today?
                    </Typography>
                    <img
                      className="item_text"
                      src={chatBot}
                      alt="GIF"
                      style={{
                        width: "125px",
                        height: "125px",
                        marginTop: "20px",
                      }}
                    />
                  </Box>
                )}

                {/* Display Conversation Messages */}
                {
                  conversation && (
                    <Box>
                      {conversation?.map(
                        (
                          item: { content: string; type: string },
                          index: any
                        ) => (
                          <Box
                            key={index}
                            ref={
                              index === conversation.length - 1
                                ? lastMessageRef
                                : null
                            }
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            textAlign={"left"}
                            width="100%"
                            my={1}
                          >
                            {item.type === "human" && (
                              <Typography
                                variant="body1"
                                align="left"
                                sx={{
                                  color: "#000",
                                  borderRadius: 1,
                                  padding: "10px",
                                  maxWidth: "100%",
                                  wordWrap: "break-word",
                                }}
                              >
                                <span style={{ fontWeight: "bold" }}>
                                  Question:-{" "}
                                </span>
                                {item.content}
                              </Typography>
                            )}

                            {item.type === "ai" && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flex: 1,
                                  justifyContent: "space-between",
                                }}
                              >
                                {item.content === "" && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flex: 1,
                                      flexDirection: "column",
                                    }}
                                  >
                                    {/* <CircularProgress size={16} /> */}
                                    <ChatBotLoader />

                                    <Skeleton
                                      width="100%"
                                      animation="wave"
                                      height={50}
                                    />
                                    <Skeleton width="100%" animation="wave" />
                                    <Skeleton width="100%" animation="wave" />
                                  </Box>
                                )}
                                <Typography
                                  variant="body1"
                                  align="left"
                                  sx={{
                                    color: "#000",
                                    borderRadius: 1,
                                    padding: "10px",
                                    maxWidth: "100%",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {item.content
                                    .split("\n")
                                    .map((line, index) => (
                                      <span key={index}>
                                        {line}
                                        <br />
                                      </span>
                                    ))}
                                </Typography>
                                {item.content !== "" && (
                                  <VolumeUpIcon
                                    onClick={
                                      isStart
                                        ? () => handleStop()
                                        : () => handleSpeak(item.content, index)
                                    }
                                    sx={{
                                      right: 0,
                                      color:
                                        activeIndex === index
                                          ? "#F58220"
                                          : "black",
                                    }}
                                  />
                                )}
                              </Box>
                            )}
                          </Box>
                        )
                      )}
                    </Box>
                  )
                  //paste here
                }
              </Box>


              {/* Input Textfield and Button */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "30px",
                  left: "0px",
                  display: "inline-flex",
                  width: "100%",
                  gap: "8px",
                  justifyContent: "center",
                  borderTop: "1px solid #d3d3d3",
                  bgcolor: "white",
                  zIndex: 10,
                  py: 2,
                  px: 2,
                }}
              >
                <TextField
                  placeholder="Enter your query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!isChatEnabled}
                  fullWidth
                  size="small"
                  multiline
                  maxRows={4} // Adjust as needed
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#B2BAC2",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        border: "0.1px solid #B2BAC2",
                      },
                      "& textarea": {
                        overflowY: "auto", // Optional: to enable vertical scrolling if the text exceeds the maxRows
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleFileUploadClick}>
                          <UploadFile />
                        </IconButton>
                        {/* {selectedOrgId === caresmartzId &&
                          <IconButton onClick={handleGenerateTicket}>
                            <SupportAgentIcon />
                          </IconButton>} */}
                        {loading ? (
                          <IconButton>
                            <ThreeDots
                              height={30}
                              width={30}
                              color={"NETSMARTZ_THEME_COLOR"}
                            />
                          </IconButton>
                        ) : (
                          <>
                            <IconButton onClick={onSendIcon}>
                              <SendIcon />
                            </IconButton>
                          </>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Independent Icon Button Box */}
                <Box
                  sx={{
                    bgcolor: NETSMARTZ_THEME_COLOR,
                    borderRadius: "5px",
                    mb: 3,
                  }}
                >
                  {!listening ? (
                    <IconButton onClick={handleMicButton}>
                      <MicIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleStopListening}>
                      <StopCircleIcon sx={{ color: "white" }} />
                    </IconButton>
                  )}
                </Box>

              </Box>
              {selectedOrgId === caresmartzId && conversation.length > 0 &&
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "30px",
                    left: "0px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    px: 2,
                    zIndex: 10,
                  }}
                >
                  <Link
                    component="button"
                    color="primary"
                    // variant="body2"
                    fontSize="15px"
                    onClick={handleGenerateTicket}
                  >
                    Contact Support Team
                  </Link>

                </Box>}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  onClose={() => setOpenSnackbar(false)}
                  severity={snackbarSeverity}
                  icon={false}
                  action={null}
                  sx={{
                    width: '100%', bgcolor: 'white',
                    color: 'black'
                  }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Paper>
          </Grid>
          {/* </Grid> */}
          {/* </Grid> */}
        </Grid>
      </Box>
      {open ? (
        <div className="spinner-container">
          <InfinitySpin width="200" color="#F86F03" />
        </div>
      ) : null}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.zip"
        style={{ display: "none" }}
      />
    </Grid>
  );
};

export default Home;
