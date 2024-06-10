import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useEmailPreview } from "@/hooks/useEmailPreview";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { CardWrapper } from "./card-wrapper";
import axios from "axios";

const EmailPreviewPage = ({ emailData, formId }) => {
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState(""); // State to hold uploaded file name
  const {
    isPending,
    error,
    success,
    handleSubmit,
    errors,
    control,
    onSubmit,
    setValue, // use setValue to programmatically set form values
  } = useEmailPreview({ formId });

  useEffect(() => {
    // Set initial form values when editing
    if (emailData && formId) {
      for (const key in emailData) {
        setValue(key, emailData[key]);
      }
    }
  }, [emailData, formId, setValue]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFileName(file.name); // Set uploaded file name
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const emails = worksheet.map((row) => row.email); // assuming the column name is 'email'
      setEmailAddresses(emails);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFormSubmit = async (data) => {
    // Save email content to the backend
    onSubmit(data);

    // Send emails using the backend API
    try {
      await axios.post("http://localhost:3000/api/send-emails", {
        emailContent: data.emailTemplate,
        emailAddresses,
      });
      alert("Emails sent successfully!");
    } catch (err) {
      console.error("Failed to send emails:", err);
      alert("Failed to send emails.");
    }
  };

  return (
    <CardWrapper
      headerLabel="Send Email"
      headerText="Preview Email Template"
      backButtonLabel="Go Back"
      backButtonHref="/"
      className="w-[1500px] shadow-md"
    >
      <div className="container mx-auto p-4">
        <Form {...control}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormField
              control={control}
              name="emailTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Content:</FormLabel>
                  <FormControl>
                    <Textarea {...field} id="emailTemplate" className="h-64" />
                  </FormControl>
                  <FormMessage>{errors.emailTemplate?.message}</FormMessage>
                </FormItem>
              )}
              rules={{ required: "Target Audience is required" }}
            />
            <div
              {...getRootProps()}
              className="border-dashed border-2 p-4 mt-4 mb-2"
            >
              <input {...getInputProps()} />
              <p>
                {uploadedFileName
                  ? `File uploaded: ${uploadedFileName}`
                  : "Drag 'n' drop an Excel file here, or click to select one"}
              </p>
            </div>
            <FormError message={error} className="mt-4 mb-2" />
            <FormSuccess message={success} className="mt-4 mb-2" />
            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isPending}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default EmailPreviewPage;
