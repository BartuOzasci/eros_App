export const calculateDaysPassed = (pastDateString) => {
  const pastDate = new Date(pastDateString);
  const today = new Date();
  const diffTime = Math.abs(today - pastDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getVaccineStatusColor = (dateString, isCompleted) => {
  if (isCompleted) return "bg-green-100 text-green-700 border-green-400";

  const vaccineDate = new Date(dateString);
  const today = new Date();

  if (vaccineDate < today) return "bg-red-100 text-red-700 border-red-400";
  return "bg-gray-100 text-gray-700 border-gray-300";
};
