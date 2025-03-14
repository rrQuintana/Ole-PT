import { Box, Typography, Link } from "@mui/material";
import Image from "next/image";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mx: "auto",
        mt: "auto",
        py: 4,
        px: 3,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        bgcolor: "black",
        color: "white",
      }}
    >
      {/* Logo */}
      <Image src="/vercel.svg" alt="Logo" width={20} height={20} />

      {/* Texto central */}
      <Typography variant="body2" color="grey.500">
        Made by Roberto Quintana with ❤️ and Next.js
      </Typography>

      {/* LinkedIn */}
      <Link
        href="www.linkedin.com/in/rrquintana-dev"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: "grey.500",
          display: "flex",
          alignItems: "center",
          transition: "color 0.3s ease-in-out",
          "&:hover": {
            color: "grey.400",
          },
        }}
      >
        <LinkedInIcon sx={{ fontSize: 24 }} />
      </Link>
    </Box>
  );
}
