import About from "../../components/jobspageleft";
import Image from "next/image";
import calendarCheckIcon from "../../../public/calendar-check.svg";
import calendarStartIcon from "../../../public/calendar-start.svg";
import greenCheckIcon from "../../../public/green-check.svg";
import locationIcon from "../../../public/Icon-location.svg";
import fireIcon from "../../../public/fireIcon.svg";
import plusIcon from "../../../public/plus-circle.svg";

import { jobListing } from "../../data/jobs";

const page = ({ params }: { params: { id: string } }) => {
  const index = parseInt(params.id);

  if (index > jobListing.length) return <h1>Not Found</h1>;

  const jobPost = jobListing[index];

  const colors = [
    ["text-orange", "bg-orange"],
    ["text-green", "bg-green"],
  ];

  return (
    <main className="md:grid grid-cols-4 p-8">
      <section className="col-span-3 pr-12 py-12">
        <div className="mb-8">
          <h1 className="pl-8 mb-2 font-black font-heading text-xl text-dark-blue">
            Description
          </h1>
          <div className="pl-8 text-dark-blue font-body text-base ">
            {jobPost.description}
          </div>
        </div>
        <div className="mb-8">
          <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">
            Responsibilities
          </h1>
          {jobPost.responsibilities.map((responsibility, index) => {
            return (
              <li
                key={index}
                className="pl-8 list-none flex my-3 text-dark-blue font-body text-base"
              >
                {" "}
                <span>
                  <Image
                    className="flex items-center mr-2"
                    src={greenCheckIcon}
                    alt="check-icon"
                  />
                </span>{" "}
                {responsibility}
              </li>
            );
          })}
        </div>
        <div className="mb-8">
          <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">
            Ideal Candidate we want
          </h1>

          <ul className="ml-14 list-disc text-balance mt-2">
            <li className="font-body items-center text-base font-bold text-dark-blue mb-1">
              {jobPost.ideal_candidate.age === "Any" ? (
                <span>{jobPost.ideal_candidate.age} age, </span>
              ) : (
                <span>Young({jobPost.ideal_candidate.age})</span>
              )}{" "}
              {jobPost.ideal_candidate.gender === "Any" ? (
                <span> {jobPost.ideal_candidate.gender} gender </span>
              ) : (
                jobPost.ideal_candidate.gender
              )}{" "}
              {jobPost.title}
            </li>
            {jobPost.ideal_candidate.traits.map((trait) => {
              const trait_title = trait.split(":");
              if (trait_title.length == 2) {
                return (
                  <li className="font-body font-normal text-base mb-1">
                    <span className="font-bold text-dark-blue">
                      {trait_title[0]}
                    </span>
                    : {trait_title[1]}
                  </li>
                );
              }
              return (
                <li className="font-body font-normal text-base mb-1">
                  {trait_title[0]}
                </li>
              );
            })}
          </ul>

          <div></div>
        </div>
        <div className="mb-8">
          <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">
            When & where
          </h1>
          <div className="pl-6 font-body font-normal text-base flex items-center gap-4 mt-2">
            <div className="w-10 h-10 flex justify-center items-center border rounded-3xl bg-white">
              <Image src={locationIcon} alt="icon" />
            </div>
            {jobPost.when_where}
          </div>
        </div>
      </section>

      <aside className="col-span-1">
        <div className="border-b-2 flex flex-col gap-3 mb-3">
          <h2 className="font-bold mb-2 font-heading text-xl text-dark-blue">
            About
          </h2>

          <About
            title="Posted On"
            value={jobPost.about.posted_on}
            icon={plusIcon}
          />
          <About
            title="Deadline"
            value={jobPost.about.deadline}
            icon={fireIcon}
          />
          <About
            title="Location"
            value={jobPost.about.location}
            icon={locationIcon}
          />
          <About
            title="Start Date"
            value={jobPost.about.start_date}
            icon={calendarStartIcon}
          />
          <About
            title="End Date"
            value={jobPost.about.end_date}
            icon={calendarCheckIcon}
          />
        </div>
        <div className="border-b-2 mt-3 mb-3 pb-4">
          <h2 className="font-bold font-heading text-xl text-dark-blue">
            Categories
          </h2>
          <div className="flex gap-4 mt-4">
            {jobPost.about.categories.map((category, index) => {
              const color = colors[index % colors.length];
              return (
                <div
                  key={index}
                  className={`rounded-full border-transparent px-4 py-1 ${color[0]} ${color[1]} bg-opacity-10`}
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3">
          <h2 className="font-bold font-heading text-xl text-dark-blue ">
            Required Skills
          </h2>
          <div className="flex gap-2 mt-2 flex-wrap">
            {jobPost.about.required_skills.map((skill, index) => {
              return (
                <div
                  key={index}
                  className="rounded-full border-transparent px-4 py-1 text-purple-tag bg-purple-tag bg-opacity-10"
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </main>
  );
};

export default page;
