package com.faculty.wade.notisbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.helper.EntityCreator;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.EntityObject;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;

@Service
public class NotaryService {

    public NotaryService() {

    }

    public Notary findById(Integer id) {
        return null;
    }

    public List<Notary> getAll() {
        return SparkQLQuery.getAllNotaries();
    }

    public Notary get(int id) {
        return SparkQLQuery.getNotary(id);
    }

    public boolean delete(Notary notary) {
        Notary oldNotary = get(notary.getId());
        String fullName = oldNotary.getName().replace(" ", "_");
        return SparkQLQuery.deleteEntity(fullName);
    }

    public Notary add(EntityDTO entityDTO) {
        Integer id = SparkQLQuery.addDefaultEntity(entityDTO, false);
        if (id == null)
            return null;
        return getDefaulNotary(entityDTO, id);
    }

    public Notary add(Notary notary) {
        EntityObject entityObject = EntityCreator.createEntityToBeStored(notary, false);
        SparkQLQuery.addEntity(entityObject, false);
        return notary;
    }

    private Notary getDefaulNotary(EntityDTO entityDTO, Integer id) {
        String schedule = "['10:00 - 14:00 | 15:00 - 18:00', '8:30 - 13:00 | 14:00 - 19:00', '9:30 - 12:00 | 13:00 - 19:00', '9:00 - 13:00 | 14:00 - 19:30', '9:00 - 13:00 | 14:00 - 19:30', '9:30 - 12:00 | 13:00 - 19:00', None]";
        String services = "[['Contract', 'https://notariat-tineretului.net/contract/'], ['Divorce', 'https://notariat-tineretului.net/divort/'], ['Succession', 'https://notariat-tineretului.net/succesiune/'], ['Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['Procure', 'https://notariat-tineretului.net/procura/']]";
        Address address = new Address("-", "-", "-", "-", "-", "-", "-", "-");
        Notary notary = new Notary(id, entityDTO.getName(), "" + entityDTO.getAuthorizationNumber(),
                entityDTO.getPhoneNumber(), address, LiteralConvertor.convertFromStringToTimetable(schedule),
                LiteralConvertor.convertFromStringToServices(services));
        return notary;
    }

}
