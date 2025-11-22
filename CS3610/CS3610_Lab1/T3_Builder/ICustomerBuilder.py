from abc import ABC, abstractmethod
from Customer import Customer

class IBuilder(ABC):

    @abstractmethod
    def set_firstName(self, firstName:str) -> "IBuilder":
        pass

    @abstractmethod
    def set_lastName(self, lastName:str) -> "IBuilder":
        pass

    @abstractmethod
    def set_midName(self, midName:str) -> "IBuilder":
        pass

    @abstractmethod
    def set_primaryEmail(self, primaryEmail:str) -> "IBuilder":
        pass

    @abstractmethod
    def set_secondaryEmail(self, secondaryEmail:str) -> "IBuilder":
        pass

    @abstractmethod
    def set_primaryPhone(self, primaryPhone:str) -> "IBuilder":
        pass

    @abstractmethod
    def set_secondaryPhone(self, secondaryPhone:str) -> "IBuilder":
        pass

    @abstractmethod
    def build(self):
        pass

class WebAppBuilder(IBuilder):
    def __init__(self):
        self.customer:Customer = Customer()
    
    def set_firstName(self, firstName:str):
        self.customer.firstName = firstName
        return self
    
    def set_lastName(self, lastName:str):
        self.customer.lastName = lastName
        return self
    
    def set_midName(self, midName:str):
        self.customer.midName = midName
        return self
    
    def set_primaryEmail(self, primaryEmail:str):
        self.customer.primaryEmail = primaryEmail
        return self
    
    def set_secondaryEmail(self, secondaryEmail:str):
        self.customer.secondaryEmail = secondaryEmail
        return self
    
    def set_primaryPhone(self, primaryPhone:str):
        self.customer.primaryPhone = primaryPhone
        return self
    
    def set_secondaryPhone(self, secondaryPhone:str):
        self.customer.secondaryPhone = secondaryPhone
        return self
    
    def build(self) -> Customer:
        return self.customer

class MobileAppBuilder(IBuilder):
    def __init__(self):
        self.customer:Customer = Customer()
    
    def set_firstName(self, firstName:str):
        self.customer.firstName = firstName
        return self
    
    def set_lastName(self, lastName:str):
        self.customer.lastName = lastName
        return self
    
    def set_midName(self, midName:str):
        return self
    
    def set_primaryEmail(self, primaryEmail:str):
        self.customer.primaryEmail = primaryEmail
        return self
    
    def set_secondaryEmail(self, secondaryEmail:str):
        return self
    
    def set_primaryPhone(self, primaryPhone:str):
        self.customer.primaryPhone = primaryPhone
        return self
    
    def set_secondaryPhone(self, secondaryPhone:str):
        return self
    
    def build(self) -> Customer:
        return self.customer