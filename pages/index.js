import Head from "next/head";
import { getAllPRs } from "./api/hello";
import PRList from "@/components/PRList";
import { PER_PAGE } from "./[page]";

export default function Home(props) {
  const { prs, currentPage, totalProducts } = props;

  return (
    <>
      <Head>
        <title>Pull Requests</title>
        <meta name="description" content="Pull Requests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="col-sm-12">
        <PRList
          items={prs}
          currentPage={currentPage}
          totalProducts={totalProducts}
          perPage={10}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPRs = await getAllPRs();
  //he slicing starts from the Array length of 0 till 9
  const paginatedPrs = allPRs.slice((1 - 1) * PER_PAGE, 1 * PER_PAGE);

  return {
    props: {
      prs: paginatedPrs,
      products: paginatedPrs,
      totalProducts: allPRs.length,
      currentPage: 1,
    },
    revalidate: 60,
  };
}
