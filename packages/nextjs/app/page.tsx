"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { AddProject } from "~~/components/AddProject";
import Project from "~~/components/Project";
import { ProjectIds } from "~~/components/projectIds";

const Home: NextPage = () => {
  const [projectIds, setProjectIds] = useState<string[]>([]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-full max-w-5xl">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Verifier Validation Registry</span>
          </h1>
          <ProjectIds setProjectIds={setProjectIds} />

          <AddProject />

          <div className="space-y-6 mt-6">
            {projectIds.map(projectId => (
              <Project key={projectId} projectId={projectId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
