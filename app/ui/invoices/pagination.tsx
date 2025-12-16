'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          if (page === '...') {
            return (
              <div
                key={index}
                className="flex h-10 w-10 items-center justify-center text-gray-500"
              >
                …
              </div>
            );
          }

          return (
            <Link
              key={index}
              href={createPageURL(page)}
              className={clsx(
                'flex h-10 w-10 items-center justify-center border text-sm',
                {
                  'z-10 border-blue-600 bg-blue-50 text-blue-600':
                    page === currentPage,
                  'border-gray-300 bg-white text-gray-500 hover:bg-gray-100':
                    page !== currentPage,
                }
              )}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const Icon = direction === 'left' ? ArrowLeftIcon : ArrowRightIcon;

  return isDisabled ? (
    <div className="flex h-10 w-10 items-center justify-center text-gray-300">
      <Icon className="w-4" />
    </div>
  ) : (
    <Link
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
    >
      <Icon className="w-4" />
    </Link>
  );
}
