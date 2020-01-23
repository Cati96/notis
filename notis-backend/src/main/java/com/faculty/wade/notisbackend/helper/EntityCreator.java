package com.faculty.wade.notisbackend.helper;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.model.*;

import java.util.List;
import java.util.stream.Collectors;

public class EntityCreator {
    public static EntityObject createEntityToBeStored(EntityDTO entityDTO, boolean isTranslator) {
        Integer id = RandomGenerator.getRandomNumberInRange(11111, Integer.MAX_VALUE);
        String entityID;
        String offeredServices;
        if (isTranslator) {
            entityID = "https://www.merriam-webster.com/dictionary/translator";
            offeredServices = "[['IT translations', 'IT translations'], ['Literary translations', 'Literary translations'], ['Medical and pharmaceutical translations', 'Medical and pharmaceutical translations'], ['Economic translations', 'Economic translations'], ['Technical translations', 'Technical translations'], ['Legal translations', 'Legal translations']]";
        } else {
            entityID = "https://www.merriam-webster.com/dictionary/notary%20public";
            offeredServices = "[['Contract', 'https://notariat-tineretului.net/contract/'], ['Divorce', 'https://notariat-tineretului.net/divort/'], ['Succession', 'https://notariat-tineretului.net/succesiune/'], ['Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['Procure', 'https://notariat-tineretului.net/procura/']]";
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
        String servicesString = services.stream().map(service -> "['" + service.getType() + "', '" + service.getDescription() + "']").collect(Collectors.joining(", "));
        return "[" + servicesString + "]";
    }

    private static String convertLanguagesToString(List<String> languages){
//        "['FRANCEZĂ', 'RUSĂ']"
        String languagesString = languages.stream().map(language->"'"+language.toUpperCase().replace(",","")+"'").collect(Collectors.joining(", "));
        return "["+languagesString+"]";
    }
}
