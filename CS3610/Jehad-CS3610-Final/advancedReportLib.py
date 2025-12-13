from IReportingLibrary import IReportingLibrary
from IDevice import IDevice
from RAM import RAM

class ReportingLibraryAdvanced(IReportingLibrary):
    """Refined abstraction for advanced repoting lib."""
    
    def __init__(self, deviceType:IDevice = None):
        """Initialize with a specific device implementation."""
        self.__deviceType = deviceType
    
    def set_device(self, device:IDevice) -> None:
        self.__deviceType = device

    def report(self) -> None:
        print("From advanced lib")
        print("I am reporting on")
        print(self.__deviceType.myInfo())
        print()


    def reportRam(self, ramDevice:IDevice) -> None:
        print("From advanced lib")
        if isinstance(ramDevice, RAM):
            print("I am reporting on")
            print(ramDevice.myInfo())
            print()
        else:
            print("I need a ram device")