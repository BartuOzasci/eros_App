import { groomerData } from "../data/groomerData";
import { calculateDaysPassed } from "../utils/dateHelpers";
import { Scissors } from "lucide-react";

const Groomer = () => {
  const daysPassed = calculateDaysPassed(groomerData.lastVisit);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-[30px] shadow-soft text-center max-w-sm w-full">
        <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scissors className="text-orange-500 w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-textMain mb-4">Kuaför Kaydı</h2>

        <p className="text-gray-600 mb-2">
          En son pet kuaföre gittiği tarih: <br />
          <span className="font-semibold text-gray-800">
            {new Date(groomerData.lastVisit).toLocaleDateString("tr-TR")}
          </span>
        </p>

        <div className="mt-4 bg-orange-50 p-4 rounded-2xl">
          <span className="text-3xl font-bold text-orange-500">
            {daysPassed}
          </span>
          <p className="text-sm text-gray-500 mt-1">gün geçti</p>
        </div>
      </div>
    </div>
  );
};

export default Groomer;
