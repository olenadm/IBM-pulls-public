import Head from "next/head";
import { getAllPRs } from "./api/hello";
import PRList from "@/components/PRList";

export const PER_PAGE = 10;

export default function PaginatedPage(props) {
  const { prs, currentPage, totalProducts } = props;

  return (
    <>
      <Head>
        <title>{`Page ${currentPage} - Pull Requests`}</title>
        <meta name="description" content="Pull Requests" />
      </Head>

      <div className="col-sm-12">
        <PRList
          items={prs}
          currentPage={currentPage}
          totalProducts={totalProducts}
          perPage={PER_PAGE}
        />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const page = Number(context.params?.page) || 1;

  const allPRs = await getAllPRs();
  const paginatedPrs = allPRs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (!paginatedPrs.length) {
    return {
      notFound: true,
    };
  }

  // Redirect the first page to `/` to avoid duplicated content
  if (page === 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      prs: paginatedPrs,
      totalProducts: allPRs.length,
      currentPage: page,
    },
    revalidate: 60,
  };
}

export const getStaticPaths = async () => {
  return {
    // Prerender the next 5 pages after the first page, which is handled by the index page.
    // Other pages will be prerendered at runtime.
    paths: Array.from({ length: 5 }).map((_, i) => `/${i + 2}`),
    // Block the request for non-generated pages and cache them in the background
    fallback: "blocking",
  };
};
