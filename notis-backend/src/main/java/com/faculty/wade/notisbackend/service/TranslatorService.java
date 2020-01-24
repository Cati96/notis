package com.faculty.wade.notisbackend.service;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.helper.EntityCreator;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.EntityObject;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Translator;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;
import org.springframework.stereotype.Service;

import java.util.List;

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
        String services = "[['1', 'Technical translations', 'Technical translations'], ['3', 'Literary translations', 'Literary translations'], ['2', 'Medical and pharmaceutical translations', 'Medical and pharmaceutical translations'], ['4', 'Legal translations', 'Legal translations'], ['5', 'Economic translations', 'Economic translations']]";
        Address address = new Address("-", "-", "-", "-", "-", "-", "-", "-");
        Translator translator = new Translator(id, entityDTO.getName(), "" + entityDTO.getAuthorizationNumber(), entityDTO.getPhoneNumber(), address, LiteralConvertor.convertFromStringToTimetable(schedule), LiteralConvertor.convertFromStringToServices(services), entityDTO.getLanguages());
        return translator;
    }

    public Translator get(int id) {
        return SparkQLQuery.getTranslator(id);
    }

    public boolean delete(Translator translator) {
        Translator oldTranslator = get(translator.getId());
        String fullName = oldTranslator.getName().replace(" ","_");
        return SparkQLQuery.deleteEntity(fullName);
    }
}
