import React, { useState, useEffect, useCallback } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { fetchMails, getThreadMessages } from "../api/reachinboxApi";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import iconlogo from "../assets/appicon.svg";
import homeicon from "../assets/icons/home.svg";
import findicon from "../assets/icons/find.svg";
import mailicon from "../assets/icons/mail.svg";
import sendicon from "../assets/icons/send.svg";
import viewicon from "../assets/icons/view.svg";
import dashboardicon from "../assets/icons/dashboard.svg";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import AboutEmailComponent from "../components/AboutEmailCard";
import EmailComponent from "../components/EmailCard";
import Mail from "../components/Mail";
import { FaReply } from "react-icons/fa";
import DeletePopUp from "../components/DeletePopUp";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const MailPage = () => {
  const [mails, setMails] = useState([]);
  const [selectedMailIndex, setSelectedMailIndex] = useState(0);
  const [threadMessages, setThreadMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    const loadMails = async () => {
      setLoading(true);
      try {
        const mailData = await fetchMails();
        if (Array.isArray(mailData)) {
          setMails(mailData);
          if (mailData.length > 0) {
            setSelectedMailIndex(0);
            loadThreadMessages(mailData[0].threadId);
          }
        } else {
          console.error("Unexpected data format:", mailData);
        }
      } catch (err) {
        console.error("Failed to fetch mails:", err);
        setError("Failed to fetch mails.");
      } finally {
        setLoading(false);
      }
    };

    loadMails();
  }, []);

  const loadThreadMessages = async (threadId) => {
    try {
      const messages = await getThreadMessages(threadId);
      setThreadMessages(messages);
    } catch (err) {
      console.error("Failed to fetch thread messages:", err);
    }
  };

  const handleTabChange = (event, newIndex) => {
    setSelectedMailIndex(newIndex);
    if (mails[newIndex]) {
      loadThreadMessages(mails[newIndex].threadId);
    }
  };

  const handleDelete = useCallback(() => {
    if (mails.length > 0 && selectedMailIndex < mails.length) {
      const updatedMails = [...mails];
      updatedMails.splice(selectedMailIndex, 1);
      setMails(updatedMails);
      if (selectedMailIndex >= updatedMails.length) {
        setSelectedMailIndex(updatedMails.length - 1);
      }
    }
  }, [mails, selectedMailIndex]);

  const handleReply = useCallback(() => {
    if (mails.length > 0 && selectedMailIndex < mails.length) {
      setSelectedThread(mails[selectedMailIndex].threadId);
      setShowPopUp(true);
    }
  }, [mails, selectedMailIndex]);

  const togglePopUp = () => {
    setShowPopUp((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "D" || event.key === "d") {
        setShowDelete(true);
      } else if (event.key === "R" || event.key === "r") {
        handleReply();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDelete, handleReply]);

  const icons = [
    { src: homeicon, link: "#" },
    { src: findicon, link: "#" },
    { src: mailicon, link: "/mail" },
    { src: sendicon, link: "#" },
    { src: viewicon, link: "#" },
    { src: dashboardicon, link: "#" },
  ];

  return (
    <div className="max-h-screen w-full flex dark:bg-[#000000] dark:text-gray-100">
      <div
        name="navbar"
        className="fixed top-0 left-0 flex h-screen w-20 flex-col items-center border-r bg-muted/40 dark:bg-[#101113] py-4"
      >
        <Link to="#" className="mb-6 h-6 w-6">
          <img src={iconlogo} alt="App Icon" />
        </Link>
        <nav className="flex flex-col items-center gap-4">
          {icons.map((icon, index) => (
            <Link
              key={index}
              to={icon.link}
              className="relative flex items-center justify-center h-10 w-10"
            >
              <div className="absolute inset-0 flex items-center justify-center hover:bg-muted hover:rounded-lg hover:scale-100 transition-all duration-300 dark:hover:bg-gray-700">
                <img src={icon.src} alt={`icon-${index}`} className="h-5 w-5" />
              </div>
            </Link>
          ))}
        </nav>
        <div className="mt-auto scale-75">
          <Avatar sx={{ bgcolor: green[500] }}>A</Avatar>
        </div>
      </div>

      <div className="flex-grow ml-20">
        <header
          name="navbar"
          className="fixed top-0 left-20 right-0 flex h-14 items-center gap-4 border-b bg-muted/50 backdrop-blur-md px-6 z-10 dark:bg-[#1F1F1F] dark:border-gray-700"
        >
          <div className="flex items-center gap-4">
            <div className="font-medium">Onebox</div>
          </div>
          <div className="ml-auto flex items-center gap-4"></div>
        </header>

        <main className="mt-14 p-4 md:p-6">
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <Box sx={{ display: "flex", height: "calc(100vh - 4rem)" }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedMailIndex}
                onChange={handleTabChange}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  width: "250px",
                  "& .MuiTabs-indicator": {
                    left: "0",
                    right: "auto",
                    borderLeft: `3px solid blue`,
                  },
                }}
              >
                {mails.length > 0 ? (
                  mails.map((mail, index) => (
                    <Tab
                      key={mail.id}
                      label={
                        <div>
                          <AboutEmailComponent
                            isRead={mail.isRead}
                            fromEmail={mail.fromEmail}
                            sentAt={mail.sentAt}
                            subject={mail.subject}
                          />
                        </div>
                      }
                      {...a11yProps(index)}
                    />
                  ))
                ) : (
                  <Typography>No mails available</Typography>
                )}
              </Tabs>
              <Box sx={{ p: 1, flexGrow: 1, position: "relative" }}>
                {mails.length > 0 ? (
                  <>
                    <TabPanel
                      value={selectedMailIndex}
                      index={selectedMailIndex}
                    >
                      {threadMessages.length > 0 ? (
                        threadMessages.map((message, idx) => (
                          <EmailComponent
                            key={idx}
                            fromEmail={message.fromEmail}
                            toEmail={message.toEmail}
                            subject={message.subject}
                            body={message.body}
                          />
                        ))
                      ) : (
                        <Typography>No messages in this thread</Typography>
                      )}
                    </TabPanel>
                  </>
                ) : (
                  <Typography>No mail selected</Typography>
                )}
              </Box>

              <div
                className="cursor-pointer flex items-center fixed bottom-0 ml-10 mb-10 bg-gradient-to-r from-[#4B63DD] to-[#0524BFFC] rounded-md px-10 py-2"
                onClick={togglePopUp}
              >
                <FaReply className="mr-2 text-xl" /> Reply
              </div>

              {showPopUp && (
                <Mail threadId={selectedThread} onClose={togglePopUp} />
              )}

              {showDelete && (
                <DeletePopUp
                  onCancel={() => setShowDelete(false)}
                  onDelete={handleDelete}
                />
              )}
            </Box>
          )}
        </main>
      </div>
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default MailPage;
