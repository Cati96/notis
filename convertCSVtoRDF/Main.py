from CreateEntities import *
from CreateRDF import *

def main():
    list_of_notaries= read_notaries()
    list_of_translators = read_translators()
    createRDF(list_of_notaries, list_of_translators)
    # print(generateSchedule())
    # generateNotaryService()

if __name__ == '__main__':
    main()

