'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs'; // pastikan sudah install @sentry/nextjs

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke console
    console.error(error);

    // Log error ke Sentry
    Sentry.captureException(error);

    // Jika pakai service lain seperti LogRocket
    // LogRocket.captureException(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-center text-lg font-semibold">Something went wrong!</h2>
      <p className="text-sm text-gray-500">
        An unexpected error occurred. You can try again or contact support.
      </p>
      <button
        onClick={reset}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-400 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
