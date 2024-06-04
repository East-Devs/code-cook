import { useBusinessDetailForm } from "@/hooks/useBusinessDetailForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

const BusinessDetailForm = () => {
  const {
    isPending,
    error,
    success,
    register,
    handleSubmit,
    errors,
    control,
    onSubmit,
  } = useBusinessDetailForm();
  return (
    <CardWrapper
      headerLabel="Please Enter Details"
      headerText="Generate Customized Emails"
      backButtonLabel="Go Back"
      backButtonHref="/"
      className="w-[1150px] shadow-md"
    >
      <Form {...control}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="companyName" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                rules={{ required: "Company Name is required" }}
              />
              <FormField
                control={control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Email</FormLabel>
                    <FormControl>
                      <Input {...field} id="companyEmail" type="email" />
                    </FormControl>
                    <FormMessage>{errors.companyEmail?.message}</FormMessage>
                  </FormItem>
                )}
                rules={{
                  required: "Company Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="userName" type="text" />
                    </FormControl>
                    <FormMessage>{errors.userName?.message}</FormMessage>
                  </FormItem>
                )}
                rules={{ required: "Your Name is required" }}
              />
              <FormField
                control={control}
                name="userCompanyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="userCompanyName" type="text" />
                    </FormControl>
                    <FormMessage>{errors.userCompanyName?.message}</FormMessage>
                  </FormItem>
                )}
                rules={{ required: "Your Company Name is required" }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input {...field} id="userEmail" type="email" />
                    </FormControl>
                    <FormMessage>{errors.userEmail?.message}</FormMessage>
                  </FormItem>
                )}
                rules={{
                  required: "Your Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
              />
              <FormField
                control={control}
                name="subjectLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Line</FormLabel>
                    <FormControl>
                      <Input {...field} id="subjectLine" type="text" />
                    </FormControl>
                    <FormMessage>{errors.subjectLine?.message}</FormMessage>
                  </FormItem>
                )}
                rules={{ required: "Subject Line is required" }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient's Name</FormLabel>
                    <FormControl>
                      <Input {...field} id="recipientName" type="text" />
                    </FormControl>
                    <FormMessage>{errors.recipientName?.message}</FormMessage>
                  </FormItem>
                )}
                rules={{ required: "Recipient Name is required" }}
              />
              <FormField
                control={control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient's Email</FormLabel>
                    <FormControl>
                      <Input {...field} id="recipientEmail" type="email" />
                    </FormControl>
                    <FormMessage>{errors.recipientEmail?.message}</FormMessage>
                  </FormItem>
                )}
                rules={{
                  required: "Recipient Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
              />
            </div>
            <FormField
              control={control}
              name="emailPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of the Email</FormLabel>
                  <FormControl>
                    <Input {...field} id="emailPurpose" type="text" />
                  </FormControl>
                  <FormMessage>{errors.emailPurpose?.message}</FormMessage>
                </FormItem>
              )}
              rules={{ required: "Purpose of the Email is required" }}
            />
            <FormField
              control={control}
              name="emailContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Body Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} id="emailContent" />
                  </FormControl>
                  <FormMessage>{errors.emailContent?.message}</FormMessage>
                </FormItem>
              )}
              rules={{ required: "Email Content is required" }}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isPending}
            >
              Generate Email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default BusinessDetailForm;
