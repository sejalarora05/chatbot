import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Box, DialogActions, DialogContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import MISDialog from "./MISDialog";
import MISButton from "./MISButton";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "../../theme/colors";
const StyledTypography = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 600,
  wordWrap: "inherit",
  whiteSpace: "nowrap",
  width: "inherit",
}));

export const StyledBox = ({ heading, def }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "start", margin: "0px 10px", alignItems: "baseline" }}>
      <StyledTypography>{heading}</StyledTypography>
      <Typography variant="body1" sx={{ color: BACKGROUND.black, fontWeight: 500, margin: "0px 10px" }}>
        {def}
      </Typography>
    </Box>
  );
};
StyledBox.propTypes = {
  heading: PropTypes.string,
  def: PropTypes.string,
};

const InstructionsModal = ({ openInstructionModal = false, handleInstructionModal = noop }) => (
  <MISDialog open={openInstructionModal} sx={{ width: "500px" }}>
    <DialogContent sx={{ width: "80vw" }}>
      <Typography variant="h6" sx={{ color: NETSMARTZ_THEME_COLOR, fontWeight: 600, margin: "0px 10px", p: "10px 0px" }}>
        {"Starting Your Mock Interview"}
      </Typography>
      <StyledBox heading="Begin Interview:" def="Click the 'Start' button to initiate the session." />
      <StyledBox
        heading="Question Page:"
        def="You will be presented with a question on each page. A total of 5 questions will be asked during the mock interview."
      />
      <Typography variant="h6" sx={{ color: NETSMARTZ_THEME_COLOR, fontWeight: 600, margin: "0px 10px", p: "10px 0px" }}>
        {"Recording Your Answers"}
      </Typography>
      <StyledBox
        heading="Recording:"
        def="To record your answer, press the 'Answer' button before you start speaking. Speak clearly and directly into your microphone."
      />
      <StyledBox
        heading="Stopping Recording:"
        def="Once you have finished answering the question, click the 'Stop' button to end the recording. Make sure you have fully expressed your answer before stopping the recording."
      />
      <StyledBox
        heading="Playback:"
        def="If you wish to listen to your answer, you can press the 'Playback' button to hear your recording. This will help you evaluate your response and make improvements if necessary."
      />
      <StyledBox
        heading="Next Question:"
        def="After recording your answer, click the 'Next' button to proceed to the next question. Repeat the recording process for each question."
      />
      <StyledBox heading="Note:" def="Re-recording of an answer is not allowed." />

      <Typography variant="h6" sx={{ color: NETSMARTZ_THEME_COLOR, fontWeight: 600, margin: "0px 10px", p: "10px 0px" }}>
        {"Final Steps"}
      </Typography>

      <StyledBox
        heading="Submit Interview:"
        def="Once you have recorded your answers, click the 'Submit' button to complete your session."
      />
      <StyledBox
        heading="Receive Feedback:"
        def="After submission, your answers will be reviewed, and you will receive feedback to help you improve your interview skills."
      />
      <Typography variant="h6" sx={{ color: NETSMARTZ_THEME_COLOR, fontWeight: 600, margin: "0px 10px", p: "10px 0px" }}>
        {"Final Steps"}
      </Typography>
      <Typography variant="body1" sx={{ color: BACKGROUND.black, fontWeight: 500, margin: "0px 10px" }}>
        {"- Ensure your microphone is properly set up and working before starting."}
      </Typography>
      <Typography variant="body1" sx={{ color: BACKGROUND.black, fontWeight: 500, margin: "0px 10px" }}>
        {"- Find a quiet space to record your answers to minimize background noise."}
      </Typography>
      <Typography variant="body1" sx={{ color: BACKGROUND.black, fontWeight: 500, margin: "0px 10px" }}>
        {"- Practice speaking clearly and confidently."}
      </Typography>
      <Typography variant="body1" sx={{ color: BACKGROUND.black, fontWeight: 500, margin: "0px 10px" }}>
        {"- Record each answer for atleast 30-40 seconds for better evalution."}
      </Typography>
    </DialogContent>
 
    <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
      <MISButton variant='' onClick={handleInstructionModal} sx={{ fontSize: "16px" ,backgroundColor: '#EE851E !important' }}>
        {"Got it !"}
      </MISButton>
    </DialogActions>
  </MISDialog>
);

InstructionsModal.propTypes = {
  openInstructionModal: PropTypes.bool,
  handleInstructionModal: PropTypes.func,
};

export default InstructionsModal;
