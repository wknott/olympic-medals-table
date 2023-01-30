import { FC, ReactNode } from "react";
import { StyledSection, Title } from "./styled";

interface Props {
  title: string;
  children: ReactNode;
}

const Section: FC<Props> = ({ title, children }) => (
  <StyledSection>
    <Title>{title}</Title>
    {children}
  </StyledSection>
);

export default Section;
