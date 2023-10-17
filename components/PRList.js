import PRItem from "./PRItem";
import Pagination from "./Pagination";

export default function PRList(props) {
  const { items, currentPage, totalProducts, perPage } = props;

  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <PRItem
            key={item.id}
            id={item.id}
            title={item.title}
            comments_num={item.comments_url}
            pullNumber={item.number}
            user={item.user}
            html_url={item.html_url}
            created_at={item.created_at}
            draft={item.draft}
            labels={item.labels}
          />
        ))}
      </ul>
      <small className="float-end mt-1">page {currentPage}</small>

      <Pagination
        totalItems={totalProducts}
        currentPage={currentPage}
        itemsPerPage={perPage}
        renderPageLink={(page) => `/${page}`}
      />
    </div>
  );
}
