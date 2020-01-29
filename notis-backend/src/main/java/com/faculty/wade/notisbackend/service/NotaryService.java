package com.faculty.wade.notisbackend.service;

import java.util.LinkedList;
import java.util.List;

import com.faculty.wade.notisbackend.DTO.DocumentDTO;
import com.faculty.wade.notisbackend.helper.RandomGenerator;
import com.faculty.wade.notisbackend.model.Document;
import org.springframework.stereotype.Service;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.helper.EntityCreator;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.EntityObject;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

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
        String services = "[['1', 'Contract', 'https://notariat-tineretului.net/contract/'], ['2', 'Divorce', 'https://notariat-tineretului.net/divort/'], ['3', 'Succession', 'https://notariat-tineretului.net/succesiune/'], ['4', 'Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['5', 'Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['6', 'Procure', 'https://notariat-tineretului.net/procura/']]";
        Address address = new Address("-", "-", "-", "-", "-", "-", "-", "-");
        Notary notary = new Notary(id, entityDTO.getName(), "" + entityDTO.getAuthorizationNumber(),
                entityDTO.getPhoneNumber(), address, LiteralConvertor.convertFromStringToTimetable(schedule),
                LiteralConvertor.convertFromStringToServices(services));
        return notary;
    }

    public Document addDocument(DocumentDTO documentDTO) {
        Notary notary = this.get(documentDTO.getEntityId());
        Integer documentId = RandomGenerator.getRandomNumberInRange(100, Integer.MAX_VALUE);
        Document doc = new Document(documentId, documentDTO.getType(), documentDTO.getFormat(), documentDTO.getTemplate(), documentDTO.getPrice());
        if (notary == null)
            return null;

        for (com.faculty.wade.notisbackend.model.Service service : notary.getServices()) {
            if (service.getId().equals(documentDTO.getServiceId())) {
                List<Document> documents = service.getDocuments();
                if (documents == null)
                    documents = new LinkedList<>();
                documents.add(doc);
                service.setDocuments(documents);
            }
        }
        this.delete(notary);
        this.add(notary);
        return doc;
    }

    public Document updateDocument(DocumentDTO documentDTO) {
        Notary notary = this.get(documentDTO.getEntityId());
        Document doc = new Document(documentDTO.getDocumentId(), documentDTO.getType(), documentDTO.getFormat(), documentDTO.getTemplate(), documentDTO.getPrice());
        if (notary == null)
            return null;

        for (com.faculty.wade.notisbackend.model.Service service : notary.getServices()) {
            if (service.getId().equals(documentDTO.getServiceId())) {
                List<Document> documents = service.getDocuments();
                for (Document document : documents) {
                    if (document.getId().equals(doc.getId())) {
                        document.setFormat(doc.getFormat());
                        document.setTemplate(doc.getTemplate());
                        document.setType(doc.getType());
                        document.setPrice(doc.getPrice());
                    }
                }
                service.setDocuments(documents);
            }
        }
        this.delete(notary);
        this.add(notary);
        return doc;
    }

    public boolean deleteDocument(Integer serviceId, Integer entityId, Integer documentId){
    	Notary notary = this.get(entityId);
    	for(com.faculty.wade.notisbackend.model.Service service : notary.getServices()){
			if(service.getId().equals(serviceId)){
				List<Document> documents = service.getDocuments();
				documents.removeIf(serv -> serv.getId().equals(documentId));
				service.setDocuments(documents);
			}
		}
		this.delete(notary);
		this.add(notary);
		return true;
	}

}
