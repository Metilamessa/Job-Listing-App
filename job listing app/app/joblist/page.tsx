import JobCard from "../components/JobCard"
import { jobListing } from "../data/jobs"
import image1 from "../../public/im1.png"
import image2 from "../../public/im2.webp"
import tree from "../../public/tree.svg"
import image  from "../../public/im1.png"


const page = () => {
    const images = [image1, image2, tree, image]
  return ( 
    <main className="pl-8 sm:pl-12 lg:pl-28 pr-10 sm:pr-20 lg:pr-72 py-16 ">
        <div className="flex justify-between">
            <hgroup>
                <h1 className="font-black text-3xl font-heading text-dark-blue">Opportunities</h1>
                
            </hgroup>
            <div className="flex items-center gap-2">
                <p className="text-gray-400 font-body font-medium">Sort by: </p>

                <select className="bg-white w-36 focus:border-collapse font-body font-medium " name="sortby" id="choice">
                    <option defaultValue="most-relevant" value="most-relevant">Most relevant</option>
                    <option value="latest">Latest</option>
                    <option value="popular">Popular</option>
                </select>

            </div>
        </div>

        <section>
            {jobListing.map((job, index) => <JobCard key={index} jobPost={job} pic={images[index % images.length]} jobId={index} />)}
        </section>
    </main>
  )
}

export default page