from IDevice import IDevice

## Concrete Implementor
class RAM(IDevice):
    def myInfo(self) -> str:
        info = "I AM A RAM\nThis is my info\nRANDOM RAM INFO"
        return info