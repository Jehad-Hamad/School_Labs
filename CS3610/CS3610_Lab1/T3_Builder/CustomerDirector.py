from ICustomerBuilder import IBuilder, MobileAppBuilder, WebAppBuilder
from Customer import Customer

class CustomerDirector:
    def __init__(self, builder: IBuilder) -> None:
        self.builder = builder

    def changeBuilder(self, builder: IBuilder) -> IBuilder:
        self.builder = builder
    
    def constructWeb(self, first:str, mid:str, last:str, primary_email:str, secondary_email:str, primary_phone:str, secondary_phone:str) -> Customer:
        if(isinstance(self.builder, WebAppBuilder)):
            return (
                self.builder
                    .set_firstName(first)
                    .set_midName(mid)
                    .set_lastName(last)
                    .set_primaryEmail(primary_email)
                    .set_secondaryEmail(secondary_email)
                    .set_primaryPhone(primary_phone)
                    .set_secondaryPhone(secondary_phone)
                    .build()
                )

    def constructMobile(self, first:str, last:str, primary_email:str, primary_phone:str) -> Customer:
        if(isinstance(self.builder, MobileAppBuilder)):
            return (
                self.builder
                    .set_firstName(first)
                    .set_lastName(last)
                    .set_primaryEmail(primary_email)
                    .set_primaryPhone(primary_phone)
                    .build()
                )

    def printResult(self, obj: Customer) -> str:
        mid = obj.midName or ""
        sec_email = obj.secondaryEmail or "N/A"
        sec_phone = obj.secondaryPhone or "N/A"
        return (
            "My Name is " + obj.firstName + " " + mid + " " + obj.lastName + '\n' +
            "My primary Email is " + obj.primaryEmail + " my primary phone number is " + obj.primaryPhone + '\n' +
            "My secondary Email is " + sec_email + " my secondary phone number is " + sec_phone + '\n'
        )