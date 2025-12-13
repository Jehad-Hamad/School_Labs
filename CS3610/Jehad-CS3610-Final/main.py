from GPU import GPU
from CPU import CPU
from HDD import HDD
from RAM import RAM

from basicReportLib import ReportingLibraryBasic
from advancedReportLib import ReportingLibraryAdvanced


if __name__ == "__main__":
    gpu = GPU()
    cpu = CPU()
    hdd = HDD()
    ram = RAM()

    basicLib = ReportingLibraryBasic()
    advancedLib = ReportingLibraryAdvanced()

    basicLib.set_device(gpu)
    basicLib.report()

    advancedLib.set_device(cpu)
    advancedLib.report()
    advancedLib.reportRam(ram)
