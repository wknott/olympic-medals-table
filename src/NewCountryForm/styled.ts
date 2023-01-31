import styled from "styled-components";

export const StyledForm = styled.form`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  grid-gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
`;

export const Label = styled.label`
  display: grid;
  grid-template-columns: 1fr;
`;

export const LabelText = styled.span`
  margin-bottom: 4px;
  text-align: left;
`;

export const Select = styled.select`
  padding: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  max-width: 80px;
  padding: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}px) {
    max-width: 100%;
  }
`;

export const Button = styled.button`
  align-self: end;
  padding: 10px;
  max-height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    cursor: pointer;
    filter: brightness(115%);
    transform: scale(1.05);
  }
  &:active {
    filter: brightness(130%);
  }
`;
