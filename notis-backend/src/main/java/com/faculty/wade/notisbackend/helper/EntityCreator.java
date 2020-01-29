package com.faculty.wade.notisbackend.helper;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.model.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class EntityCreator {
    public static EntityObject createEntityToBeStored(EntityDTO entityDTO, boolean isTranslator) {
        Integer id = RandomGenerator.getRandomNumberInRange(11111, Integer.MAX_VALUE);
        String entityID;
        String offeredServices;
        if (isTranslator) {
            entityID = "https://www.merriam-webster.com/dictionary/translator";
            offeredServices = "[['1', 'IT translations', 'IT translations'], ['2', 'Literary translations', 'Literary translations'], ['3', 'Medical and pharmaceutical translations', 'Medical and pharmaceutical translations'], ['4', 'Economic translations', 'Economic translations'], ['5', 'Technical translations', 'Technical translations'], ['6', 'Legal translations', 'Legal translations']]";
        } else {
            entityID = "https://www.merriam-webster.com/dictionary/notary%20public";
            offeredServices = "[['1', 'Contract', 'https://notariat-tineretului.net/contract/'], ['2', 'Divorce', 'https://notariat-tineretului.net/divort/'], ['3', 'Succession', 'https://notariat-tineretului.net/succesiune/'], ['4', 'Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['5', 'Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['6', 'Procure', 'https://notariat-tineretului.net/procura/']]";
        }
        String languages = convertLanguagesToString(entityDTO.getLanguages());
        Address address = new Address("-", "-", "-", "-", "-", "-", "-", "-");
        EntityObject entityObject = EntityObject.builder()
                .id(id)
                .entityType(entityID)
                .name(entityDTO.getName())
                .authorizationNumber(entityDTO.getAuthorizationNumber())
                .phoneNumber(entityDTO.getPhoneNumber())
                .address(address)
                .timetable("['10:00 - 14:00 | 15:00 - 18:00', '8:30 - 13:00 | 14:00 - 19:00', '9:30 - 12:00 | 13:00 - 19:00', '9:00 - 13:00 | 14:00 - 19:30', '9:00 - 13:00 | 14:00 - 19:30', '9:30 - 12:00 | 13:00 - 19:00', None]")
                .services(offeredServices)
                .languages(languages)
                .build();
        return entityObject;
    }

    public static EntityObject createEntityToBeStored(Notary notary, boolean isTranslator) {
        Integer id = notary.getId();
        String entityID;
        String offeredServices;
        if (isTranslator) {
            entityID = "https://www.merriam-webster.com/dictionary/translator";
        } else {
            entityID = "https://www.merriam-webster.com/dictionary/notary%20public";
        }

        EntityObject entityObject = EntityObject.builder()
                .id(id)
                .entityType(entityID)
                .name(notary.getName())
                .authorizationNumber(Integer.parseInt(notary.getAuthorizationNumber()))
                .phoneNumber(notary.getPhoneNumber())
                .address(notary.getAddress())
                .timetable(convertTimeTableToString(notary.getTimetable()))
                .services(convertServicesToString(notary.getServices()))
                .languages("-")
                .documents(convertDocumentsTOsTRING(notary.getServices()))
                .build();
        return entityObject;
    }

    public static EntityObject createEntityToBeStored(Translator translator, boolean isTranslator) {
        Integer id = translator.getId();
        String entityID;
        String offeredServices;
        if (isTranslator) {
            entityID = "https://www.merriam-webster.com/dictionary/translator";
        } else {
            entityID = "https://www.merriam-webster.com/dictionary/notary%20public";
        }

        Address address = new Address("-", "-", "-", "-", "-", "-", "-", "-");
        EntityObject entityObject = EntityObject.builder()
                .id(id)
                .entityType(entityID)
                .name(translator.getName())
                .authorizationNumber(Integer.parseInt(translator.getAuthorizationNumber()))
                .phoneNumber(translator.getPhoneNumber())
                .address(translator.getAddress())
                .timetable(convertTimeTableToString(translator.getTimetable()))
                .services(convertServicesToString(translator.getServices()))
                .languages(convertLanguagesToString(translator.getLanguages()))
                .documents(convertDocumentsTOsTRING(translator.getServices()))
                .build();
        return entityObject;
    }

    private static String convertTimeTableToString(Timetable timetable) {
        StringBuilder sb = new StringBuilder();
        sb.append("[")
                .append(timetable.getMonday()).append(", ")
                .append(timetable.getThursday()).append(", ")
                .append(timetable.getWednesday()).append(", ")
                .append(timetable.getThursday()).append(", ")
                .append(timetable.getFriday()).append(", ")
                .append(timetable.getSaturday()).append(", ")
                .append(timetable.getSunday())
                .append("]");
        return sb.toString();
    }

    private static String convertServicesToString(List<Service> services) {
        String servicesString = services.stream().map(service -> "['" + service.getId() + "', '" + service.getType() + "', '" + service.getDescription() + "']").collect(Collectors.joining(", "));
        return "[" + servicesString + "]";
    }

    private static String convertLanguagesToString(List<String> languages) {
//        "['FRANCEZĂ', 'RUSĂ']"
        String languagesString = languages.stream().map(language -> "'" + language.toUpperCase().replace(",", "") + "'").collect(Collectors.joining(", "));
        return "[" + languagesString + "]";
    }

    private static String convertDocumentsTOsTRING(List<Service> services) {
        StringBuilder sb = new StringBuilder("[");
        for (Service service : services) {
            if (service.getDocuments() != null) {
                for (Document doc : service.getDocuments()) {
                    sb.append("[" + service.getId() + ", " + doc.getId() + ", " + doc.getType() + ", " + doc.getFormat() + ", " + doc.getTemplate() + ", " + doc.getPrice() + "], ");
                }
            }
        }
        String res = sb.toString();
        res = res.substring(0, res.length()-2);

        return res+"]";
    }
}
