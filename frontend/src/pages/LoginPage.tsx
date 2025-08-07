/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "@/store/slices/authSlice";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

const Card = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    border-style: dashed;
    border-width: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 28rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #1f2937; /* gray-800 */
`;

const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151; /* gray-700 */
`;

const Input = styled.input`
    margin-top: 0.25rem;
    padding: 0.5rem;
    display: block;
    width: 100%;
    border-left-width: 4px;
    border-width: 2px;
    border-color: #d1d5db; /* gray-300 */
    border-radius: 0.375rem;
`;

const Button = styled.button`
    width: 100%;
    background-color: #22c55e; /* green-500 */
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
    margin-top: 10px;

    &:hover {
        background-color: #16a34a; /* green-600 */
    }
`;

const Text = styled.p`
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #4b5563; /* gray-600 */
    text-align: center;
`;

const Link = styled.a`
    color: #22c55e; /* green-500 */
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isLoggedIn } = useSelector(
        (state: RootState) => state.auth
    );
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginRequest(formData));
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <Container>
            <Card>
                <Title>Login</Title>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Button type="submit">
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>

                <Text>
                    Don't have an account?{" "}
                    <Link href="/register">Register here</Link>
                </Text>
            </Card>
        </Container>
    );
};

export default Login;
