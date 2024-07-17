interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({children, className }) => {
  return (
    <div className={`container h-full ${className}`}>
      {children}
    </div>
  )
}
