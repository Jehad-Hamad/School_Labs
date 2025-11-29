from abc import abstractmethod, ABC

# Implementor Interface
class PaymentProcessor(ABC):
    @abstractmethod
    def payment_Method(self) -> str:
        pass

# Concrete Implementor
class BankTransfer(PaymentProcessor):
    def payment_Method(self) -> str:
        return f"Processing payment via Bank Transfer"

# Concrete Implementor
class Cheque(PaymentProcessor):
    def payment_Method(self) -> str:
        return f"Processing payment via Cheque"

# Concrete Implementor
class DigitalWallet(PaymentProcessor):
    def payment_Method(self) -> str:
        return f"Processing payment via Digital Wallet"


#Abstraction
class EmployeeType(ABC):
    def __init__(self, payment_processor: PaymentProcessor):
        self.payment_processor = payment_processor
    
    @abstractmethod
    def process_payment(self) -> None:
        pass

class HourlyEmployee(EmployeeType):
    def __init__(self, payment_processor: PaymentProcessor):
        super().__init__(payment_processor)
    
    def process_payment(self) -> None:
        print("I am a Hourly Employee and I get paid based on hours worked.")
        print(self.payment_processor.payment_Method())    

class SalariedEmployee(EmployeeType):
    def __init__(self, payment_processor: PaymentProcessor):
        super().__init__(payment_processor)

    def process_payment(self) -> None:
        print("I am a Salaried Employee and I get paid a fixed monthly amount.")
        print(self.payment_processor.payment_Method())

class Contractors(EmployeeType):
    def __init__(self, payment_processor: PaymentProcessor):
        super().__init__(payment_processor)

    def process_payment(self) -> None:
        print("I am a Contractor and I get paid based on project deliverables." )
        print(self.payment_processor.payment_Method())
    

class PaymentFactory:
    def __init__(self):
        self.available_methods = {
            "bank": BankTransfer,
            "cheque": Cheque,
            "wallet": DigitalWallet
        }
    
    def createPaymentType(self, objType: str) -> PaymentProcessor:
        if objType.lower() in self.available_methods.keys():
            return self.available_methods[objType.lower()]()
        else:
            raise Exception(f"Cannot create payment type: {objType}")


class App:
    def __init__(self):
        self.payment_factory = PaymentFactory()
        
        self.AvailablePaymentMethods = {
            "bank": self.payment_factory.createPaymentType("bank"),
            "cheque": self.payment_factory.createPaymentType("cheque"),
            "wallet": self.payment_factory.createPaymentType("wallet")
        }

        self.salaried_emp = SalariedEmployee(self.AvailablePaymentMethods["bank"])
        self.hourly_emp = HourlyEmployee(self.AvailablePaymentMethods["cheque"])
        self.contractor = Contractors(self.AvailablePaymentMethods["wallet"])

    def pay_all(self):
        self.salaried_emp.process_payment()
        print()
        self.hourly_emp.process_payment()
        print()
        self.contractor.process_payment()

if __name__ == '__main__':
    app = App()
    app.pay_all()