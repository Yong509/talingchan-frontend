import React, { MouseEventHandler, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Button, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

interface buttonProps {
  buttonTitle: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

interface appBarProps {
  id: string;
  title?: string;
  button?: Array<buttonProps>;
  window?: () => Window;
}

const drawerWidth = 240;

const CustomAppBar: React.FC<appBarProps> = (props: appBarProps) => {
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/">
          {props.title ? props.title : "Talingchan Fertilizer"}
        </Link>
      </Typography>
      <Divider />
      <List>
        {props.button?.map((item: buttonProps, index: number) => (
          <ListItem key={item.buttonTitle} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={item.onClick}>
              <ListItemText primary={item.buttonTitle} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          id={props.id}
          component="nav"
          sx={{ bgcolor: "white", color: "black" }}
          elevation={1}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              onClick={() => {
                router.push("/");
              }}
            >
              {props.title ? props.title : "Talingchan Fertilizer"}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <div className="flex flex-row-auto">
                {props.button?.map((item: buttonProps, index: number) => (
                  <div onClick={item.onClick} key={item.buttonTitle}>
                    <Button
                      id={item.buttonTitle}
                      sx={{
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                    >
                      {item.buttonTitle}
                    </Button>
                  </div>
                ))}
              </div>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default CustomAppBar;
