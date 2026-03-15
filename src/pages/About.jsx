import { aboutData } from "../data/aboutData";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white p-6 rounded-[30px] shadow-soft flex flex-col items-center max-w-sm w-full border border-orange-50">
        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 mb-6">
          <img
            src={aboutData.image}
            alt="Eros Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x400/fbd38d/ffffff.png?text=Eros";
            }}
          />
        </div>

        <h1 className="text-3xl font-bold text-textMain mb-2">
          {aboutData.name}
        </h1>

        <div className="flex justify-center gap-2 mt-2 text-sm font-medium text-gray-600">
          <span className="bg-secondary px-3 py-1 rounded-full">
            {aboutData.dob}
          </span>
          <span className="bg-primary/50 px-3 py-1 rounded-full">
            {aboutData.breed}
          </span>
          <span className="bg-blue-100 px-3 py-1 rounded-full">
            {aboutData.weight}
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
