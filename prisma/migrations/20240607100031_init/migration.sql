-- CreateTable
CREATE TABLE "BusinessForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "typeOfBusiness" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetCompanyName" TEXT NOT NULL,
    "targetCompanyEmail" TEXT NOT NULL,
    "targetAudience" TEXT NOT NULL,
    "emailStyle" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BusinessForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessForm_email_key" ON "BusinessForm"("email");

-- AddForeignKey
ALTER TABLE "BusinessForm" ADD CONSTRAINT "BusinessForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
