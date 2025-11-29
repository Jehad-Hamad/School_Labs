from abc import ABC, abstractmethod

class IComponent(ABC):

    @abstractmethod
    def get_name(self) -> str:
        pass

    @abstractmethod
    def get_total_salary(self) -> float:
        pass

    @abstractmethod
    def do_operation(self) -> str:
        pass


class Employee(IComponent):
    def __init__(self, name: str, salary: float) -> None:
        self.__name = name
        self.__salary = salary
    
    def get_name(self,) -> str:
        return self.__name
    
    def get_total_salary(self) -> float:
        return self.__salary
    
    def do_operation(self) -> str:
        return f"My name is {self.get_name()} and I am doing an operation"
    

class Department(IComponent):
    def __init__(self, name: str) -> None:
        self.__name = name
        self.__employees: list[IComponent] = []
    
    def add(self, employee: IComponent) -> None:
        self.__employees.append(employee)

    def remove(self, employee: IComponent) -> None:
        if employee in self.__employees:
            self.__employees.remove(employee)
        else:
            print(f"I don't have {employee.get_name()}, so I can't remove it.")
    
    def get_name(self,) -> str:
        return self.__name
    
    def get_total_salary(self) -> float:
        total_salary: float = 0.0
        for employee in self.__employees:
            total_salary += employee.get_total_salary()
        return total_salary
    
    def do_operation(self) -> str:
        results = [f"Department: {self.get_name()}"]
        for employee in self.__employees:
            results.append(employee.do_operation())
        return "\n".join(results)
    
if __name__ == "__main__":
    # Create individual employees
    jehad = Employee("Jehad", 50000)
    morgan = Employee("Morgan", 1)
    reece = Employee("Reece", 1)
    jacky = Employee("Jacky", 1)

    # Create departments
    CEO = Department("CEO")
    CEO.add(jehad)

    engineering = Department("Engineering")
    engineering.add(morgan)

    sales = Department("Sales")
    sales.add(reece)
    sales.add(jacky)

    # Create a parent department containing sub-departments
    company = Department("Company")
    company.add(CEO)
    company.add(engineering)
    company.add(sales)

    print(company.do_operation())
    print(f"\nTotal company salary: ${company.get_total_salary()}")
    print(f"CEO Department salary: ${CEO.get_total_salary()}")
    print(f"Engineering Department salary: ${engineering.get_total_salary()}")
    print(f"Sales Deparment salary: ${sales.get_total_salary()}")