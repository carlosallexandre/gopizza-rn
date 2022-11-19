import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;

export const Button = styled(BorderlessButton)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
