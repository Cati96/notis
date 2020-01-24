package com.faculty.wade.notisbackend.helper;

import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Timetable;

import java.util.LinkedList;
import java.util.List;

public class LiteralConvertor {
    public static Timetable convertFromStringToTimetable(String string) {
        String[] days = string.split(", ");
        List<String> schedule = new LinkedList<>();
        for (String day : days) {
            schedule.add(day.replace("]", "").replace("[", ""));
        }
        return new Timetable(schedule.get(0), schedule.get(1), schedule.get(2), schedule.get(3), schedule.get(4), schedule.get(5), schedule.get(6));
    }

    public static List<Service> convertFromStringToServices(String string) {
        System.out.println(string);
        String[] servicesList = string.split("],");
        List<Service> services = new LinkedList<>();
        for (String service : servicesList) {
            String[] serviceInfo = service.split(", ");
            String id = serviceInfo[0].replace("[", "").replace("]", "").replace("'", "").replace(" ", "");
            String type = serviceInfo[1].replace("[", "").replace("]", "").replace("'", "").replace(" ", "");
            String description = serviceInfo[2].replace("[", "").replace("]", "").replace("'", "");
            Service serviceObj = new Service(Integer.parseInt(id), type, description, null);
            services.add(serviceObj);
        }
        return services;
    }
    public static List<String> convertFromStringToLanguages(String string) {
        String[] languagesList = string.split("],");
        List<String> languages = new LinkedList<>();
        for (String language : languagesList) {
            languages.add(language.replace("]", "").replace("[", "").replace("'",""));
        }
        return languages;
    }
}
