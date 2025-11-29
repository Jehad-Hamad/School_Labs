from abc import ABC, abstractmethod
import xml.etree.ElementTree as ET

## External APIS WE CANT CHANGE
class TaxCalculator:
    def get_csv(self) -> str:
        return "tax_id,amount,rate\n001,50000,0.22\n002,75000,0.24"

class AccountingModule:
    def get_xml(self) -> str:
        return "<accounts><account><revenue>100000</revenue><expenses>60000</expenses></account><account><revenue>75000</revenue><expenses>50000</expenses></account></accounts>"

    
class CreditAuthorizationService:
    def get_json(self) -> str:
        return '[{"credit_score": 750, "limit": 50000, "status": "approved"}]'
     
## Adapters 
## Adapt to APIS
class DataSource(ABC):
    @abstractmethod
    def get_json_data(self) -> str:
        """Returns data in JSON format"""
        pass

class CSVToJSONAdapter(DataSource):
    def __init__(self, tax_calculator: TaxCalculator) -> None:
        self.__tax_calculator = tax_calculator # The adaptee
    
    def get_json_data(self) -> str:
        csv_data: str = self.__tax_calculator.get_csv()

        rows: list[str] = csv_data.split("\n")
        headers: list[str] = rows[0].split(",")

        json_data: str = "CSV TO JSON:  ["
        for row in rows[1:]:
            values: list[str] = row.split(",")
            obj:str = "{"
            for i in range(len(headers)):
                obj += headers[i] + ": " + values[i]
                if i < len(headers) - 1:
                     obj += ", "
            obj += "}"
            json_data += obj + ", "
        json_data = json_data[:-2] + "]"
        return json_data

class XMLToJSONAdapter(DataSource):
    def __init__(self, accounting_module: AccountingModule) -> None:
        self.__accounting_module = accounting_module  # The adaptee
    
    def get_json_data(self) -> str:
        xml_data: str = self.__accounting_module.get_xml()

        json_data: str = "XML TO JSON:  ["
        root = ET.fromstring(xml_data)
        for account in root:
            obj:str = "{"
            for child in account:
                obj += str(child.tag) + ": " + str(child.text)
                obj += ", "
            obj = obj[:-2]
            obj += "}"
            json_data += obj + ", "
        json_data = json_data[:-2] + "]"
        return json_data
        
class CreditServiceAdapter(DataSource):
    def __init__(self, credit_service: CreditAuthorizationService) -> None:
        self.__credit_service = credit_service  # The adaptee
    
    def get_json_data(self) -> str:
        return "JSON already: " +self.__credit_service.get_json()


## The Main Client - Forecasting & Finance Modeling Module
class ForecastingModule:
    def __init__(self) -> None:
        self.__data_sources: list[DataSource] = []
    
    def add_data_sources(self, sources: list[DataSource]) -> None:
            for source in sources:
                try:
                    self.__data_sources.append(source)
                except: 
                    print("NOT A DATA SOURCE")
    
    def process_financial_data(self) -> None:

        for source in self.__data_sources:
            json_data: str = source.get_json_data()
            print(json_data, '\n')


if __name__ == "__main__":
    tax_calculator = TaxCalculator()
    accounting_module = AccountingModule()
    credit_service = CreditAuthorizationService()

    tax_adapter = CSVToJSONAdapter(tax_calculator)
    accounting_adapter = XMLToJSONAdapter(accounting_module)
    credit_adapter = CreditServiceAdapter(credit_service)

    sources:list[DataSource] = [tax_adapter, accounting_adapter, credit_adapter]

    client = ForecastingModule()
    client.add_data_sources(sources)
    client.process_financial_data()