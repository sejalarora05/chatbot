import React, { useEffect, useState } from "react";
import Home from "./Home";
import Sidebar from "./Sidebar";
import "./Chatbot.scss";
import { useSelector } from "react-redux";
import { GetAllOrganizationApi } from "../../api_config/api_services";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";

const Chatbot: React.FC = () => {
  const [isSideVisible, setSideVisible] = useState(true);
  const [conversation, setConversation] = useState<any>([]);
  const organizationIds = useSelector((state: any) => state?.auth?.org_ids);
  const selectedOrgId = useSelector((state: any) => state?.auth?.selectedOrgId);
  const notifyError = (message: string) => toast.error(message);
  const [organizationListOption, setOrganizationListOption] = useState([]);
  const { chat_id } = useParams();

  const navigate = useNavigate();

  const handleNewChat = () => {
    setConversation([]);
    navigate("/");
  };

  console.log({ organizationIds });

  useEffect(() => {
    if (organizationIds && organizationIds.length > 0) {
      const transformedData = organizationIds.map((item: any) => ({
        label: item.org_name.charAt(0).toUpperCase() + item.org_name.slice(1),
        value: item.org_id,
      }));
      setOrganizationListOption(transformedData);
    }
  }, [organizationIds]);

  return (
    <Grid className="chatbot">
      <Sidebar
        isSideVisible={isSideVisible}
        setSideVisible={setSideVisible}
        handleNewChat={handleNewChat}
        organizationListOption={organizationListOption}
        chat_id={chat_id}
        conversation={conversation}
        setConversation={setConversation}
      />
      <Home
        isSideVisible={isSideVisible}
        setSideVisible={setSideVisible}
        conversation={conversation}
        setConversation={setConversation}
      />
    </Grid>
  );
};

export default Chatbot;
