from IReportingLibrary import IReportingLibrary
from IDevice import IDevice

# Refined Abstractions
class ReportingLibraryBasic(IReportingLibrary):
    """Refined abstraction for basic repoting lib."""
    
    def __init__(self, deviceType:IDevice = None):
        """Initialize with a specific device implementation."""
        self.__deviceType = deviceType
    
    def set_device(self, device:IDevice) -> None:
        self.__deviceType = device

    def report(self) -> None:
        print("From basic lib")
        print("I am reporting on")
        print(self.__deviceType.myInfo())
        print()