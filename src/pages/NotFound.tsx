import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-sm leading-7">
        <div>
          <span className="t-path">~</span>
          <span className="t-acc"> $ </span>cd {location.pathname}
        </div>
        <div className="t-acc">bash: cd: {location.pathname}: No such file or directory</div>
        <div className="mt-4">
          <span className="t-path">~</span>
          <span className="t-acc"> $ </span>
          <a href="/" className="t-link">cd ~</a>
          <span className="caret" aria-hidden />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
