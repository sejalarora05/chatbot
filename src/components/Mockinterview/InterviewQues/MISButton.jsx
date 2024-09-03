import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { NETSMARTZ_THEME_COLOR } from "../../theme/colors";

const MISButton = ({ children, variant, sx, ...rest }) => {
  return variant !== "outlined" ? (
    <Button
      variant="contained"
      size="small"
      sx={{
        bgcolor: NETSMARTZ_THEME_COLOR,
        "&:hover": {
          bgcolor: NETSMARTZ_THEME_COLOR,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  ) : (
    <Button variant="outlined" size="small" color="warning" sx={{ ...sx }} {...rest}>
      {children}
    </Button>
  );
};

MISButton.propTypes = { children: PropTypes.any.isRequired, variant: PropTypes.string.isRequired, sx: PropTypes.object };

export default MISButton;
