from rdflib import Graph, URIRef, BNode, Literal, Namespace
from rdflib.namespace import RDF, FOAF

def createRDF(list_of_notaries, list_of_translators):

    notaryClass = URIRef("https://www.merriam-webster.com/dictionary/notary%20public")
    translatorClass = URIRef("https://www.merriam-webster.com/dictionary/translator")
    addressClass = URIRef("https://dictionary.cambridge.org/dictionary/english/address")
    gg = Graph()
    gg.add((notaryClass, RDF.type, FOAF.Person))
    gg.add((translatorClass, RDF.type, FOAF.Person))

    for i in range(5):
        notary = list_of_notaries[i]
        identificator = str(notary["firstName"] +"_"+ notary["lastName"]).replace(" ","_")
        # print(identificator)
        address =BNode()
        person_notary = URIRef("http://example.org/people/"+identificator)
        gg.add((person_notary, RDF.type, notaryClass))
        gg.add((person_notary, FOAF.id, Literal(notary["id"])))
        gg.add((person_notary, FOAF.firstName, Literal(notary["firstName"])))
        gg.add((person_notary, FOAF.lastName, Literal(notary["lastName"])))
        gg.add((person_notary, FOAF.phone, Literal(notary["phoneNo"])))
        gg.add((person_notary, FOAF.authorizationNumber, Literal(notary["authorisation_no"])))
        gg.add((person_notary, FOAF.schedule, Literal(notary["schedule"])))
        gg.add((person_notary, FOAF.services, Literal(notary["services"])))
        gg.add((address, FOAF.county, Literal(notary["county"])))
        gg.add((address, FOAF.city, Literal(notary["city"])))
        gg.add((address, FOAF.street, Literal(notary["address"])))
        gg.add((address, FOAF.country, Literal(notary["country"])))
        gg.add((address, FOAF.streetNr, Literal(notary["streetNumber"])))
        gg.add((address, FOAF.zipCode, Literal(notary["zipCode"])))
        gg.add((address, FOAF.others, Literal(notary["others"])))
        gg.add((person_notary, FOAF.address, address))
        #TO DO DOCUMENTS


    for i in range(5):
        translator = list_of_translators[i]
        identificator = str(translator["firstName"] + "_" + translator["lastName"]).replace(" ", "_")

        address =BNode()
        person_translator = URIRef("http://example.org/people/" + identificator)
        gg.add((person_translator, RDF.type, translatorClass))
        gg.add((person_translator, FOAF.id, Literal(translator["id"])))
        gg.add((person_translator, FOAF.firstName, Literal(translator["firstName"])))
        gg.add((person_translator, FOAF.lastName, Literal(translator["lastName"])))
        gg.add((person_translator, FOAF.phone, Literal(translator["phoneNo"])))
        gg.add((person_translator, FOAF.authorizationNumber, Literal(translator["authorisation_no"])))
        gg.add((person_translator, FOAF.schedule, Literal(translator["schedule"])))
        gg.add((person_translator, FOAF.services, Literal(translator["services"])))
        gg.add((address, FOAF.county, Literal(translator["county"])))
        gg.add((address, FOAF.city, Literal(translator["city"])))
        gg.add((address, FOAF.street, Literal(translator["address"])))
        gg.add((address, FOAF.country, Literal(translator["country"])))
        gg.add((address, FOAF.streetNr, Literal(translator["streetNumber"])))
        gg.add((address, FOAF.zipCode, Literal(translator["zipCode"])))
        gg.add((address, FOAF.others, Literal(translator["others"])))
        gg.add((person_translator, FOAF.address, address))
        gg.add((person_translator, FOAF.languages, Literal(translator["languages"])))

    file2 = open("output.txt", "wb")
    file2.write(gg.serialize(format='turtle'))
