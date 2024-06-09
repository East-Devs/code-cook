import BusinessDetailForm from "@/components/business-detail-form";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";

const BusinessFormPage = () => {
  const result = useLoaderData();
  const navigation = useNavigation();
  const { formId } = useParams();
  if (navigation.state === "loading") {
    return <p className="text-gray-600">Loading...</p>;
  }
  return (
    <div className="flex justify-center items-center">
      <BusinessDetailForm formData={result || {}} formId={formId} />
    </div>
  );
};

export default BusinessFormPage;
