import { getCommentsCount } from "@/pages/api/hello";
import { useEffect, useState } from "react";
import PopoverUser from "./ui/PopoverUser";
import LinkWithTooltip from "./ui/LinkWithTooltip";

export default function PRItem(props) {
  const [comments, setComments] = useState([0]);

  const {
    title,
    comments_num,
    user,
    pullNumber,
    html_url,
    created_at,
    draft,
    labels,
  } = props;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCommentsCount(comments_num);
      setComments((oldCommments) => response.length);
    };

    fetchData();
  }, [comments]);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start  list-group-item-action">
      <div className="ms-2 me-auto">
        <h5>
          <LinkWithTooltip
            tooltip={draft ? `Draft Pull Request` : `Open Pull Request`}
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={draft ? `text-muted icon-sml me-2` : `icon-sml me-2`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
              />
            </svg>
          </LinkWithTooltip>
          <a href={html_url}>{title}</a>
          {labels.length > 0 &&
            labels.map((label) => (
              <span key={label.id} className="badge mx-1">
                {label.name}
              </span>
            ))}
        </h5>
        <div className="fw-light small">
          #{pullNumber} <small>opened on {formattedDate}</small> by{" "}
          <PopoverUser user={user} />
        </div>
      </div>

      <span className="small  d-none d-md-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="icon-sml me-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        {comments}
      </span>
    </li>
  );
}
