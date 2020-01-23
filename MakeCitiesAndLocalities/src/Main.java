import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class Main {

	public static Map<String, Map<String, List<String>>> countiesCitiesAndLocalities = new HashMap<>();

	public static void main(String[] args) {
		try (BufferedReader br = new BufferedReader(new FileReader(new File("./localitati-orase.txt")))) {
			String line;
			while ((line = br.readLine()) != null) {
				String[] infos = line.split(",");
//						infos[2] = locality
//						infos[3] = city
//						infos[6] = county
				Map<String, List<String>> citiesAndLocalities = countiesCitiesAndLocalities.get(infos[6]);
				if (citiesAndLocalities == null) {
					List<String> localities = new ArrayList<>();
					localities.add(infos[2]);

					citiesAndLocalities = new HashMap<>();
					citiesAndLocalities.put(infos[3], localities);

					countiesCitiesAndLocalities.put(infos[6], citiesAndLocalities);
				} else {
					List<String> localities = citiesAndLocalities.get(infos[3]);
					if (localities == null) {
						localities = new ArrayList<>();
						localities.add(infos[2]);

						citiesAndLocalities.put(infos[3], localities);
					} else {
						localities.add(infos[2]);
					}
				}
			}
			System.out.println("Finished to parse input file");
			JSONObject JSON = new JSONObject();

			JSONArray counties = new JSONArray();
			for (String county : countiesCitiesAndLocalities.keySet()) {
				JSONArray cities = new JSONArray();

				Map<String, List<String>> cititesAndLocalities = countiesCitiesAndLocalities.get(county);
				for (String city : cititesAndLocalities.keySet()) {
					JSONArray localities = new JSONArray();

					List<String> localitiesList = cititesAndLocalities.get(city);
					for (String locality : localitiesList) {
						localities.put(locality);
					}

					JSONObject cityObj = new JSONObject();
					cityObj.put("name", city);
					cityObj.put("localities", localities);

					cities.put(cityObj);
				}
				JSONObject countyObj = new JSONObject();
				countyObj.put("name", county);
				countyObj.put("citites", cities);

				counties.put(countyObj);
			}
			JSON.put("counties", counties);

			try (BufferedWriter bw = new BufferedWriter(
					new FileWriter(new File("./counties-cities-localities.json"), false))) {
				bw.append(JSON.toString());
			}
			System.out.println("Finished to write JSON");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
