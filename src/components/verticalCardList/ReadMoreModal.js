import PropTypes from "prop-types";
import { Box, DialogActions, DialogContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import noop from "lodash/noop";

import MISButton from "../Mockinterview/InterviewQues/MISButton";
import MISDialog from "../Mockinterview/InterviewQues/MISDialog";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "../../utils/theme/colors";
import zIndex from "@mui/material/styles/zIndex";
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
      <StyledTypography textAlign='center'>{heading}</StyledTypography>
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

const ReadMoreModal = ({ openReadMoreModal = false, handleInstructionModal = noop, title, desc }) => (
  <MISDialog open={openReadMoreModal} sx={{ width: "500px", zIndex:'999 !important' }}>
    <DialogContent sx={{ width: "80vw" }}>
      <Typography textAlign='center' variant="h5" sx={{ color: NETSMARTZ_THEME_COLOR, fontWeight: 600, margin: "0px 10px", p: "10px 0px", borderBottom: '1px solid #d8d5d1' }} >
        {title}
      </Typography>
      {/* <StyledBox heading="Begin Interview:" def="Click the 'Start' button and complete the following fields to generate the coding problem statement." />
      <StyledBox
        heading="Question Page:"
        def="You will be presented with a coding question that you need to complete a given time frame."
      /> */}

      <Typography fontWeight={600} variant="body1" sx={{ margin: "0px 10px", p: "10px 0px" }}>
        {desc}
      </Typography>
    </DialogContent>

    <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
      <MISButton variant='' onClick={handleInstructionModal} sx={{ fontSize: "16px", backgroundColor: '#EE851E !important', textAlign:'center', paddingTop:'5px !important' }}>
        {"Got it !"}
      </MISButton>
    </DialogActions>
  </MISDialog>
);

ReadMoreModal.propTypes = {
  openReadMoreModal: PropTypes.bool,
  handleInstructionModal: PropTypes.func,
};

export default ReadMoreModal;
