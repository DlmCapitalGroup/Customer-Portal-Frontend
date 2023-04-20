import Modal2 from "../Modal";
import Table from "../TableComponent";

const DetailsModal = ({
    title,
    customerDetails,
    hasTransactions,
    transactions,
    reqId,
    cancel,
    prevPage,
    nextPage,
    totalPages,
    currentPage,
    isAdmin,
    type,
    approveReq,
    declineReq,
    menu2,
    toggleMenu2 = () => console.log("clicked"),
}: any) => {
    return (
        <Modal2 isCancel cancel={cancel}>
            <div className="max-w-4xl container pb-10 pt-10 flex flex-col gap-y-3">
                {title && (
                    <p className="mb-10 text-lg font-semibold">{title}</p>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="">
                        <>
                            {customerDetails?.firstName &&
                                (customerDetails.lastName ||
                                    customerDetails.surname) && (
                                    <>
                                        <b className="mr-5">Full Name</b>
                                        <p className="mb-5 text-sm mt-1">
                                            {customerDetails?.firstName}{" "}
                                            {customerDetails.middleName &&
                                                customerDetails.middleName +
                                                    " "}
                                            {customerDetails?.lastName ||
                                                customerDetails?.surname}
                                        </p>
                                    </>
                                )}
                        </>
                        <>
                            {customerDetails?.age && (
                                <>
                                    <b className="mr-5">Age</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.age}
                                    </p>
                                </>
                            )}
                        </>
                        <>
                            {(customerDetails?.emailAddress ||
                                customerDetails.email) && (
                                <>
                                    <b className="mr-5">Email Address</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.emailAddress ||
                                            customerDetails.email}
                                    </p>
                                </>
                            )}
                        </>
                        <>
                            {(customerDetails?.residentialAddress ||
                                customerDetails?.address) && (
                                <>
                                    <b className="mr-5">Residential Address</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.residentialAddress ||
                                            customerDetails?.address}
                                    </p>
                                </>
                            )}
                        </>
                        <>
                            {customerDetails?.postalCode && (
                                <>
                                    <b className="mr-5">Postal Code</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.postalCode}
                                    </p>
                                </>
                            )}
                        </>
                        <>
                            {customerDetails?.placeOfBirth && (
                                <>
                                    <b className="mr-5">Place Of Birth</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.placeOfBirth}
                                    </p>
                                </>
                            )}
                        </>
                    </div>
                    <div className="">
                        <>
                            {customerDetails?.birthDate && (
                                <>
                                    <b className="mr-5">Birth Date</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.birthDate
                                            .slice(0, 10)
                                            .split("-")
                                            .reverse()
                                            .join("-")}
                                    </p>
                                </>
                            )}
                        </>
                        <>
                            {(customerDetails?.phoneNumber ||
                                customerDetails?.phone) && (
                                <>
                                    <b className="mr-5">Phone Number</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.phoneNumber ||
                                            customerDetails?.phone}
                                    </p>
                                </>
                            )}
                        </>
                        <>
                            {(customerDetails?.country ||
                                customerDetails?.nationality) && (
                                <>
                                    <b className="mr-5">Country:</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.country ||
                                            customerDetails?.nationality}
                                    </p>
                                </>
                            )}
                        </>
                        <>
                            {customerDetails?.state && (
                                <>
                                    <b className="mr-5">State</b>
                                    <p className="mb-5 text-sm mt-1">
                                        {customerDetails?.state}
                                    </p>
                                </>
                            )}
                        </>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
                    {customerDetails?.occupation && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Occupation:</b>
                            {customerDetails?.occupation}
                        </p>
                    )}
                    {customerDetails?.idType && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">ID Type:</b>
                            {customerDetails?.idType}
                        </p>
                    )}
                    {customerDetails?.idNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Id Number:</b>
                            {customerDetails?.idNumber}
                        </p>
                    )}
                    {customerDetails.IdIssueDate && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Issue Date:</b>
                            {customerDetails?.idIssueDate}
                        </p>
                    )}
                    {customerDetails.ExpiryDate && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Expiry Date:</b>
                            {customerDetails?.ExpiryDate}
                        </p>
                    )}
                    {(customerDetails?.bankName || customerDetails?.bank) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Bank:</b>
                            {customerDetails?.bankName || customerDetails?.bank}
                        </p>
                    )}
                    {customerDetails?.accountName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Account Name:</b>
                            {customerDetails?.accountName}
                        </p>
                    )}
                    {customerDetails?.accountNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Account Number:</b>
                            {customerDetails?.accountNumber}
                        </p>
                    )}
                    {customerDetails?.branch && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Branch:</b>
                            {customerDetails?.branch}
                        </p>
                    )}
                    {customerDetails?.bvn && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">BVN:</b>
                            {customerDetails?.bvn}
                        </p>
                    )}
                    {(customerDetails?.nextOfKinName ||
                        customerDetails.nameNOK ||
                        (customerDetails.firstNameNok &&
                            customerDetails.lastNameNok)) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Next Of KinName:</b>
                            {customerDetails?.nextOfKinName ||
                                customerDetails.nameNOK ||
                                customerDetails.firstNameNok +
                                    " " +
                                    customerDetails.lastNameNok}
                        </p>
                    )}
                    {(customerDetails.emailAddressNOK ||
                        customerDetails?.emailNok) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Next Of Kin Email:</b>
                            {customerDetails?.emailAddressNOK ||
                                customerDetails?.emailNok}
                        </p>
                    )}
                    {(customerDetails.phoneNumberNOK ||
                        customerDetails.phoneNumberNok) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Next Of Kin Phone:</b>
                            {customerDetails.phoneNumberNOK ||
                                customerDetails.phoneNumberNok}
                        </p>
                    )}
                    {(customerDetails?.addressNOK ||
                        customerDetails?.residentialAddressNOK ||
                        customerDetails?.addressNok) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Next Of Kin Address:</b>
                            {customerDetails?.addressNOK ||
                                customerDetails?.residentialAddressNOK ||
                                customerDetails?.addressNok}
                        </p>
                    )}
                    {customerDetails?.contactAddressNOK && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Next Of Kin Contact Address:</b>
                            {customerDetails?.contactAddressNOK}
                        </p>
                    )}
                    {customerDetails.countryNok && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Next Of Kin Country:</b>
                            {customerDetails?.countryNok}
                        </p>
                    )}
                    {(customerDetails.cityNOK || customerDetails?.cityNok) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Next Of Kin City:</b>
                            {customerDetails?.cityNOK ||
                                customerDetails?.cityNok}
                        </p>
                    )}
                    {(customerDetails?.relationshipWithNOK ||
                        customerDetails?.relationshipWithNok) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Relationship with Next Of Kin:
                            </b>
                            {customerDetails?.relationshipWithNOK ||
                                customerDetails?.relationshipWithNok}
                        </p>
                    )}
                    {(customerDetails?.formOfIdentity ||
                        customerDetails?.meansOfId) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Form Of Identity:</b>
                            {customerDetails?.formOfIdentity ||
                                customerDetails?.meansOfId}
                        </p>
                    )}
                    {(customerDetails?.passportPhoto ||
                        customerDetails?.passportPicture) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Passport Photo:</b>
                            {customerDetails?.passportPhoto ||
                                customerDetails?.passportPicture}
                        </p>
                    )}
                    {customerDetails?.utilityBill && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Utility Bill:</b>
                            {customerDetails?.utilityBill}
                        </p>
                    )}
                    {customerDetails?.unitHolderSignature && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Unit Holder Signature:</b>
                            {customerDetails?.unitHolderSignature}
                        </p>
                    )}
                    {customerDetails.investmentAmount && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Investment Amount:</b>
                            {customerDetails?.investmentAmount}
                        </p>
                    )}
                    {(customerDetails.investmentFrequency ||
                        customerDetails.investmentFreq) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Investment Frequency:</b>
                            {customerDetails?.investmentFrequency ||
                                customerDetails.investmentFreq}
                        </p>
                    )}
                    {customerDetails.goalToAchieve && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Goal To Achieve:</b>
                            {customerDetails?.goalToAchieve}
                        </p>
                    )}
                    {customerDetails.estimatedAmountForGoal && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Estimated Amount For Goal:</b>
                            {customerDetails?.estimatedAmountForGoal}
                        </p>
                    )}
                    {customerDetails.expectedDateForGoalAchievement && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Expected Date For Goal Achievement:
                            </b>
                            {customerDetails?.expectedDateForGoalAchievement}
                        </p>
                    )}
                    {customerDetails.investmentAmountPerTime && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Investment Amount Per Time:</b>
                            {customerDetails?.investmentAmountPerTime}
                        </p>
                    )}
                    {customerDetails?.date && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Target Date:</b>
                            {customerDetails?.date}
                        </p>
                    )}
                    {(customerDetails.hearAboutUs ||
                        customerDetails?.heardAboutUs) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">How Did You Hear About Us:</b>
                            {customerDetails.hearAboutUs ||
                                customerDetails?.heardAboutUs}
                        </p>
                    )}
                    {customerDetails.isAJointApplicant && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Joint Applicant:</b>
                            {customerDetails?.isAJointApplicant === true
                                ? "Yes"
                                : "No"}
                        </p>
                    )}
                    {customerDetails.jointApplicantsName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Joint Applicant's Name:</b>
                            {customerDetails?.jointApplicantsName}
                        </p>
                    )}
                    {(customerDetails.prefCommunicationMode ||
                        customerDetails?.preferredCommunicationMode) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Preferred Communication Mode:
                            </b>
                            {customerDetails.prefCommunicationMode ||
                                customerDetails?.preferredCommunicationMode}
                        </p>
                    )}
                    {customerDetails.interestReinvestment && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">InterestReinvestment:</b>
                            {customerDetails?.interestReinvestment === true
                                ? "Yes"
                                : "No"}
                        </p>
                    )}
                    {customerDetails.residenceJurisdiction && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Residence Jurisdiction:</b>
                            {customerDetails?.residenceJurisdiction}
                        </p>
                    )}
                    {customerDetails.usTin && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Us Tin:</b>
                            {customerDetails?.usTin}
                        </p>
                    )}

                    {customerDetails?.companyName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Company Name:</b>
                            {customerDetails?.companyName}
                        </p>
                    )}
                    {customerDetails?.registrationDate && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Registration Date:</b>
                            {customerDetails?.registrationDate}
                        </p>
                    )}
                    {customerDetails?.rCNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">RC Number:</b>
                            {customerDetails?.rcNumber}
                        </p>
                    )}
                    {customerDetails?.contactPersonFirstName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Contact Person FirstName:</b>
                            {customerDetails?.contactPersonFirstName}
                        </p>
                    )}
                    {customerDetails?.contactPersonMiddleName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Contact Person Middle Name:</b>
                            {customerDetails?.contactPersonMiddleName}
                        </p>
                    )}
                    {customerDetails?.contactPersonLastName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Contact Person Last Name:</b>
                            {customerDetails?.contactPersonLastName}
                        </p>
                    )}
                    {customerDetails?.corporatePhoneNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Corporate PhoneNumber:</b>
                            {customerDetails?.corporatePhoneNumber}
                        </p>
                    )}

                    {customerDetails?.businessNature && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Nature Of Business:</b>
                            {customerDetails?.businessNature}
                        </p>
                    )}
                    {customerDetails?.industry && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Industry:</b>
                            {customerDetails?.industry}
                        </p>
                    )}
                    {customerDetails?.employerSize && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Employer Size:</b>
                            {customerDetails?.employerSize}
                        </p>
                    )}
                    {customerDetails?.annualRevenue && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Annual Revenue:</b>
                            {customerDetails?.annualRevenue}
                        </p>
                    )}
                    {customerDetails?.companyAddress && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Company Address:</b>
                            {customerDetails?.companyAddress}
                        </p>
                    )}
                    {customerDetails?.chiefContactSign && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Chief Contact Signature:</b>
                            {customerDetails?.chiefContactSign}
                        </p>
                    )}
                    {customerDetails?.accountOfficer && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Accoun Officer:</b>
                            {customerDetails?.accountOfficer}
                        </p>
                    )}
                    {customerDetails?.accountOfficerSign && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Account Officer Signature:</b>
                            {customerDetails?.accountOfficerSign}
                        </p>
                    )}
                    {customerDetails?.complianceOfficer && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Compliance Officer:</b>
                            {customerDetails?.complianceOfficer}
                        </p>
                    )}
                    {customerDetails?.complianceOfficerSign && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Compliance Officer Signnature:
                            </b>
                            {customerDetails?.complianceOfficerSign}
                        </p>
                    )}

                    {customerDetails?.isChildEducationExisting && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Is Child Education Existing:</b>
                            {customerDetails?.isChildEducationExisting}
                        </p>
                    )}
                    {customerDetails?.totalNetWorth && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Total Net Worth:</b>
                            {customerDetails?.totalNetWorth}
                        </p>
                    )}
                    {customerDetails?.childrenNumberToEnrol && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Children Number To Enrol:</b>
                            {customerDetails?.childrenNumberToEnrol}
                        </p>
                    )}
                    {customerDetails?.childFirstName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child First Name:</b>
                            {customerDetails?.childFirstName}
                        </p>
                    )}
                    {customerDetails?.childLastName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Last Name:</b>
                            {customerDetails?.childLastName}
                        </p>
                    )}
                    {customerDetails?.childGender && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Gender:</b>
                            {customerDetails?.childGender}
                        </p>
                    )}
                    {customerDetails?.childEmail && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Email:</b>
                            {customerDetails?.childEmail}
                        </p>
                    )}
                    {customerDetails?.childSchoolName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child School Name:</b>
                            {customerDetails?.childSchoolName}
                        </p>
                    )}
                    {customerDetails?.childAge && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Age:</b>
                            {customerDetails?.childAge}
                        </p>
                    )}
                    {customerDetails?.childAddress && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Address:</b>
                            {customerDetails?.childAddress}
                        </p>
                    )}
                    {customerDetails?.childState && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child State:</b>
                            {customerDetails?.childState}
                        </p>
                    )}
                    {customerDetails?.childCountry && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Country:</b>
                            {customerDetails?.childCountry}
                        </p>
                    )}
                    {customerDetails?.childPhoneNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Phone Number:</b>
                            {customerDetails?.childPhoneNumber}
                        </p>
                    )}
                    {customerDetails?.childCurrentEduLevel && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Child Current Education Level:
                            </b>
                            {customerDetails?.childCurrentEduLevel}
                        </p>
                    )}
                    {customerDetails?.childCurrentClass && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Current Class:</b>
                            {customerDetails?.childCurrentClass}
                        </p>
                    )}
                    {customerDetails?.childCurrentTuition && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Current Tuition:</b>
                            {customerDetails?.childCurrentTuition}
                        </p>
                    )}
                    {customerDetails?.levelOfEduForChild && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Level Of Education For Child:
                            </b>
                            {customerDetails?.levelOfEduForChild}
                        </p>
                    )}
                    {customerDetails?.investmentPlan && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Investment Plan:</b>
                            {customerDetails?.investmentPlan}
                        </p>
                    )}
                    {customerDetails?.childStudyCountry && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Child Study Country:</b>
                            {customerDetails?.childStudyCountry}
                        </p>
                    )}
                    {customerDetails?.estimatedChildEduTotalCost && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Estimated Child Education Total Cost:
                            </b>
                            {customerDetails?.estimatedChildEduTotalCost}
                        </p>
                    )}
                    {customerDetails?.isTuitionFromInvestment && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Is Tuition From Investment:</b>
                            {customerDetails?.isTuitionFromInvestment === true
                                ? "Yes"
                                : "No"}
                        </p>
                    )}
                    {customerDetails?.isFreeEduAdvisoryService && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Is Free Education Advisory Service:
                            </b>
                            {customerDetails?.isFreeEduAdvisoryService === true
                                ? "Yes"
                                : "No"}
                        </p>
                    )}

                    {customerDetails?.employmentStatus && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Employment Status</b>
                            {customerDetails?.employmentStatus}
                        </p>
                    )}
                    {customerDetails?.employer && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Employer</b>
                            {customerDetails?.employer}
                        </p>
                    )}
                    {customerDetails?.employerPhoneNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Employer Phone Number</b>
                            {customerDetails?.employerPhoneNumber}
                        </p>
                    )}
                    {customerDetails?.employerAddress && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Employer Address</b>
                            {customerDetails?.employerAddress}
                        </p>
                    )}
                    {customerDetails?.fundSource && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Source Of Funds</b>
                            {customerDetails?.fundSource}
                        </p>
                    )}
                    {customerDetails?.grossAnnualIncome && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Gross Annual Income:</b>
                            {customerDetails?.grossAnnualIncome}
                        </p>
                    )}

                    {customerDetails?.isExistRetirementPlan && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Is Exist Retirement Plan</b>
                            {customerDetails?.isExistRetirementPlan}
                        </p>
                    )}
                    {customerDetails?.noOfDependents && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">No Of Dependents</b>
                            {customerDetails?.noOfDependents}
                        </p>
                    )}
                    {customerDetails?.yearsOfWork && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Years Of Work</b>
                            {customerDetails?.yearsOfWork}
                        </p>
                    )}
                    {customerDetails?.retirementTime && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Retirement Time</b>
                            {customerDetails?.retirementTime}
                        </p>
                    )}
                    {customerDetails?.rsaBalance && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">RSA Balance</b>
                            {customerDetails?.rsaBalance}
                        </p>
                    )}
                    {customerDetails?.isSalaryEarner && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Is Salary Earner</b>
                            {customerDetails?.isSalaryEarner}
                        </p>
                    )}
                    {customerDetails?.isEntrepreneur && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Is Entrepreneur</b>
                            {customerDetails?.isEntrepreneur}
                        </p>
                    )}
                    {customerDetails?.otherIncomeSources && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Other Income Sources</b>
                            {customerDetails?.otherIncomeSources}
                        </p>
                    )}
                    {customerDetails?.isExistFinancialPlan && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Is Exist Financial Plan</b>
                            {customerDetails?.isExistFinancialPlan}
                        </p>
                    )}
                    {customerDetails?.isSecureCashFlow && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Is Secure Cash Flow</b>
                            {customerDetails?.isSecureCashFlow}
                        </p>
                    )}
                    {customerDetails?.investmentNotInterestedIn && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Investment Not Interested In</b>
                            {customerDetails?.investmentNotInterestedIn}
                        </p>
                    )}
                    {customerDetails?.earningsExpectations && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Earnings Expectations</b>
                            {customerDetails?.earningsExpectations}
                        </p>
                    )}
                    {customerDetails?.investmentPlanDetailsInFiveYears && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Investment PlanDetails In Five Years
                            </b>
                            {customerDetails?.investmentPlanDetailsInFiveYears}
                        </p>
                    )}
                    {customerDetails?.isInterestedInFinPlanAdvisoryServices && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                IsInterested In Financial Plan Advisory Services
                            </b>
                            {
                                customerDetails?.isInterestedInFinPlanAdvisoryServices
                            }
                        </p>
                    )}
                    {customerDetails?.knowledgeLevelInInvestment && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">
                                Knowledge Level In Investment
                            </b>
                            {customerDetails?.knowledgeLevelInInvestment}
                        </p>
                    )}
                    {customerDetails?.subscriptionCategory && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">Subscription Category</b>
                            {customerDetails?.subscriptionCategory}
                        </p>
                    )}

                    {customerDetails?.afterRetirementPlan && (
                        <p className="grid grid-cols-2">
                            <b className="mr-5">After Retirement Plan</b>
                            {customerDetails?.afterRetirementPlan}
                        </p>
                    )}
                </div>
                {hasTransactions && (
                    <div className="mt-20">
                        <p className="mb-10 text-lg font-semibold">
                            Transactions
                        </p>
                        <div className="min-h-[500px] overflow-y-auto flex flex-col gap-y-5">
                            {/* <Table
                                transactions={transactions}
                                prevPage={prevPage}
                                nextPage={nextPage}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                isAdmin={isAdmin}
                                type={type}
                                approveReq={approveReq}
                                declineReq={declineReq}
                                menu={menu2}
                                toggleMenu={toggleMenu2}
                                reqId={reqId}
                            /> */}
                            {transactions.map((item: any, index: number) => (
                                <div
                                    className="min-h-56 w-full bg-white-lighter shadow-sm border border-primary/10 p-10 grid grid-cols-2 gap-x-20 gap-y-5 text-primary cursor-pointer hover:shadow-md rounded-xl hover:border-primary/20"
                                    onClick={() => reqId(item?.reqId)}
                                >
                                    <div className="grid grid-cols-2">
                                        <p className="font-bold">Type:</p>
                                        <p>{item?.transactionType}</p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <p className="font-bold">Amount:</p>
                                        <p>{item?.transactionAmount}</p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <p className="font-bold">Date:</p>
                                        <p>
                                            {item?.transactionDate
                                                .slice(0, 10)
                                                .split("-")
                                                .reverse()
                                                .join("-")}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <p className="font-bold">Name:</p>
                                        <p>{item?.customerName}</p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <p className="font-bold">Status:</p>
                                        <p
                                            className={`text-white-lighter text-xs px-2 py-1.5 w-fit rounded ${
                                                item?.transactionStatus ===
                                                "approved"
                                                    ? "bg-success"
                                                    : item?.transactionStatus ===
                                                      "declined"
                                                    ? "bg-error"
                                                    : "bg-primary"
                                            }`}
                                        >
                                            {item?.transactionStatus ===
                                            "approved"
                                                ? "Successful"
                                                : item?.transactionStatus}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal2>
    );
};

export default DetailsModal;
