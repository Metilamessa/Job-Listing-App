import Image from "next/image";

interface Props {
    title: string;
    value: string;
    icon: string;
}

const About = ({ title, value, icon }: Props) => (
    <div className="flex mb-2 items-center">
        <div className="w-10 h-10 flex justify-center items-center border rounded-3xl bg-white">
            <Image src={icon} alt={`${title} icon`} />
        </div>
        <div className="ml-4">
            <p className="font-normal text-dark-blue">{title}</p>
            <p className="font-semibold text-dark-blue">{value}</p>
        </div>
    </div>
);

export default About;
