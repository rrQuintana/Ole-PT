import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";
import PaymentsIcon from '@mui/icons-material/Payments'; 
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Link from "next/link";

const menuItems = [
  { text: "Users", icon: <PeopleIcon />, path: "/" },
  { text: "Earnings", icon: <PaymentsIcon />, path: "/earnings" },
  { text: "Transactions", icon: <MonetizationOnIcon />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#0A0A0A",
        color: "white",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        p: 2,
      }}
    >
      {/* Logo o título */}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "grey.300", mb: 3 }}>
        My App
      </Typography>

      {/* Menú */}
      <List>
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <ListItemButton
              key={index}
              sx={{
                color: "grey.400",
                borderRadius: 1,
                "&:hover": { bgcolor: "#222", color: "white" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>


      <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 2 }} />

      {/* Footer o Sección Extra */}
      <Typography variant="body2" sx={{ color: "grey.500", mt: "auto" }}>
        © {new Date().getFullYear()} - Olé 
      </Typography>
    </Box>
  );
}
