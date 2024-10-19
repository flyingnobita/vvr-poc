"use client";

import type { NextPage } from "next";
import { AddProjectButton } from "~~/components/AddProjectButton";
import Project from "~~/components/Project";
import { ProjectIds } from "~~/components/projectIds";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Verifier Validation Registry</span>
          </h1>
          <ProjectIds />
          <AddProjectButton />
          <Project projectId={"p1"} />
        </div>
      </div>
    </>
  );
};

export default Home;
