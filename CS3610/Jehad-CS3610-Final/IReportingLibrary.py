from abc import ABC, abstractmethod
from IDevice import IDevice

#Abstraction
class IReportingLibrary(ABC):
    """Abstract class representing the reporting Library implementation."""

    @abstractmethod
    def set_device(self, device:IDevice) -> None:
        pass

    @abstractmethod
    def report(self) -> None:
        pass
