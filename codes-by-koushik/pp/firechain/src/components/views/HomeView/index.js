import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  Grid,
  Chip,
  Stack,
  InputAdornment,
  createTheme,
  ThemeProvider,
  CssBaseline,
  alpha,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SearchIcon from "@mui/icons-material/Search";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// Import Solana web3 functionalities
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

// Define the dark theme based on specifications
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8A2BE2", // Vibrant Purple
      light: "#B15EFF",
    },
    secondary: {
      main: "#60A5FA", // Bright Blue
    },
    background: {
      default: "#121212", // Very dark grey/near black
      paper: "#1E1E1E", // Darker gray for cards
    },
    text: {
      primary: "#FFFFFF", // Bright white for main text
      secondary: "#AAAAAA", // Light grey for secondary text
    },
    error: {
      main: "#FF5252", // Bright red
    },
    warning: {
      main: "#FFAB40", // Bright orange
    },
    success: {
      main: "#4CAF50", // Green
    },
    divider: "rgba(255, 255, 255, 0.12)", // Subtle divider
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: "0.5px",
      background: "linear-gradient(45deg, #8A2BE2 30%, #60A5FA 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "0.5px",
      color: "#FFFFFF",
    },
    subtitle1: {
      color: "#AAAAAA",
      letterSpacing: "0.3px",
    },
    body1: {
      letterSpacing: "0.3px",
    },
    body2: {
      letterSpacing: "0.2px",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "0.5px",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 12,
          boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
          "&.MuiAlert-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
          background: "linear-gradient(145deg, #1E1E1E 0%, #282828 100%)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          transition: "all 0.3s ease-in-out",
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #8A2BE2 30%, #60A5FA 90%)",
          boxShadow: "0 4px 10px rgba(138, 43, 226, 0.3)",
          "&:hover": {
            boxShadow: "0 6px 12px rgba(138, 43, 226, 0.5)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.3s ease-in-out",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "#8A2BE2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#8A2BE2",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          },
          transition: "all 0.2s ease-in-out",
        },
        deleteIcon: {
          color: "rgba(255, 255, 255, 0.6)",
          "&:hover": {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardError: {
          backgroundColor: alpha("#FF5252", 0.15),
          "& .MuiAlert-icon": {
            color: "#FF5252",
          },
        },
        standardSuccess: {
          backgroundColor: alpha("#4CAF50", 0.15),
          "& .MuiAlert-icon": {
            color: "#4CAF50",
          },
        },
        standardWarning: {
          backgroundColor: alpha("#FFAB40", 0.15),
          "& .MuiAlert-icon": {
            color: "#FFAB40",
          },
        },
        standardInfo: {
          backgroundColor: alpha("#60A5FA", 0.15),
          "& .MuiAlert-icon": {
            color: "#60A5FA",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#8A2BE2 #1E1E1E",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: "#1E1E1E",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#8A2BE2",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#B15EFF",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#B15EFF",
            },
        },
      },
    },
  },
});

// Define Solana cluster connection
const SOLANA_NETWORK = clusterApiUrl("mainnet-beta");
const connection = new Connection(SOLANA_NETWORK);

export default class HomeView extends React.Component {
  state = {
    address: "",
    balance: null, // Will store SOL balance
    transactions: [], // Will store recent transaction signatures
    isExecutable: null, // Solana accounts can be executable (programs)
    isLoading: false,
    error: null,
    copiedAddress: "",
    inputError: null,
  };

  // Validate Solana public key format
  validateAddress = (addr) => {
    if (!addr) {
      this.setState({ inputError: null });
      return true; // No error if empty
    }
    try {
      new PublicKey(addr); // Check if it's a valid public key format
      this.setState({ inputError: null });
      return true;
    } catch (e) {
      this.setState({ inputError: "Invalid Solana address format." });
      return false;
    }
  };

  handleAddressChange = (event) => {
    const newAddress = event.target.value;
    this.setState({
      address: newAddress,
      error: null,
      // Clear results on new input
      balance: null,
      transactions: [],
      isExecutable: null,
      copiedAddress: "",
    });
    this.validateAddress(newAddress);
  };

