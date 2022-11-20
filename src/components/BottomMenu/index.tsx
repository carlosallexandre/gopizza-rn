import { Container, Label, BadgeContainer, BadgeLabel } from "./styles";

interface BottomMenuProps {
  title: string;
  color: string;
  notifications?: number;
}

export function BottomMenu({ title, color, notifications }: BottomMenuProps) {
  const hasNofitications = notifications !== undefined && notifications > 0;

  return (
    <Container>
      <Label color={color}>{title}</Label>
      {notifications !== undefined && (
        <BadgeContainer hasNotifications={hasNofitications}>
          <BadgeLabel hasNotifications={hasNofitications}>
            {String(notifications)}
          </BadgeLabel>
        </BadgeContainer>
      )}
    </Container>
  );
}
