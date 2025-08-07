/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "@/store/slices/authSlice";

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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 28rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #1f2937; /* gray-800 */
`;

const ErrorBox = styled.div`
    margin-bottom: 1rem;
    color: #f87171; /* red-500 */
    background-color: #fef2f2; /* red-50 */
    padding: 0.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151; /* gray-700 */
    display: block;
`;

const Input = styled.input`
    margin-top: 0.25rem;
    padding: 0.5rem;
    border-left: 4px solid;
    border: 2px solid #d1d5db; /* gray-300 */
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    width: 100%;
`;

const Button = styled.button<{ disabled?: boolean }>`
    width: 100%;
    background-color: #22c55e; /* green-500 */
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: #16a34a; /* green-600 */
    }

    &:disabled {
        background-color: #86efac; /* green-200 */
        cursor: not-allowed;
    }
`;

const Footer = styled.p`
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #4b5563; /* gray-600 */
    text-align: center;
`;

const FooterLink = styled.a`
    color: #22c55e; /* green-500 */
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isLoggedIn } = useSelector(
        (state: RootState) => state.auth
    );

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerRequest(formData));
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <Container>
            <Card>
                <Title>Register</Title>

                <Form onSubmit={handleSubmit}>
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </Button>
                </Form>

                <Footer>
                    Already have an account?{" "}
                    <FooterLink href="/login">Login here</FooterLink>
                </Footer>
            </Card>
        </Container>
    );
};

export default Register;
