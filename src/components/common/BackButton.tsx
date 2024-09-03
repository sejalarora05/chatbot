import React from "react"
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NETSMARTZ_THEME_COLOR } from "../../utils/theme/colors";


const BackButton = (props: any) => {

    const {title, handleBack, style} = props;

    return (
        <div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleBack()}
          sx={{
            textAlign: "center",
            display: "flex",
            boxShadow: 0,
            color: NETSMARTZ_THEME_COLOR,
            borderRadius: 1.5,
            textTransform: "capitalize",
            fontWeight: 600,
          }}
          style={style}
        >
          <ArrowBackIcon
            style={{
              width: "30px",
              height: "30px",
              color: NETSMARTZ_THEME_COLOR,
              marginRight: '5px'
            }}
          />
          {`${title}` || `Back`}
        </Button>
      </div>
    )
}

export default BackButton;