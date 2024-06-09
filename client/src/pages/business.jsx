import BusinessList from "@/components/business-listing";
import { useLoaderData, useNavigation } from "react-router-dom";

const Business = () => {
  const result = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <p className="text-gray-600">Loading...</p>;
  }
  return (
    <div>
      <BusinessList businessForms={result} />
    </div>
  );
};

export default Business;
