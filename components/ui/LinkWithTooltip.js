import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

export default function LinkWithTooltip({ id, children, href, tooltip }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="top"
      delayShow={300}
      delayHide={150}
    >
      <a href={href}>{children}</a>
    </OverlayTrigger>
  );
}
