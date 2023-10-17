import { Fragment } from "react";
import { Roboto } from "next/font/google";
import TopHeader from "./TopHeader";
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

function Layout(props) {
  return (
    <Fragment>
      <TopHeader/>
      <main className={`container  my-auto py-5  ${roboto.className}`}>
        <div className="row h-100 justify-content-center align-items-center">
          {props.children}
        </div>
      </main>
    </Fragment>
  );
}

export default Layout;
