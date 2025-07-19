import styled from "@emotion/styled";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-weight: 600;
    color: #495057;
    font-size: 0.9rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
        outline: none;
        border-color: #667eea;
    }

    &:invalid {
        border-color: #dc3545;
    }
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    background: white;
    transition: border-color 0.2s ease;

    &:focus {
        outline: none;
        border-color: #667eea;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid #131314;
    border-bottom: 5px solid #131314;
    &.primary {
        background: #667eea;
        color: white;

        &:hover {
            background: #5a6fd8;
        }

        &:disabled {
            background: #adb5bd;
            cursor: not-allowed;
        }
    }

    &.secondary {
        background: #6c757d;
        color: white;

        &:hover {
            background: #5a6268;
        }
    }
`;

const ErrorText = styled.span`
    color: #dc3545;
    font-size: 0.875rem;
`;

export {
    Form,
    FormGroup,
    Label,
    Input,
    Select,
    ButtonGroup,
    Button,
    ErrorText,
};
