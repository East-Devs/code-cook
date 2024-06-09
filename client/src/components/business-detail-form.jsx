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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useEffect, useState } from "react";
import ColorPicker from "./color-picker";
import LogoUpload from "./logo-upload";

const BusinessDetailForm = ({ formData, formId }) => {
  const {
    isPending,
    error,
    success,
    handleSubmit,
    errors,
    control,
    onSubmit,
    setValue, // use setValue to programmatically set form values
  } = useBusinessDetailForm({ formId });
  const [previewUrl, setPreviewUrl] = useState(formData.logo || null);
  useEffect(() => {
    // Set initial form values when editing
    if (formData && formId) {
      for (const key in formData) {
        setValue(key, formData[key]);
      }
      if (formData.logo) {
        setPreviewUrl(formData.logo);
      }
    }
  }, [formData, formId, setValue]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setValue("logo", file); // Set form value for logo
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setValue("logo", null); // Clear form value for logo if no file selected
    }
  };
  const handleRemoveFile = () => {
    setPreviewUrl(null);
    setValue("logo", null); // Clear form value for logo if no file selected
  };
  // State to manage selected colors
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState(
    formData.primaryColor || "#FF5733"
  ); // Default primary color

  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState(
    formData.secondaryColor || "#3333FF"
  ); // Default secondary color

  // Handle primary color change and update form value
  const handlePrimaryColorChange = (color) => {
    setSelectedPrimaryColor(color);
    setValue("primaryColor", color, { shouldValidate: true });
  };

  // Handle secondary color change and update form value
  const handleSecondaryColorChange = (color) => {
    setSelectedSecondaryColor(color);
    setValue("secondaryColor", color, { shouldValidate: true });
  };

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
          <FormField
            control={control}
            name="logo"
            render={() => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <LogoUpload
                  handleFileChange={handleFileChange}
                  previewUrl={previewUrl}
                  handleRemoveFile={handleRemoveFile}
                />
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Gardenia Home Goods"
                    />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
              rules={{ required: "Name is required" }}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="address"
                      placeholder="1234 Elm St, Springfield, IL 62704"
                    />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </FormItem>
              )}
              rules={{ required: "Address is required" }}
            />
          </div>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    placeholder="Target Company Email"
                    type="email"
                  />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="primaryColor"
              render={() => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <ColorPicker
                    color={selectedPrimaryColor}
                    onChange={handlePrimaryColorChange}
                  />
                  <FormMessage>{errors.primaryColor?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="secondaryColor"
              render={() => (
                <FormItem>
                  <FormLabel>Secondary Color</FormLabel>
                  <ColorPicker
                    color={selectedSecondaryColor}
                    onChange={handleSecondaryColorChange}
                  />
                  <FormMessage>{errors.secondaryColor?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="typeOfBusiness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Business</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    id="typeOfBusiness"
                    placeholder="Select business type"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Retail – Home Decor">
                        Retail – Home Decor
                      </SelectItem>
                      <SelectItem value="Service – IT">Service – IT</SelectItem>
                      <SelectItem value="Manufacturing">
                        Manufacturing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.typeOfBusiness?.message}</FormMessage>
              </FormItem>
            )}
            rules={{ required: "Type of Business is required" }}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you do?</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="We sell eco-friendly home decor products."
                  />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
            rules={{ required: "Description is required" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="targetCompanyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="targetCompanyName"
                      placeholder="Target Company Name"
                    />
                  </FormControl>
                  <FormMessage>{errors.targetCompanyName?.message}</FormMessage>
                </FormItem>
              )}
              rules={{ required: "Target Company Name is required" }}
            />

            <FormField
              control={control}
              name="targetCompanyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Company Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="targetCompanyEmail"
                      placeholder="Target Company Email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.targetCompanyEmail?.message}
                  </FormMessage>
                </FormItem>
              )}
              rules={{
                required: "Target Company Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
            />
          </div>
          <FormField
            control={control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your target audience?</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="targetAudience"
                    placeholder="Homeowners aged 30-50 interested in sustainability."
                  />
                </FormControl>
                <FormMessage>{errors.targetAudience?.message}</FormMessage>
              </FormItem>
            )}
            rules={{ required: "Target Audience is required" }}
          />

          <FormField
            control={control}
            name="emailStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Style Preference</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    id="emailStyle"
                    placeholder="Select email style"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select email style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.emailStyle?.message}</FormMessage>
              </FormItem>
            )}
            rules={{ required: "Email Style is required" }}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isPending}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default BusinessDetailForm;
