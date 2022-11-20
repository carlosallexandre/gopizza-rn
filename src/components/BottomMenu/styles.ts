import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface LabelProps {
  color: string;
}

export const Label = styled.Text<LabelProps>`
  font-size: 18px;
  line-height: 20px;

  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ color }) => color};
`;

interface BadgeProps {
  hasNotifications: boolean;
}

export const BadgeContainer = styled.View<BadgeProps>`
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  margin-left: 8px;

  border-width: 1px;
  border-color: ${({ theme, hasNotifications }) =>
    hasNotifications ? theme.COLORS.SECONDARY_900 : theme.COLORS.SHAPE};
  background-color: ${({ theme, hasNotifications }) =>
    hasNotifications ? theme.COLORS.SUCCESS_900 : "transparent"};
`;

export const BadgeLabel = styled.Text<BadgeProps>`
  font-size: 12px;

  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme, hasNotifications }) =>
    hasNotifications ? theme.COLORS.TITLE : theme.COLORS.SECONDARY_500};
`;
