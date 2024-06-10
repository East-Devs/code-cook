import BusinessList from "@/components/business-listing";
import { useLoaderData, useNavigation } from "react-router-dom";

const Business = () => {
  const result = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <p className="text-gray-600">Loading...</p>;
  }
  return (
    <div className=" container mx-auto p-4 flex justify-center items-center">
      <BusinessList businessForms={result} />
    </div>
  );
};

export default Business;
