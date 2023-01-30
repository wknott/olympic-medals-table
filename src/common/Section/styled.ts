import styled from "styled-components";

export const StyledSection = styled.section`
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 0 2px 2px solid ${({ theme }) => theme.colors.secondary};
`;

export const Title = styled.h2`
  font-size: 20px;
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;
