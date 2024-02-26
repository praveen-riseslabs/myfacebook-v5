import React from "react";
import {
  Box,
  // Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  // UseTheme,
} from "@mui/material";
import {
  // SettingOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  // HomeOutlined,
  // Groups2Outlined,
  // ReceiptLongOutlined,
  // TodayOutlined,
  // AdminPanelSettingsOutlined,
  // TrendingUpOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
// import { yellow } from "@mui/material/colors";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const navItem = [
  {
    text: "Dashboard",
    icon: <TableChartOutlinedIcon />,
  },
  {
    text: "My Document",
    icon: <DescriptionOutlinedIcon />,
  },
  {
    text: "My Health",
    icon: <VolunteerActivismIcon />,
  },
  {
    text: "Social",
    icon: <EmojiEmotionsOutlinedIcon />,
  },
  {
    text: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    text: "Twitter",
    icon: <TwitterIcon />,
  },
  {
    text: "FaceBook",
    icon: <FacebookIcon />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  // const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              backgroundColor: "#d2cfcf4d",
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <div style={{}}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h5" fontWeight="bold">
                    MyFacebook
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </div>
            </Box>
            <List>
              {navItem.map(({text, icon}) => {

                const lcText = (text.replaceAll(' ', '').toLocaleLowerCase());

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{ color: active === lcText ? "blue" : "black",
                      backgroundColor: active === lcText ? "#d5d0d0d6" : "#d2cfcf20" }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: active === lcText ? "blue" : "black",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text}/>
                      {active===lcText && (
                        <ChevronRightOutlined sx={{ml:'auto'}}/>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
