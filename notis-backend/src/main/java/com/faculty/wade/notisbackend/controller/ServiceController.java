package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.DTO.ServiceDTO;
import com.faculty.wade.notisbackend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Translator;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/services")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getAllForEntityTypeAndEntityId")
    public List<Service> getAllServicesForEntityTypeAndEntityId(@RequestParam("entityType") String entityType,
                                                                @RequestParam("entityId") Integer entityId) {
        if (entityType.toLowerCase().equals("notary")) {
            return serviceService.getServicesForNotary(entityId);

        } else if (entityType.toLowerCase().equals("translator")) {
            return serviceService.getServicesForTranslator(entityId);
        } else {
            return null;
        }
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody ServiceDTO serviceDTO) {
        Service service = this.serviceService.add(serviceDTO);
        return ResponseEntity.ok(service);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody ServiceDTO serviceDTO) {
        Service service = this.serviceService.update(serviceDTO);
        if (service == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
        }
        return ResponseEntity.ok(service);
    }

    @DeleteMapping(value = "{entityId}/{serviceId}")
    public ResponseEntity<?> delete(@PathVariable Integer entityId, @PathVariable Integer serviceId) {
        serviceService.delete(serviceId, entityId);
        return ResponseEntity.ok(serviceId);
    }


	// TODO : implement on real
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllTypesForEntityType")
	public List<String> getAllServiceTypesForEntityType(@RequestParam("entityType") String entityType) {
		return serviceService.getAllServicesForType(entityType);
	}
}
