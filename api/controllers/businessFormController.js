import prisma from "../../script.js";
import cloudinary from "../config/cloudinary.config.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createBusinessForm = async (req, res) => {
  const {
    name,
    address,
    email,
    primaryColor,
    secondaryColor,
    typeOfBusiness,
    description,
    targetCompanyName,
    targetCompanyEmail,
    targetAudience,
    emailStyle,
    userId,
  } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path);
    } catch (e) {
      console.error("Error uploading file to Cloudinary:", e);
      return res
        .status(500)
        .json({ error: "Error uploading file to Cloudinary" });
    }

    if (!result) {
      return res.status(500).json({ error: "File upload failed" });
    }

    const businessForm = await prisma.businessForm.create({
      data: {
        name,
        address,
        email,
        primaryColor,
        secondaryColor,
        typeOfBusiness,
        description,
        targetCompanyName,
        targetCompanyEmail,
        targetAudience,
        emailStyle,
        user: { connect: { id: Number(userId) } },
        logo: result.secure_url,
      },
    });

    const prompt = `
      Generate an email template for the following business details:
      - Name: ${name}
      - Address: ${address}
      - Email: ${email}
      - Type of Business: ${typeOfBusiness}
      - Description: ${description}
      - Target Company Name: ${targetCompanyName}
      - Target Company Email: ${targetCompanyEmail}
      - Target Audience: ${targetAudience}
      - Email Style: ${emailStyle}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    const emailTemplate = completion.choices[0].message.content;

    await prisma.businessForm.update({
      where: { id: businessForm.id },
      data: { emailTemplate },
    });

    res.status(201).json({ businessForm, emailTemplate, success: "Success!" });
  } catch (err) {
    console.error("Error handling business form submission:", err);
    res.status(500).json({ error: "Error handling business form submission" });
  }
};

export const getBusinessForms = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const businessForms = await prisma.businessForm.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(businessForms);
  } catch (error) {
    console.error("Error fetching business forms:", error);
    res.status(500).json({ error: "Error fetching business forms" });
  }
};

export const getBusinessFormById = async (req, res) => {
  const { businessFormId } = req.params;

  try {
    const businessForm = await prisma.businessForm.findUnique({
      where: { id: Number(businessFormId) },
    });

    if (!businessForm) {
      return res.status(404).json({ error: "Business form not found" });
    }

    res.json(businessForm);
  } catch (error) {
    console.error("Error fetching business form:", error);
    res.status(500).json({ error: "Error fetching business form" });
  }
};

export const updateBusinessForm = async (req, res) => {
  const {
    name,
    address,
    email,
    primaryColor,
    secondaryColor,
    typeOfBusiness,
    description,
    targetCompanyName,
    targetCompanyEmail,
    targetAudience,
    emailStyle,
    userId,
  } = req.body;

  const { businessFormId } = req.params;

  try {
    // Check if the business form exists
    const existingForm = await prisma.businessForm.findUnique({
      where: { id: Number(businessFormId) },
    });

    if (!existingForm) {
      return res.status(404).json({ error: "Business form not found" });
    }

    // If a new file is uploaded, handle the file upload
    let logoUrl = existingForm.logo;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        logoUrl = result.secure_url;
      } catch (e) {
        console.error("Error uploading file to Cloudinary:", e);
        return res
          .status(500)
          .json({ error: "Error uploading file to Cloudinary" });
      }
    }

    // Update the business form details
    const businessForm = await prisma.businessForm.update({
      where: { id: Number(businessFormId) },
      data: {
        name,
        address,
        email,
        primaryColor,
        secondaryColor,
        typeOfBusiness,
        description,
        targetCompanyName,
        targetCompanyEmail,
        targetAudience,
        emailStyle,
        logo: logoUrl,
      },
    });

    // Optionally, regenerate the email template
    const prompt = `
      Update the email template for the following business details:
      - Name: ${name}
      - Address: ${address}
      - Email: ${email}
      - Type of Business: ${typeOfBusiness}
      - Description: ${description}
      - Target Company Name: ${targetCompanyName}
      - Target Company Email: ${targetCompanyEmail}
      - Target Audience: ${targetAudience}
      - Email Style: ${emailStyle}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    const emailTemplate = completion.choices[0].message.content;

    await prisma.businessForm.update({
      where: { id: businessForm.id },
      data: { emailTemplate },
    });

    res.status(200).json({
      businessForm,
      emailTemplate,
      success: "Update successful!",
    });
  } catch (err) {
    console.error("Error updating business form:", err);
    res.status(500).json({ error: "Error updating business form" });
  }
};
