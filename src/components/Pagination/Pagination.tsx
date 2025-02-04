import React from 'react';
import ReactPaginate from 'react-paginate';
import { Recipe } from '../../types/Recipe';
import './Pagination.scss';

type Props = {
  filteredRecipes: Recipe[];
  itemsPerPage: number;
  activePage: number;
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  filteredRecipes,
  itemsPerPage,
  setItemOffset,
  activePage,
  setActivePage,
}) => {
  const pageCount = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredRecipes.length;

    setItemOffset(newOffset);
    setActivePage(event.selected);
  };

  return (
    <div className="pagination is-rounded pagination--own-styles">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={7}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination-list pagination__new--list"
        pageLinkClassName="pagination-link"
        previousLinkClassName="pagination-previous"
        nextLinkClassName="pagination-next"
        activeLinkClassName="pagination__is-active"
        forcePage={activePage}
      />
    </div>
  );
};
