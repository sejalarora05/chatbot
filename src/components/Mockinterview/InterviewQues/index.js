import { Box, Grid, IconButton, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { shallowEqual, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { get } from "lodash";
import InstructionsModal from "./InstructionsModal";
import QuestionsBoxButtons from "./QuestionsBoxButtons";
import { TEXT } from "../../theme/colors";
import T from "../../../utils/T";
import MISLoader from "./MISLoader";
import { GET_SIZE } from "../../../utils/responsive";
import { handleError } from "../../../utils/error";
import { MISCurrentUser } from "../../../utils/validations";
import { useLazyGetQuestionQuery } from "../../../api_config/api_services/MockInterview/getQuestion";
import { useSubmitAudioMutation } from "../../../api_config/api_services/MockInterview/submitAudio";
import { usePostUserInfoMutation } from "../../../api_config/api_services/MockInterview/postMockInterviewUserInfo";
import { useSubmitResponsesMutation } from "../../../api_config/api_services/MockInterview/submitResponses";
import { useLazyGetExistingResponsesQuery } from "../../../api_config/api_services/MockInterview/getExistingResponses";
import { manageMockInterviewUserLogin, mockInterviewResponseArrStore, mockInterviewStore, mockInterviewStore1 } from "../../../api_config/slices/mockInterviewSlice";
import { InfinitySpin } from "react-loader-spinner";
import "./Style.scss";
import HorizontalList from "../../horizontalList/HorizontalList";
import VerticalCardList from "../../verticalCardList/VerticalCardList";
import Footer from "../../footer/Footer";


const APP_PREFIX = "/app";
export const convertBase64ToBlob = (base64String) => {
  const binaryData = atob(base64String);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob object from the binary data
  const blob = new Blob([uint8Array], { type: "application/octet-stream" });
  return blob;
};
const InterviewQuestions = () => {
  const dispatch = useDispatch();
  const { user } = MISCurrentUser();
  const userId = get(user, "user.id", "");
  const userName = get(user, "user.userName", "") || "Aniket Singh";
  const empCode = get(user, "user.employeeCode", "") || "NTZ2081";
  // const { mockInterviewUserRegistered, responseArr } = useSelector(
  //   (state) => ({
  //     //mockResponses: get(state, "MockInterviewSlice.mockResponses", []),
  //     mockInterviewUserRegistered: get(state, "MockInterviewSlice.mockInterviewUserRegistered", false),
  //     responseArr: get(state, "MockInterviewSlice.responseArr", []),
  //   }),
  //   shallowEqual,
  // );

  const { mockResponses, mockInterviewUserRegistered, responseArr } = useSelector((state) => state.
    mockInterviewSlice
  )

  console.log(mockResponses, "mockResponses--->")
  const { isXs, isMd } = GET_SIZE();
  // const [getQuestion, { data: question, isFetching }] = useLazyGetQuestionQuery();
  const [submitResponses, { isFetching: submitResponseFetching }] = useSubmitResponsesMutation();
  const [getExistingResponses] = useLazyGetExistingResponsesQuery();
  const [postUserInfo] = usePostUserInfoMutation();
  const [submitAudio, audioData] = useSubmitAudioMutation();
  const { isLoading: submitIsLoading } = audioData;
  const navigate = useNavigate();
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  // const [question, setQuestion] = useState([]);
  const [questionStep, setQuestionStep] = useState(0);
  const [question, setQuestion] = useState('');
  const [audioFormData, setAudioFormData] = useState(new FormData());
  const [localState, setLocalState] = useReducer((prevState, newState) => ({ ...prevState, ...newState }), {
    questionsList: [],
    answersList: [],
    // questionStep: 0,
    openInstructionModal: true,
    isLoading: true,
  });
  const { questionsList, isLoading, openInstructionModal } = localState;

  const { token } = useSelector((state) => state?.auth);

  const [searchParams] = useSearchParams();
  const convertBase64 = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result.split(",")[1]);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  const quesStep = +searchParams.get("ques");
  console.log(quesStep, "quesStep12345--->")

  useEffect(() => {
    fetchQuestion();
  }, [questionStep]);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`https://aibackend.netsmartz.us/api/mock_question?index=${questionStep}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setQuestion(data.question);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };


  useEffect(() => {
    setLocalState({ isLoading: true });
    if (responseArr.length === 0) {
      setLocalState({ isLoading: false });
    } else {
      setLocalState({ isLoading: false });
    }
  }, [responseArr.length]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert("Microphone access permission required !");
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      getMicrophonePermission();
    }
  }, [isLoading]);
  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const blobBase64 = await convertBase64(audioBlob);
      audioFormData.append(`audio_${questionStep}`, audioBlob, "recording.wav");
      let answersListCopy = [...mockResponses];
      answersListCopy.push(blobBase64);
      setAudioFormData(audioFormData);
      setLocalState({ answersList: answersListCopy });
      dispatch(mockInterviewStore({ mockResponses: answersListCopy }));
      setAudioChunks([]);
    };
  };
  const handleNext = () => {
    setQuestionStep(questionStep + 1);
    navigate(`/ConverseIQ?index=${questionStep + 1}`);
  };

  const handleSubmit = async () => {
    setLocalState({ isLoading: true });
    try {
      let finalAudioFormData = new FormData();
      mockResponses?.map((data, index) => finalAudioFormData.append(`audio_${index}`, convertBase64ToBlob(data), "recording.wav"));
      console.log(mockResponses, "mockResponses---->")
      console.log(finalAudioFormData, "finalAudioFormData---->")

      const response = await fetch("https://aibackend.netsmartz.us/api/mock_audio", {
        method: "POST",
        body: finalAudioFormData,
        headers: {
          "Authorization": `Bearer ${token}`,
          // "Content-Type": "multipart/form-data"
        },
        // mode: 'no-cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "data------>"); // Do something with the response data
      let audioFiles = [];
      mockResponses.map((data, index) =>
        audioFiles.push({
          file: data,
          fileName: `audio${index}.wav`,
        }),
      );
      dispatch(mockInterviewStore1({ formSubmitted: true }));
      dispatch(mockInterviewResponseArrStore({ responseArr: [] }));
      localStorage.setItem("feedback", data);
      toast.success(T.ANSWERS_SUBMITTED_SUCCESSFULLY);
      navigate(`/ConverseIQ-responses`, { state: data });
      navigate(`/ConverseIQ-responses`, {
        state: { responseArr: data, createdAt: null },
      });
      setLocalState({ isLoading: false });
    } catch (error) {
      console.error("Error---->:", error);
      dispatch(mockInterviewStore({ mockResponses: [] }));
      dispatch(manageMockInterviewUserLogin({ mockInterviewUserRegistered: false }));
      toast.error(error?.data?.error || "Something Went Wrong.");
      navigate(`/ConverseIQ?ques=0`);
      window.location.reload()
      setLocalState({ isLoading: false });
    }
  };



  useEffect(() => {

    return (() => {
      dispatch(mockInterviewStore({ mockResponses: [] }));
      dispatch(manageMockInterviewUserLogin({ mockInterviewUserRegistered: false }));
    })

  }, [])

  const handleInstructionModal = () => {
    setLocalState({ openInstructionModal: !openInstructionModal });
  };
  const items = [
    { id: 1, text: "Employee Training and Development" },
    { id: 2, text: "Customer Service Performance Evaluation" },
    { id: 3, text: "Sales Team Effectiveness Assessment" },
    { id: 4, text: "Call Center Quality Assurance" },
    { id: 5, text: "Recruitment and Interview Analysis" },
    { id: 6, text: "Academic Presentation Feedback" },
    { id: 7, text: "Public Speaking Coaching" },
    { id: 8, text: "Remote Team Communication Monitoring" },
    { id: 9, text: "Client Interaction Review for Consulting Firms" },
    { id: 10, text: "Healthcare Provider-Patient Communication Improvement" },
    { id: 11, text: "Legal Case Preparation and Mock Trials" },
    { id: 12, text: "Customer Feedback Analysis" },
    { id: 13, text: "Corporate Communication Strategy Assessment" },
    { id: 14, text: "Virtual Meeting Effectiveness Review" },
    { id: 15, text: "Language Learning and Accent Reduction Programs" },
  ]

  const CaseStudies = [
    {
      id: 1,
      title: "Elevating Customer Service Excellence",
      description: "A leading retail chain leveraged our AI communication skills tool to refine customer service interactions. Through real-time feedback and tailored coaching, employees improved their communication style, resulting in increased customer satisfaction and loyalty."
    },
    {
      id: 2,
      title: "Improving Sales Effectiveness",
      description: "A dynamic sales team utilized our AI communication tool to refine their pitch delivery and negotiation tactics. By analyzing customer responses and providing personalized coaching, our solution enabled sales representatives to adapt their communication style, resulting in increased conversion rates and revenue growth."
    },
    {
      id: 3,
      title: "Cultivating Effective Teaching Practices",
      description: "An educational institution utilized our AI communication tool to support faculty in enhancing their teaching effectiveness. By analyzing classroom interactions and student feedback, instructors received personalized coaching on communication strategies, resulting in improved student engagement and learning outcomes."
    },
  ]


  return (
    <Box height={"100vh"} display="flex" flexDirection="column" bgcolor={'#F7F7F7'}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
        }}
      >
        {/* Your Header Logo */}
        {/* <Box component="img" src={HeaderLogo} width={145} pl={3} /> */}
        <Typography
          sx={{
            flexGrow: 1,
            mr: 20,
          }}
          variant="h5"
          color={"white"}
          textAlign="center"
        >
          ChatBOT
        </Typography>
      </Box>

      <Grid bgcolor={'#F7F7F7'} container sx={{ flex: 1, padding: 2 }}>
        <Grid bgcolor={'#F7F7F7'} item xs={12} lg={9} px={2}>
          {/* Horizontal List */}
          <HorizontalList items={items} />

          {/* Chat Container */}
          {/* <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "#f7f7f7", pt: 4, flex: 1 }}
        > */}
          <Grid item sm={8} lg={12}>
            <>
              <ToastContainer position="bottom-right" autoClose={2000} />
              {submitIsLoading || submitResponseFetching || isLoading ? (
                <div className="spinner-container">
                  <InfinitySpin width="200" color="#F86F03" />
                </div>
              ) : (
                <Grid container>
                  <Grid item xs={isMd ? 2 : 3.25} />
                  <Grid
                    item
                    xs={isMd ? 8 : 5.5}
                    className="questionDiv"
                    sx={{
                      position: "absolute",
                      top: "60%",
                      left: "38%",
                      transform: "translate(-50%, -50%)",
                      minHeight: "270px",
                      width: "inherit",
                      minWidth: "300px",
                      maxHeight: "650px",
                      backgroundColor: "background.white",
                      borderRadius: "8px",
                      padding: "50px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "3px 3px 30px -10px rgba(0,0,0,0.3)",
                      overflowY: "auto",
                    }}
                  >
                    {questionStep < 5 ? (
                      <Stack>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography
                            variant="subtitle-2"
                            sx={{
                              flexWrap: "wrap",
                              textAlign: "start",
                              color: TEXT.grayBlue,
                              marginBottom: 1,
                            }}
                          >
                            {`Question ${questionStep + 1}/5`}
                          </Typography>
                          <Tooltip title={T.INSTRUCTIONS} placement="top">
                            <IconButton aria-label="info" onClick={handleInstructionModal}>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            flexWrap: "wrap",
                            textAlign: "start",
                            fontSize: isXs ? "1.3rem" : "1.6rem",
                            lineHeight: isXs ? "1.3" : "1.6",
                            fontWeight: "bold",
                            mb: 1.5,
                          }}
                        >
                          {question ? question : <Skeleton variant="rectangular" width={"inherit"} height={30} />}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography
                        variant="h2"
                        sx={{
                          flexWrap: "wrap",
                          textAlign: "center",
                        }}
                      >
                        Thank You!
                      </Typography>
                    )}
                    {question && questionStep < 5 ?
                      <QuestionsBoxButtons
                        quesStep={questionStep}
                        permission={permission}
                        recordingStatus={recordingStatus}
                        mockResponses={mockResponses}
                        startRecording={startRecording}
                        questionStep={questionStep}
                        stopRecording={stopRecording}
                        handleNext={handleNext}
                        handleSubmit={handleSubmit}
                        audioData={audioData}
                      /> :
                      <>
                        <Typography
                          variant="h4"
                          sx={{
                            flexWrap: "wrap",
                            textAlign: "center",
                          }}
                        >
                          Questions Not Fetched.
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            flexWrap: "wrap",
                            textAlign: "center",
                          }}
                        >
                          Note:Please verify the status of internet connectivity and ensure that microphone permissions are enabled.
                        </Typography>
                      </>
                    }
                  </Grid>
                  <Grid item xs={isMd ? 2 : 3.25} />
                  {openInstructionModal && quesStep === 0 && (
                    <InstructionsModal openInstructionModal={openInstructionModal} handleInstructionModal={handleInstructionModal} />
                  )}
                </Grid>

              )}
            </>
          </Grid>
          {/* </Grid> */}
        </Grid>


        {/* Vertical List of Cards */}
        <VerticalCardList items={CaseStudies} />
      </Grid>
      <Footer />
    </Box>

  );
};


export default InterviewQuestions;
