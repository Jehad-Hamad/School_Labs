from IDevice import IDevice

## Concrete Implementor
class HDD(IDevice):
    def myInfo(self) -> str:
        info = "I AM A HDD\nThis is my info\n   7200 RPM, \n   SATA 6 Gb/s, \n   128 MB Cache, \n   3.5 - WD8002FZWX \n"
        return info