import { contactData } from "../data/contactData";
import { Stethoscope, Scissors, Phone, MapPin } from "lucide-react";

const ContactCard = ({ title, icon: Icon, data, bgColor }) => (
  <div className="bg-white p-5 rounded-[30px] shadow-soft mb-6">
    <div
      className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}
    >
      <Icon className="text-gray-700 w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-textMain">{title}</h3>
    <h4 className="text-md text-gray-600 mb-4">{data.name}</h4>

    <div className="space-y-3">
      <a
        href={`tel:${data.phone}`}
        className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
      >
        <Phone className="w-4 h-4 text-green-500" /> {data.phone}
      </a>
      <a
        href={data.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 text-sm text-white bg-orange-400 p-3 rounded-xl hover:bg-orange-500 transition"
      >
        <MapPin className="w-4 h-4" /> Haritada Aç
      </a>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="px-4 py-8 max-w-md mx-auto">
      <ContactCard
        title="Veterinerimiz"
        icon={Stethoscope}
        data={contactData.vet}
        bgColor="bg-blue-100"
      />
      <ContactCard
        title="Pet Kuaförümüz"
        icon={Scissors}
        data={contactData.groomer}
        bgColor="bg-pink-100"
      />
    </div>
  );
};

export default Contact;
