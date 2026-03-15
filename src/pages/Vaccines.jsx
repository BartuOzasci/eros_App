import { vaccinesData } from "../data/vaccinesData";
import { getCurrentYear, getVaccineStatusColor } from "../utils/dateHelpers";

const Vaccines = () => {
  const sortedVaccines = [...vaccinesData].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="px-4 py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-textMain mb-8 bg-white py-2 rounded-2xl shadow-sm">
        Aşı Takvimi ({getCurrentYear()})
      </h2>

      <div className="relative border-l-4 border-orange-100 ml-4 space-y-6">
        {sortedVaccines.map((vaccine) => (
          <div key={vaccine.id} className="relative pl-6">
            <div
              className={`absolute -left-[14px] top-4 w-6 h-6 rounded-full border-4 shadow-sm ${getVaccineStatusColor(vaccine.date, vaccine.isCompleted)}`}
            ></div>

            <div className="bg-white p-4 rounded-2xl shadow-soft">
              <h3 className="font-semibold text-lg text-textMain">
                {vaccine.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {new Date(vaccine.date).toLocaleDateString("tr-TR")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vaccines;
