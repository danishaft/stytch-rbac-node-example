interface PageHeadProps {
    children?: React.ReactNode;
    className?: string;
    name: string;
}
  
  export const PageHead: React.FC<PageHeadProps> = ({ children, className, name }) => {
    return (
      <div className={`flex items-center justify-between py-2 mb-3 ${className}`}>
        <p className="page-head-text">{name}</p>
        {children}
      </div>
    );
  };
