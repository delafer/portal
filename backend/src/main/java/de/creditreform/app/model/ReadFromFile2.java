package de.creditreform.app.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang.StringEscapeUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class ReadFromFile2 {

    public static String es(String s) {
        return s != null ? "'"+StringEscapeUtils.escapeSql(br(s.trim())) + "'" : null;
    }

    private static String br(String s) {
        return s.replace("\r\n", "<br/>");
    }

    public static String esdate(String s) {
        if ("0000-00-00".equals(s)) s = "2014-03-04";
        return s != null ? "PARSEDATETIME('"+StringEscapeUtils.escapeSql(s) + "', 'yyyy-MM-dd')" : null;
    }

    public static String nvl(String a, String b) {
        return a != null ? a : b;
    }

    public static void main(String[] args) throws Exception {
//        // We need to provide file path as the parameter:
//        // double backquote is to avoid compiler interpret words
//        // like \test as \t (ie. as a escape sequence)
//        File file = new File("a:\\test.txt");
//
//        BufferedReader br = new BufferedReader(new FileReader(file));
//
//        String st;
//        while ((st = br.readLine()) != null)
//            System.out.println(st);
//    }
        try {
            ObjectMapper mapper = new ObjectMapper();
            GameTmp[] myObjects = mapper.readValue(new InputStreamReader(new FileInputStream(new File("F:\\games.json")), "UTF-8"), GameTmp[].class);
            System.out.println(myObjects.length);

            for (GameTmp next : myObjects) {
                String tmp = "INSERT INTO game (id, name, category, desc, created, height, width, rating, played, url, embed, youtube, thumb, picture) VALUES (NEXTVAL('hibernate_sequence'), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);";

                int z = RandomUtil.getRandomInt(1, 100);
                float rz = 0f;
                if (z< 5) rz =  RandomUtil.getRandomFloat(1f, 2f);
                else
                if (z< 19) rz =  RandomUtil.getRandomFloat(2f, 3f);
                else
                if (z< 47) rz =  RandomUtil.getRandomFloat(3f, 4f);
                else
                if (z > 96) rz = 5;
                else
                    rz = RandomUtil.getRandomFloat(4f, 5f);

                int roundTo;
                int zzzz = RandomUtil.getRandomInt(0, 15);
                if (zzzz < 3) roundTo = 0;
                else
                if (zzzz < 7) roundTo = 1;
                else roundTo = 2;

                float x = RandomUtil.multiRound(rz, roundTo);
                int played = 0;
                if (z < 20) {
                    played = RandomUtil.getRandomInt(1, 200);
                }

                String res = String.format(tmp, es(next.name), es(next.category), es(next.description), esdate(next.create_date), next.height, next.width, x, played, es(next.url), es(next.embed), es(next.youtube), es(next.thumb3), es(next.thumb2));
                System.out.println(res);
            }



        } catch (Exception e) {
            e.printStackTrace();
        }



    }
}
