import { Alert, Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import type { LoginRequest } from "../types/LoginRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/backendApi";
import { setCredentials } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";


const LoginPage = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [loginRequest] = useLoginMutation();
    const handleLogin = async (loginData: LoginRequest) => {
        try {
            setError("");
            const response = await loginRequest(loginData).unwrap();
            dispatch(setCredentials(response.token));
            const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";
            navigate(destination, { replace: true });
        } catch {
            setError("Invalid Username or Password");
        }
    };

    return (
        <Box className="login-page">
            <Container maxWidth={false} className="login-container">
                <Box className="login-panel">
                    <Box className="login-hero">
                        <Typography variant="overline" className="login-hero-kicker">OPS PLATFORM</Typography>
                        <Typography variant="h3" className="login-hero-title">Manage every operation in one place.</Typography>
                        <Typography className="login-hero-copy">Track products, suppliers, customers, and your team with a clear view of the business.</Typography>
                        <Box className="login-features">
                            {['Real-time inventory visibility', 'Simple supplier management', 'Secure team access'].map((item) => (
                                <Typography key={item} className="login-feature">✓ {item}</Typography>
                            ))}
                        </Box>
                    </Box>
                    <Box className="login-form-panel">
                        <Typography variant="overline" color="primary" className="login-form-kicker">WELCOME BACK</Typography>
                        <Typography variant="h4" className="login-form-title">Sign in to OPS</Typography>
                        <Typography color="text.secondary" className="login-form-copy">Enter your details to continue to your dashboard.</Typography>
                        {error && <Alert severity="error" className="login-error">{error}</Alert>}
                        <LoginForm onLogin={handleLogin} />
                        <Typography variant="body2" color="text.secondary" className="login-footer">Use your OPS account credentials to sign in.</Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;