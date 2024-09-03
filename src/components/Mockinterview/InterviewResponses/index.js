import { Typography, Divider, Grid, Card, Box, Stack, Tooltip } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { get } from "../../../utils/lodash";
import { GET_SIZE } from "../../../utils/responsive";
import T from "../../../utils/T";
import { ERROR, NETSMARTZ_THEME_COLOR, SUCCESS } from "../../theme/colors";
import { handleError } from "../../../utils/error";
import { MISCurrentUser } from "../../../utils/validations";
import { useLazyGetExistingResponsesQuery } from "../../../api_config/api_services/MockInterview/getExistingResponses";
import {
  manageMockInterviewUserLogin,
  mockInterviewResponseArrStore,
  mockInterviewStore,
  mockInterviewStore1,
} from "../../../api_config/slices/mockInterviewSlice";
import MISButton from "../InterviewQues/MISButton";
import Footer from "../../footer/Footer";


const APP_PREFIX = "/app";
const InterviewResponses = () => {
  const dispatch = useDispatch();
  const { user } = MISCurrentUser();
  const userId = get(user, "user.id", "");

  const [getExistingResponses] = useLazyGetExistingResponsesQuery();
  const { isXs } = GET_SIZE();
  const [createdAt, setCreatedAt] = useState(null);
  const navigate = useNavigate();
  function convertToTitleCase(str) {
    return str.replace(/_/g, " ").replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  // useEffect(() => {
  //   getExistingResponses({ userId })
  //     .unwrap()
  //     .then((res) => {
  //       const createdAt = get(res, "createdAt", []);
  //       setCreatedAt(createdAt);
  //     })
  //     .catch((err) => {
  //       console.log({ err })
  //     })
  // }, []);

  const handleReAttempt = () => {
    getExistingResponses({ userId })
      .unwrap()
      .then((res) => {
        const responseArr = get(res, "mockInterviewLevels", []);
        dispatch(mockInterviewResponseArrStore({ responseArr: responseArr }));
        const resLength = responseArr.length;
        if (resLength > 0) {
          navigate(`/ConverseIQ`);
        }
      })
      .catch(handleError);
    dispatch(mockInterviewStore({ mockResponses: [] }));
    dispatch(mockInterviewStore1({ formSubmitted: false }));
    dispatch(manageMockInterviewUserLogin({ mockInterviewUserRegistered: false }));
  };

  const location = useLocation();
  console.log(location?.state?.responseArr, "location")
  const coloredCard = (item) => {
    return (
      <Box
        sx={{
          minHeight: "106px",
          minWidth: "170px",
        }}
      >
        <Card
          sx={{
            background: "background.white",
            height: "45%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "10px 10px 30px -10px rgba(0,0,0,0.2)",
            minHeight: "inherit",
            minWidth: "inherit",
            alignItems: "center",
            position: "relative",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <Stack display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h6" margin="auto" textAlign={"center"} sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {convertToTitleCase(item.title)}
            </Typography>
          </Stack>
          <Box width={"100%"}>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.8 }}>
              {item.level < 3 ? (
                <Typography sx={{ fontWeight: "bold" }} color={ERROR.main}>
                  Level {item.level}
                </Typography>
              ) : item.level === 3 ? (
                <Typography sx={{ color: NETSMARTZ_THEME_COLOR, fontWeight: "bold" }}>Level {item.level}</Typography>
              ) : (
                <>
                  <Typography sx={{ fontWeight: "bold" }} color={SUCCESS.main}>
                    Level {item.level}
                  </Typography>
                </>

              )}

              <Tooltip title={<span style={{ width: "50px", fontSize: "13px" }}>{item.desc}</span>}>
                <InfoIcon className="info_ic" fontSize="medium" sx={{ ml: 1, cursor: "pointer", color: "gray" }} />
              </Tooltip>
            </Box>
            <Box>
              <Divider />
              <Typography color={"black"} variant="subtitle1">
                {item.desc}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    );
  };

  return (
    <>
      <Box p="10px 20px">
        <Box ml={3} mt={3}>
          <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
            Last Updated: {createdAt}
          </Typography>
        </Box>
        <Grid container p={3} pt={1} spacing={3} sx={{ mt: isXs && "30px" }}>
          {location?.state?.responseArr?.map((item, index) => (
            <Grid item sm={6} lg={3} xs={12} key={index} >
              {coloredCard(item)}
            </Grid>
          ))}
          {/* <Grid item xs={12} textAlign={"center"}>
          <MISButton sx={{ padding: "8px 24px", fontSize: "18px" }} onClick={handleReAttempt}>
            {T.RE_ATTEMPT}
          </MISButton>
        </Grid> */}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
export default InterviewResponses;