  setExampleAddress = (exampleAddr) => {
    this.setState(
      {
        address: exampleAddr,
        error: null,
        balance: null,
        transactions: [],
        isExecutable: null,
        copiedAddress: "",
        inputError: null,
      },
      () => this.fetchWalletData() // Fetch data immediately
    );
  };

  copyAddress = (addr) => {
    navigator.clipboard
      .writeText(addr)
      .then(() => {
        this.setState({ copiedAddress: addr });
        setTimeout(() => this.setState({ copiedAddress: "" }), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy address: ", err);
        this.setState({ error: "Failed to copy address." });
      });
  };

  fetchWalletData = async () => {
    const { address } = this.state;
    if (!this.validateAddress(address)) {
      return;
    }

    this.setState({
      isLoading: true,
      error: null,
      balance: null,
      transactions: [],
      isExecutable: null,
      copiedAddress: "",
    });

    try {
      const publicKey = new PublicKey(address);

      // Fetch balance and account info concurrently
      const [balanceLamports, accountInfo, transactionSignatures] =
        await Promise.all([
          connection.getBalance(publicKey),
          connection.getAccountInfo(publicKey),
          connection.getSignaturesForAddress(publicKey, { limit: 10 }), // Get latest 10 transaction signatures
        ]);

      const balanceSol = balanceLamports / LAMPORTS_PER_SOL;
      const isExecutable = accountInfo?.executable ?? false; // Check if the account is a program

      // Note: Fetching full transaction details requires more calls (connection.getParsedTransaction)
      // and can be rate-limited. For this example, we'll just show signatures.
      const transactions = transactionSignatures.map((tx) => ({
        signature: tx.signature,
        blockTime: tx.blockTime,
        // Add other relevant info if needed, e.g., tx.err, tx.memo
      }));

      this.setState({
        balance: balanceSol.toFixed(6), // Format SOL balance
        isExecutable: isExecutable,
        transactions: transactions,
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching Solana data:", err); // Log the full error object
      let errorMessage =
        "Failed to fetch Solana data. Please check the address and network connection.";
      if (err instanceof Error) {
        // More specific error handling if needed
        if (err.message.includes("Invalid public key")) {
          errorMessage = "Invalid Solana address provided.";
        } else if (err.message.includes("Network request failed")) {
          errorMessage = "Network error. Could not connect to Solana network.";
        }
      }
      this.setState({
        error: errorMessage,
        isLoading: false,
        balance: null,
        isExecutable: null,
        transactions: [],
      });
    }
  };

  initializeFC = (e) => {
    e.preventDefault();
    if (!this.state.isLoading) {
      this.fetchWalletData();
    }
  };

  formatTimestamp = (timestamp) => {
    // Solana timestamps are in seconds
    return timestamp
      ? new Date(timestamp * 1000).toLocaleString()
      : "Timestamp not available";
  };

  render() {
    const {
      address,
      balance,
      transactions,
      isExecutable,
      isLoading,
      error,
      copiedAddress,
      inputError,
    } = this.state;

    // Update with valid Solana addresses (e.g., a known wallet and a program address)
    const exampleAddresses = [
      "So11111111111111111111111111111111111111112", // Solana Foundation Wallet (Example)
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", // SPL Token Program (Example Program)
    ];

    const showResults =
      !isLoading && (balance !== null || transactions.length > 0);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <AccountBalanceWalletIcon
              sx={{
                fontSize: 70,
                mb: 2,
                color: "primary.light",
                filter: "drop-shadow(0 0 8px rgba(138, 43, 226, 0.5))",
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Firechain Solana Tracker
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
              Monitor balances and recent activity for any public Solana wallet
              address
            </Typography>
          </Box>

          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4 },
              mb: 4,
              background: "linear-gradient(145deg, #1E1E1E 0%, #282828 100%)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Get Started
            </Typography>
            <Box
              component="form"
              onSubmit={this.initializeFC}
              sx={{ width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="wallet_address_input"
                label="Solana Wallet Address"
                name="wallet_address_input"
                placeholder="Enter Solana address"
                value={address}
                onChange={this.handleAddressChange}
                autoFocus
                variant="outlined"
                error={!!inputError || (!!error && !isLoading)}
                helperText={
                  inputError ||
                  (error && !isLoading
                    ? error
                    : "Enter a Solana address or use an example below")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceWalletIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  Examples:
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {exampleAddresses.map((exAddr) => (
                    <Chip
                      key={exAddr}
                      label={`${exAddr.substring(0, 4)}...${exAddr.substring(
                        exAddr.length - 4
                      )}`}
                      onClick={() => this.setExampleAddress(exAddr)}
                      onDelete={() => this.copyAddress(exAddr)}
                      deleteIcon={
                        copiedAddress === exAddr ? (
                          <CheckCircleOutlineIcon />
                        ) : (
                          <ContentCopyIcon />
                        )
                      }
                      size="small"
                      clickable
                      title={
                        copiedAddress === exAddr
                          ? "Copied!"
                          : `Click to use, click icon to copy`
                      }
                      sx={{
                        borderColor:
                          copiedAddress === exAddr
                            ? "primary.light"
                            : undefined,
                        borderWidth: copiedAddress === exAddr ? 1 : 0,
                        borderStyle: "solid",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box sx={{ position: "relative", mt: 3, mb: 1 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading || !address || !!inputError}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  sx={{ py: 1.3 }}
                >
                  {isLoading ? "Tracking..." : "Track Wallet"}
                </Button>
              </Box>
            </Box>
          </Paper>

          {error && !isLoading && !inputError && (
            <Alert
              severity="error"
              iconMapping={{
                error: <ErrorOutlineIcon fontSize="inherit" />,
              }}
              sx={{ width: "100%", mb: 3 }}
            >
              {error}
            </Alert>
          )}

          {isLoading && !showResults && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
              <CircularProgress
                size={50}
                sx={{
                  color: "primary.light",
                  "& .MuiCircularProgress-svg": {
                    filter: "drop-shadow(0 0 5px rgba(138, 43, 226, 0.8))",
                  },
                }}
              />
            </Box>
          )}

          {showResults && (
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 4,
                background: "linear-gradient(145deg, #1E1E1E 0%, #282828 100%)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Wallet Details
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                    <strong>Balance:</strong>
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      color: "primary.light",
                      textShadow: "0 0 10px rgba(138, 43, 226, 0.5)",
                    }}
                  >
                    {balance ?? "N/A"} SOL
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                    <strong>Type:</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ color: "text.secondary" }}
                  >
                    {isExecutable === null
                      ? "N/A"
                      : isExecutable
                      ? "Program (Executable)"
                      : "Standard Account"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Recent Transaction Signatures (Latest 10)
              </Typography>
              {transactions.length > 0 ? (
                <List dense sx={{ pt: 0 }}>
                  {transactions.map((tx, index) => (
                    <React.Fragment key={tx.signature}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          px: 1,
                          borderRadius: 2,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              component="div"
                              sx={{ wordBreak: "break-all" }}
                            >
                              <strong>Signature:</strong>{" "}
                              <Link
                                href={`https://explorer.solana.com/tx/${tx.signature}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={tx.signature}
                                sx={{
                                  color: "secondary.main",
                                  fontWeight: "medium",
                                  transition: "color 0.2s ease",
                                  "&:hover": {
                                    color: "secondary.light",
                                    textDecoration: "none",
                                  },
                                }}
                              >
                                {`${tx.signature.substring(
                                  0,
                                  10
                                )}...${tx.signature.substring(
                                  tx.signature.length - 10
                                )}`}
                              </Link>
                            </Typography>
                          }
                          secondary={
                            <Box
                              component="span"
                              sx={{ display: "block", mt: 0.5 }}
                            >
                              <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block" }}
                              >
                                Time: {this.formatTimestamp(tx.blockTime)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < transactions.length - 1 && (
                        <Divider component="li" sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography
                  sx={{ textAlign: "center", color: "text.secondary", py: 3 }}
                >
                  No recent transaction signatures found for this address.
                </Typography>
              )}
            </Paper>
          )}

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              textAlign: "center",
              borderRadius: 4,
            }}
          >
            <InfoOutlinedIcon
              sx={{
                color: "secondary.main",
                mb: 1,
                fontSize: 28,
              }}
            />
            <Typography variant="h6" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Firechain connects to the Solana blockchain via public RPC nodes
              to retrieve public information associated with the address you
              provide. No private keys or personal data are ever required or
              stored.
            </Typography>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
}
