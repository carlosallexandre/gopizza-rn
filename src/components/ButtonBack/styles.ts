import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;

export const Button = styled(BorderlessButton)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
