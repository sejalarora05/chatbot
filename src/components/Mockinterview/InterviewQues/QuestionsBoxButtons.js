import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { get, noop } from "lodash";
import { shallowEqual, useSelector } from "react-redux";
import { convertBase64ToBlob } from ".";
import { NETSMARTZ_THEME_COLOR } from "../../theme/colors";
import { GET_SIZE } from "../../../utils/responsive";
import T from "../../../utils/T";

const QuestionsBoxButtons = ({
  quesStep = '',
  permission = false,
  recordingStatus = "",
  mockResponses = [],
  startRecording = noop,
  questionStep = '',
  stopRecording = noop,
  handleNext = noop,
  handleSubmit = noop,
  audioData = {},
}) => {
  const { isXs } = GET_SIZE();
  const { formSubmitted } = useSelector(
    (state) => ({
      formSubmitted: get(state, "MockInterviewSlice.formSubmitted", false),
    }),
    shallowEqual,
  );
  return (
    <Box>
      {quesStep < 5 ? (
        <Box
          sx={{
            display: isXs ? "block" : "flex",
            justifyContent: "space-between",
          }}
        >
          {permission && recordingStatus === "inactive" ? (
            <Button
              variant="contained"
              startIcon={
                <MicIcon
                  sx={{
                    fontSize: "16px !important",
                    borderRadius: 50,
                    p: 0.2,
                    backgroundColor: "white",
                    color: NETSMARTZ_THEME_COLOR,
                  }}
                />
              }
              sx={{
                fontSize: 16,
                px: 3,
                width: isXs ? "100%" : 125,
                minWidth: "90px",
                py: 1.3,
                mb: 2,
                backgroundColor: NETSMARTZ_THEME_COLOR,
                borderRadius: 2.1,
                "&:hover": {
                  backgroundColor: NETSMARTZ_THEME_COLOR, // Change to your theme color
                },
              }}
              disabled={mockResponses.length > +quesStep}
              onClick={startRecording}
            >
              {T.ANSWER}
            </Button>
          ) : null}

          {recordingStatus === "recording" ? (
            <Button
              variant="contained"
              disabled={mockResponses.length < questionStep}
              startIcon={
                <StopCircleIcon
                  sx={{
                    fontSize: "16px !important",
                    borderRadius: 50,
                    p: 0.2,
                    backgroundColor: "white",
                    color: NETSMARTZ_THEME_COLOR,
                  }}
                />
              }
              sx={{
                fontSize: 16,
                width: isXs ? "100%" : 125,
                px: 4,
                py: 1.3,
                mb: 2,
                backgroundColor: NETSMARTZ_THEME_COLOR,
                borderRadius: 2.1,
                "&:hover": {
                  backgroundColor: NETSMARTZ_THEME_COLOR, // Change to your theme color
                },
              }}
              onClick={stopRecording}
            >
              Stop
            </Button>
          ) : null}
          {mockResponses.length > +quesStep ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <audio
                src={URL.createObjectURL(convertBase64ToBlob(mockResponses[quesStep]))}
                controls
                style={{ width: "220px", height: "40px" }}
              />
            </Box>
          ) : null}

          {quesStep < 4 ? (
            <Button
              variant="outlined"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              disabled={mockResponses.length === quesStep}
              sx={{
                borderColor: "themeColor",
                color: "black",
                fontWeight: "bold",
                borderRadius: 2,
                width: isXs ? "100%" : 100,
                fontSize: "15px",
                px: 1.4,
                py: 1.3,
                mb: 2,
                "&:hover": {
                  borderColor: "themeColor", // Change to your theme color
                },
              }}
            >
              {T.NEXT}
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleSubmit}
              disabled={mockResponses.length < 5 || audioData?.status === "pending" || formSubmitted}
              sx={{
                borderColor: "themeColor",
                color: "black",
                fontWeight: "bold",
                borderRadius: 2,
                width: isXs ? "100%" : 100,
                fontSize: "15px",
                px: 1.4,
                py: 1.3,
                mb: 2,
                "&:hover": {
                  backgroundColor: "themeColor", // Change to your theme color
                  borderColor: NETSMARTZ_THEME_COLOR,
                  color: "white",
                },
              }}
            >
              {T.SUBMIT}
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              padding: "8px 60px",
              fontSize: 24,
              backgroundColor: "themeColor",
              "&:hover": {
                backgroundColor: "themeColor", // Change to your theme color
              },
            }}
          >
            {T.FINISH}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuestionsBoxButtons;

QuestionsBoxButtons.propTypes = {
  quesStep: PropTypes.any,
  permission: PropTypes.bool,
  recordingStatus: PropTypes.string,
  mockResponses: PropTypes.array,
  startRecording: PropTypes.func,
  questionStep: PropTypes.any,
  stopRecording: PropTypes.func,
  handleNext: PropTypes.func,
  handleSubmit: PropTypes.func,
  // audioData: PropTypes.obj,
};
