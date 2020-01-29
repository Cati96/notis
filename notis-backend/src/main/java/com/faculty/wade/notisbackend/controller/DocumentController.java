package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.faculty.wade.notisbackend.DTO.DocumentDTO;
import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.service.NotaryService;
import com.faculty.wade.notisbackend.service.TranslatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Document;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Translator;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/documents")
public class DocumentController {

    @Autowired
    private NotaryService notaryService;
    @Autowired
    private TranslatorService translatorService;

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getAllForEntityTypeAndServiceId")
    public List<Document> getAllDocumentsForEntityTypeAndServiceId(@RequestParam("entityType") String entityType,
                                                                   @RequestParam("serviceId") Integer serviceId, @RequestParam("entityId") Integer entityId) {
        List<Document> documents = new LinkedList<>();
        if (entityType.toLowerCase().equals("notary")) {
            Notary notary = notaryService.get(entityId);
            if (notary == null)
                return null;
            for (Service service : notary.getServices())
                if (service.getId().equals(serviceId) && service.getDocuments() != null)
                    documents.addAll(service.getDocuments());
        } else if (entityType.toLowerCase().equals("translator")) {
            Translator translator = translatorService.get(entityId);
            if (translator == null)
                return null;
            for (Service service : translator.getServices())
                if (service.getId().equals(serviceId) && service.getDocuments() != null)
                    documents.addAll(service.getDocuments());
        } else {
            return null;
        }
        return documents;
    }

    // TODO: implement on real
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getAll")
    public List<Translator> getAllTranslators() {
        return TemporaryData.translators;
    }

    // TODO: implement on real
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getAllForAddressId")
    public List<Translator> getAllTranslatorsForAddressId(@RequestParam("addressId") Integer addressId) {
        List<Translator> translators = new ArrayList<>();
        for (Translator translator : TemporaryData.translators) {
            if (translator.getAddress().getId().equals(addressId)) {
                translators.add(translator);
            }
        }
        return translators;
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody DocumentDTO documentDTO) {
        Document document = new Document();
        if (documentDTO.getEntityType().toLowerCase().equals("notary")) {
            if (documentDTO.getDocumentId() == null)
                document = notaryService.addDocument(documentDTO);
            else
                document = notaryService.updateDocument(documentDTO);
        } else if (documentDTO.getEntityType().toLowerCase().equals("translator")) {
            if (documentDTO.getDocumentId() == null)
                document = translatorService.addDocument(documentDTO);
            else
                document = translatorService.updateDocument(documentDTO);
        }

        return ResponseEntity.ok(document);
    }
//    ?entityType=' + entityType + '&serviceId=' + serviceId + '&entityId=' + entityId + '&documentId=' + docu
    @DeleteMapping("{entityType}/{serviceId}/{entityId}/{documentId}")
    public ResponseEntity<?> delete(@PathVariable String entityType,
                                    @PathVariable Integer serviceId,
                                    @PathVariable Integer entityId,
                                    @PathVariable Integer documentId) {
        Boolean result;
        if (entityType.toLowerCase().equals("notary")) {
           result = notaryService.deleteDocument(serviceId, entityId, documentId);
        } else if (entityType.toLowerCase().equals("translator")) {
           result = translatorService.deleteDocument(serviceId, entityId, documentId);
        }
        else
            result = false;
        return ResponseEntity.ok(result);
    }
}
