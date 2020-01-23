from CreateEntities import *
from CreateRDF import *
from ReplaceWords import *

# ns1: address[ns1:city
# "BACAU";
# ns1: county
# "BACĂU";
# ns1: street
# "-"];
# ns1: authorizationNumber
# 234828456;
# ns1: firstName
# "RADU MIHAIL";
# ns1: id2222
# 1;
# ns1: lastName
# "ABABEI";
# ns1: phone
# "0830336273";
# ns1: schedule
# "['9:30 - 12:00 | 13:00 - 19:00', '9:00 - 13:00 | 14:00 - 19:30', '8:00 - 12:00 | 14:00-20:00', '9:00 - 13:00 | 14:00 - 19:30', '9:30 - 12:00 | 13:00 - 19:00', None, None]";
# ns1: services
# "[['Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['Divorce', 'https://notariat-tineretului.net/divort/'], ['Declaration', 'https://notariat-tineretului.net/declaratie/'], ['Procure', 'https://notariat-tineretului.net/procura/'], ['Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['Succession', 'https://notariat-tineretului.net/succesiune/'], ['Contract', 'https://notariat-tineretului.net/contract/']]".


def main():
    list_of_notaries= read_notaries()
    list_of_translators = read_translators()
    createRDF(list_of_notaries, list_of_translators)
    replace_propertyes()
    # print(generateSchedule())
    # print(generateNotaryService())
    # print(generateTranslatorsService())
if __name__ == '__main__':
    main()

