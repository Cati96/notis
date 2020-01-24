import fileinput


def replace_propertyes():
    # with fileinput.FileInput("./output.txt", inplace=True, backup='.bak') as file:
    #     for line in file:
    #         print(line.replace("ns1:address", "<ns1:address>"), end='')
    #         print(line.replace("ns1:city", "<ns1:city>"), end='')
    #         print(line.replace("ns1:county", "<ns1:county>"), end='')
    #         print(line.replace("ns1:street", "<ns1:street>"), end='')
    #         print(line.replace("ns1:authorizationNumber", "<ns1:authorizationNumber>"), end='')
    #         print(line.replace("ns1:firstName", "<ns1:firstName>"), end='')
    #         print(line.replace("ns1:lastName", "<ns1:lastName>"), end='')
    #         print(line.replace("ns1:phone", "<ns1:phone>"), end='')
    #         print(line.replace("ns1:schedule", "<ns1:schedule>"), end='')
    #         print(line.replace("ns1:services", "<ns1:services>"), end='')
    #         print(line.replace("ns1:id", "<ns1:id>"), end='')
    with open('./output.txt', 'r') as file:
        filedata = file.read()

    # Replace the target string
    filedata = filedata.replace("ns1:address", "<ns1:address>") \
        .replace("ns1:city", "<ns1:city>") \
        .replace("ns1:county", "<ns1:county>") \
        .replace("ns1:street", "<ns1:street>") \
        .replace("ns1:authorizationNumber", "<ns1:authorizationNumber>") \
        .replace("ns1:firstName", "<ns1:firstName>") \
        .replace("ns1:lastName", "<ns1:lastName>") \
        .replace("ns1:phone", "<ns1:phone>") \
        .replace("ns1:schedule", "<ns1:schedule>") \
        .replace("ns1:services", "<ns1:services>") \
        .replace("ns1:id", "<ns1:id>") \
        .replace("ns1:languages", "<ns1:languages>") \
        .replace("ns1:country", "<ns1:country>") \
        .replace("ns1:locality", "<ns1:locality>") \
        .replace("ns1:others", "<ns1:others>") \
        .replace("ns1:zipCode", "<ns1:zipCode>") \
        .replace("ns1:streetNr", "<ns1:streetNr>") \
        .replace("<ns1:street>Nr", "<ns1:streetNr>") \
        .replace("<ns1:street>Nr", "<ns1:streetNr>") \
        .replace("<https://www.merriam-webster.com/dictionary/notary%20public>",
                 "\"https://www.merriam-webster.com/dictionary/notary%20public\"") \
        .replace("<https://www.merriam-webster.com/dictionary/translator>",
                 "\"https://www.merriam-webster.com/dictionary/translator\"")


    # Write the file out again
    with open('rdf.txt', 'w') as file:
        file.write(filedata)
