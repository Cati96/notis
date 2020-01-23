package com.faculty.wade.notisbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.helper.EntityCreator;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.EntityObject;
import com.faculty.wade.notisbackend.model.Translator;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;

@Service
public class TranslatorService {

    public List<Translator> getAll() {
        return SparkQLQuery.getAllTranslators();
    }

    public Translator add(EntityDTO entityDTO) {
        Integer id = SparkQLQuery.addDefaultEntity(entityDTO, true);
        if (id == null)
            return null;
        return getDefaulTranslator(entityDTO, id);
    }

    public Translator add(Translator translator) {
        EntityObject entityObject = EntityCreator.createEntityToBeStored(translator, true);
        SparkQLQuery.addEntity(entityObject, true);
        return translator;
    }

    private Translator getDefaulTranslator(EntityDTO entityDTO, Integer id) {
        String schedule = "['10:00 - 14:00 | 15:00 - 18:00', '8:30 - 13:00 | 14:00 - 19:00', '9:30 - 12:00 | 13:00 - 19:00', '9:00 - 13:00 | 14:00 - 19:30', '9:00 - 13:00 | 14:00 - 19:30', '9:30 - 12:00 | 13:00 - 19:00', None]";
        String services = "[['Contract', 'https://notariat-tineretului.net/contract/'], ['Divorce', 'https://notariat-tineretului.net/divort/'], ['Succession', 'https://notariat-tineretului.net/succesiune/'], ['Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['Procure', 'https://notariat-tineretului.net/procura/']]";
        Address address = new Address("-", "-", "-", "-", "-", "-", "-", "-");
        Translator translator = new Translator(id, entityDTO.getName(), "" + entityDTO.getAuthorizationNumber(),
                entityDTO.getPhoneNumber(), address, LiteralConvertor.convertFromStringToTimetable(schedule),
                LiteralConvertor.convertFromStringToServices(services), entityDTO.getLanguages());
        return translator;
    }

    public Translator get(int id) {
        return SparkQLQuery.getTranslator(id);
    }

    public boolean delete(Translator translator) {
        Translator oldTranslator = get(translator.getId());
        String fullName = oldTranslator.getName().replace(" ", "_");
        return SparkQLQuery.deleteEntity(fullName);
    }
}
