function CloseButton({ onClick, ariaLabel = 'Close', className = '' }) {
  const defaultClasses =
    'rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300';
  const combinedClassName = className ? `${defaultClasses} ${className}` : defaultClasses;

  return (
    <button
      type="button"
      onClick={onClick}
      className={combinedClassName}
      aria-label={ariaLabel}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

export default CloseButton;
