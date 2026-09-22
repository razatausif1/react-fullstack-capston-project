// src/components/auth/LoginForm.tsx
import { Box, Button, TextField, Paper } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import type { LoginRequest } from "../../types/LoginRequest";

interface Props {
    onLogin: (loginData: LoginRequest) => Promise<void>;
}

const LoginForm = ({ onLogin }: Props) => {
    const [loginData, setLoginData] = useState<LoginRequest>({
            username: "admin",
            password: "admin"
        });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onLogin(loginData);
    };

    return (
        <Paper elevation={0} className="login-form-paper">
            <form onSubmit={handleSubmit}>
                <Box className="login-form-fields">
                    <TextField
                        label="Username"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoComplete="username"
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoComplete="current-password"
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        className="login-submit"
                    >
                        Login
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default LoginForm;