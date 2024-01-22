import React, { Suspense } from "react";
const ProjectDetails = React.lazy(() => import("./ProjectDetails"));
import ErrorBoundary from "../../components/ErrorBoundary";

import { Outlet } from "react-router-dom";

const ProjectDetailsIndex: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ProjectDetails />
        </Suspense>
      </ErrorBoundary>
      <Outlet />
    </>
  );
};

export default ProjectDetailsIndex;
