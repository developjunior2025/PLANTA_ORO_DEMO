import {
  Cog,
  Zap,
  Wifi,
  Network,
  FlaskConical,
  Microscope,
  Wrench,
  ClipboardList,
  Handshake,
  Camera,
  type LucideIcon,
} from "lucide-react";
import type { DomainCode } from "../../shared/types";

const ICONS: Record<DomainCode, LucideIcon> = {
  PROC: Cog,
  PTE: Zap,
  IOT: Wifi,
  GPON: Network,
  CC: FlaskConical,
  LAB: Microscope,
  MNT: Wrench,
  RQ: ClipboardList,
  OF: Handshake,
  CAM: Camera,
};

export function NetworkIcon({
  domain,
  size = 18,
  color,
}: {
  domain: DomainCode;
  size?: number;
  color?: string;
}) {
  const Icon = ICONS[domain];
  return <Icon size={size} color={color} strokeWidth={2} />;
}
