import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export type StatusTypesProps = "Preparando" | "Pronto" | "Entregue";

interface ContainerProps {
  index: number;
}

export const Container = styled.View<ContainerProps>`
  width: 50%;
  align-items: center;

  ${({ theme, index }) => css`
    border-right-width: ${index % 2 > 0 ? 0 : 1}px;
    border-right-color: ${theme.COLORS.SHAPE};
  `}
`;

export const Button = styled(RectButton)`
  width: 100%;
  padding: 24px;
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 12px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};
  `}
`;

interface StatusProps {
  status: StatusTypesProps;
}

export const StatusContainer = styled.View<StatusProps>`
  padding: 4px 16px;
  border-radius: 12px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;

  ${({ theme, status }) =>
    status === "Preparando" &&
    css`
      background-color: ${theme.COLORS.ALERT_50};
      border: 1px solid ${theme.COLORS.ALERT_900};
    `}

  ${({ theme, status }) =>
    status === "Pronto" &&
    css`
      background-color: ${theme.COLORS.SUCCESS_900};
    `}

  ${({ theme, status }) =>
    status === "Entregue" &&
    css`
      background-color: ${theme.COLORS.SECONDARY_900};
    `}
`;

export const StatusLabel = styled.Text<StatusProps>`
  font-size: 12px;
  line-height: 20px;

  ${({ theme, status }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${status === "Preparando"
      ? theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};
  `}
`;
