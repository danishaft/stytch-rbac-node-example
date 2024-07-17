interface PageBodyProps {
    children: React.ReactNode;
    className?: string;
}
  
  export const PageBody: React.FC<PageBodyProps> = ({ children, className }) => {
    return (
      <div className={`flex flex-col items-center w-full h-full ${className}`}>
        {children}
      </div>
    );
  };