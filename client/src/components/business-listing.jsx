import { NavLink } from "react-router-dom";
import ColorPicker from "./color-picker";

const BusinessList = ({ businessForms }) => {
  return (
    <div className="">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Business Forms
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              {/* <th className="py-3 px-6 text-left">Address</th> */}
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Primary Color</th>
              <th className="py-3 px-6 text-left">Secondary Color</th>
              <th className="py-3 px-6 text-left">Type of Business</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Target Company Name</th>
              <th className="py-3 px-6 text-left">Target Company Email</th>
              <th className="py-3 px-6 text-left">Target Audience</th>
              <th className="py-3 px-6 text-left">Email Style</th>
              <th className="py-3 px-6 text-left">Logo</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {businessForms.map((form) => (
              <tr key={form.id} className="hover:bg-gray-100 transition-colors">
                <NavLink to={`/form/${form.id}`}>
                  <td className="py-4 px-6">{form.id}</td>
                </NavLink>
                <td className="py-4 px-6">{form.name}</td>
                {/* <td className="py-4 px-6">{form.address}</td> */}
                <td className="py-4 px-6">{form.email}</td>
                <td className="py-4 px-6">
                  {<ColorPicker color={form.primaryColor} />}
                </td>
                <td className="py-4 px-6">
                  {<ColorPicker color={form.secondaryColor} />}
                </td>
                <td className="py-4 px-6">{form.typeOfBusiness}</td>
                <td className="py-4 px-6">{form.description}</td>
                <td className="py-4 px-6">{form.targetCompanyName}</td>
                <td className="py-4 px-6">{form.targetCompanyEmail}</td>
                <td className="py-4 px-6">{form.targetAudience}</td>
                <td className="py-4 px-6">{form.emailStyle}</td>
                <td className="py-4 px-6">
                  {form.logo && (
                    <img
                      src={form.logo}
                      alt={form.name}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessList;
