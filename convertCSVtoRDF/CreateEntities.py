import pandas as pd
import math
# from random import *
import random
# private Integer id;
#
# 	private String name;
#
# 	private String authorizationNumber;
#
# 	private String phoneNumber;
#
# 	private Address address;
#
# 	private Timetable timetable;
#
# 	private List<Service> services;


# private Integer id;
#
#private String type;
#
#private String description;
#
#private List<Document> documents;

# private Integer id;
#
# 	private String type;
#
# 	private String format;
#
# 	private String template;
#
# 	private Double price;
scheduleList = ["8:00 - 12:00 | 14:00-20:00", "8:30 - 13:00 | 14:00 - 19:00","9:00 - 13:00 | 14:00 - 19:30","10:00 - 14:00 | 15:00 - 18:00","9:30 - 12:00 | 13:00 - 19:00"]
notaryTypeOfServices = [["Succession","https://notariat-tineretului.net/succesiune/"],
                        ["Declaration","https://notariat-tineretului.net/declaratie/"],
                        ["Contract","https://notariat-tineretului.net/contract/"],
                        ["Procure","https://notariat-tineretului.net/procura/"],
                        ["Divorce","https://notariat-tineretului.net/divort/"],
                        ["Document Legalisation","https://notariat-tineretului.net/legalizari/"],
                        ["Marriage agreement","https://notariat-tineretului.net/conventie-matrimoniala/"]
]
translatorsTypeOfServices = [["Technical translations","Technical translations"],
                             ["Medical and pharmaceutical translations","Medical and pharmaceutical translations"],
                             ["Literary translations","Literary translations"],
                             ["Legal translations","Legal translations"],
                             ["Economic translations","Economic translations"],
                             ["IT translations","IT translations"]]

def read_notaries():
    print("read notaries")
    list_of_notaries = []
    dfs = pd.read_excel("notari.xlsx")
    for index, row in dfs.iterrows():
        # print(index, row["Nume si prenume"])
        lastNameFirstName = row["Nume si prenume"].split(" ");
        lastName = lastNameFirstName[0]
        firstName = ' '.join(lastNameFirstName[1:]).strip()
        room = row["Camera"].strip()
        address = row["Adresa sediu"]
        if not isinstance(address, str) and math.isnan(address):
            address = "-"
        city = row["Localitate"]
        county = row["Judet"]
        phoneNo = "0" + str(random_with_N_digits(9))
        notary = {
            "id" : index,
            "lastName" : lastName,
            "firstName" : firstName,
            "authorisation_no" : random_with_N_digits(9),
            "room" : room,
            "address":address,
            "city":city,
            "county":county,
            "phoneNo":phoneNo,
            "schedule": generateSchedule(),
            "services": generateNotaryService()
        }
        list_of_notaries.append(notary)
        # TO DO ACTE

    return list_of_notaries
def read_translators():
    print("read notaries")
    list_of_translators = []
    dfs = pd.read_excel("traducatori.xlsx")
    for index, row in dfs.iterrows():
        # print(index, row["Nume si prenume"])
        lastNameFirstName = row["Nume si prenume"].split(" ");
        lastName = lastNameFirstName[0]
        firstName = ' '.join(lastNameFirstName[1:]).strip()
        court_of_Appeal = row["Curtea de Apel"]
        languages = row["Limbi"].replace(" ","").split(",")
        county = row["judet"]
        phoneNo = editPhoneNumber(row["Telefon"])
        authorisationNo = row["Numar autorizatie"]
        translator = {
            "id": index,
            "lastName": lastName,
            "firstName": firstName,
            "county": county,
            "address": "-",
            "city": "-",
            "phoneNo": phoneNo,
            "court_of_appeal": court_of_Appeal,
            "languages": languages,
            "authorisation_no":authorisationNo,
            "schedule": generateSchedule(),
            "services": generateTranslatorsService()
        }
        list_of_translators.append(translator)
        # print(translator)
        # TO DO ACTE
    return list_of_translators

def editPhoneNumber(phoneNo):
    phoneNo = str(phoneNo)
    if(len(phoneNo) == 0):
        return "0" + str(random_with_N_digits(9))
    else:
        phoneNo = phoneNo.replace(" ","").replace("/","").replace(".","")
        if len(phoneNo)>=10:
            return  phoneNo[:10]
        else:
            return "0" + str(random_with_N_digits(9))

def random_with_N_digits(n):
        range_start = 10 ** (n - 1)
        range_end = (10 ** n) - 1
        return random.randint(range_start, range_end)

def generateSchedule():
    schedule=[]
    for i in range(5):
        randomIndex = random.randrange(len(scheduleList))
        schedule.append(scheduleList[randomIndex])
    isWorkingSaturday = random.randrange(2)
    if(isWorkingSaturday==1):
        randomIndex = random.randrange(len(scheduleList))
        schedule.append(scheduleList[randomIndex])
        schedule.append(None)
    else:
        schedule.append(None)
        schedule.append(None)
    return schedule

def generateNotaryService():
    numberOfServices = random.randrange(2,len(notaryTypeOfServices) + 1)
    services = random.sample(notaryTypeOfServices, k=numberOfServices)
    return services
def generateTranslatorsService():
    numberOfServices = random.randrange(2, len(translatorsTypeOfServices) + 1)
    services = random.sample(translatorsTypeOfServices, numberOfServices)
    return services