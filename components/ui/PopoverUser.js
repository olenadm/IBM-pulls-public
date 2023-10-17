import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import Image from "next/image";

export default function PopoverUser(props) {
  const { user } = props;

  const MyPopover = React.forwardRef((props, ref) => {
    return (
      <Popover ref={ref} {...props}>
        <Popover.Header as="h3">{user.login}</Popover.Header>
        <Popover.Body className="text-center">
          <Image
            src={user.avatar_url}
            width={40}
            height={40}
            alt={user.login}
            className="img-thumbnail rounded"
          />
        </Popover.Body>
      </Popover>
    );
    MyPopover.displayName = 'MyPopover';
  });

  return (
    <OverlayTrigger
      trigger={["hover", "hover"]}
      placement="top"
      overlay={<MyPopover props={user} />}
    >
      <a href="#">{user.login}</a>
    </OverlayTrigger>
  );
}

