import Link from "next/link";
import JobPost from "../models/JobPost";
import Image from "next/image";

const JobCard = ({
  jobPost,
  pic,
  jobId,
}: {
  jobPost: JobPost;
  pic: string;
  jobId: number;
}) => {
  const title = jobPost.title
    .split(" ")
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(" ");

  return (
    <Link href={`/detail/${jobId}`}>
      <div className="p-6 mt-7 border rounded-3xl bg-white grid grid-cols-10 gap-2">
        <div className="rounded-full col-span-1">
          <Image src={pic} alt={title} width={60} height={60} />
        </div>
        <div className="col-span-9">
          <div className="mb-2">
            <h1 className="font-body text-dark-blue">{title}</h1>
            <h2 className="text-grey-subtitle font-body">
              {jobPost.company}
              <span className="text-gray-500 text-2xl relative bottom-1">
                .
              </span>
              {jobPost.about.location}
            </h2>
          </div>
          <p className="font-body text-dark-blue">{jobPost.description}</p>
          <div className="mt-4 flex gap-2">
            <div className="border-r-2 pr-3">
              <span className="rounded-full border-transparent px-4 py-1 text-green-tag bg-green-tag bg-opacity-10">
                In Person
              </span>
            </div>
            <button className="font-heading rounded-full border px-4 border-my-yellow hover:bg-my-yellow hover:text-white text-my-yellow">
              Education
            </button>
            <button className="font-heading text-purple-tag border pr-4 pl-4 rounded-xl border-purple-tag hover:bg-purple-tag hover:text-white">
              IT
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
