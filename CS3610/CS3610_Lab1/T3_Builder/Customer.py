
class Customer:
    def __init__(self) -> None:
        self.firstName:str = ""
        self.lastName:str = ""
        self.midName:str = ""
        self.primaryEmail:str = ""
        self.secondaryEmail:str = ""
        self.primaryPhone:str = ""
        self.secondaryPhone:str = ""
    
    def printResult(self) -> str:
        mid = self.midName or ""
        sec_email = self.secondaryEmail or "N/A"
        sec_phone = self.secondaryPhone or "N/A"
        return (
            "My Name is " + self.firstName + " " + mid + " " + self.lastName + '\n' +
            "My primary Email is " + self.primaryEmail + " my primary phone number is " + self.primaryPhone + '\n' +
            "My secondary Email is " + sec_email + " my secondary phone number is " + sec_phone + '\n'
        )