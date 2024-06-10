import EmailPreviewPage from "@/components/email-preview-page";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";

const EmailPreview = () => {
  const result = useLoaderData();
  const navigation = useNavigation();
  const { formId } = useParams();
  if (navigation.state === "loading") {
    return <p className="text-gray-600">Loading...</p>;
  }
  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <EmailPreviewPage emailData={result || {}} formId={formId} />
    </div>
  );
};

export default EmailPreview;
