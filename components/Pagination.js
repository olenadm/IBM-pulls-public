import Link from 'next/link'
import React from 'react'
import usePagination from '../hooks/usePagination';
import { dotts } from '../hooks/usePagination';


  
const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  
}) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)

  return (
    <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-center my-3">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={`${pageNumber}`}
            aria-label={`Goto Page ${pageNumber}`}            
            className={`${
              pageNumber === currentPage ? 'text-success' : 'text-black'
            } px-4 py-2 mx-1  no-underline`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </nav>
  )
}

export default Pagination