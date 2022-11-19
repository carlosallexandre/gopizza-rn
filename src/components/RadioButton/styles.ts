import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export interface RadioButtonProps {
  isSelected?: boolean;
}

export const Container = styled.View<RadioButtonProps>`
  width: 102px;
  height: 82px;
  border-radius: 8px;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
`;

export const Button = styled(RectButton)<RadioButtonProps>`
  width: 100%;
  height: 100%;
  padding: 12px 16px;

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.COLORS.SUCCESS_50 : theme.COLORS.TITLE};
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const Radio = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY_900};
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

export const Selected = styled.View`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;
