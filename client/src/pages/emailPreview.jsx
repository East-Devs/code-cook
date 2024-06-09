import EmailPreviewPage from "@/components/email-preview-page";
import { useLoaderData, useNavigation } from "react-router-dom";

const EmailPreview = () => {
  const result = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <p className="text-gray-600">Loading...</p>;
  }
  return (
    <div>
      <EmailPreviewPage emailData={result} />
    </div>
  );
};

export default EmailPreview;
