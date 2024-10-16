import { Button } from '@/components/ui/button';
import ArrowNarrowLeft from '@/assets/icons/arrow-narrow-left.svg';
import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg';

export default function BlogPagination({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  t,
}: PaginationProps) {
  return (
    <>
      <div className="flex items-center justify-center gap-8 pt-8">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="h-auto rounded-xl border-none bg-white p-3 shadow-combinedShadow2 hover:bg-white/50 disabled:cursor-not-allowed disabled:bg-white/50"
        >
          <ArrowNarrowLeft className="h-6 w-6" />
        </Button>
        <span className="font-medium text-[#A2A3A9]">
          {t('pagination.label', { page: currentPage, totalPages: totalPages })}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="h-auto rounded-xl border-none bg-white p-3 shadow-combinedShadow2 hover:bg-white/50 disabled:cursor-not-allowed disabled:bg-white/50"
        >
          <ArrowNarrowRight className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
