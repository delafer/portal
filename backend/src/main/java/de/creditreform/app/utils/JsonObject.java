package de.creditreform.app.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.jose4j.json.internal.json_simple.JSONStreamAware;

import java.io.IOException;
import java.io.Writer;

public class JsonObject implements JSONStreamAware {

    private Object obj;

    public JsonObject(Object obj) {
        this.obj = obj;
    }

    public static JsonObject of(Object obj) {
        return new JsonObject(obj);
    }

    @Override
    public void writeJSONString(Writer writer) throws IOException {
        ObjectMapper x = new ObjectMapper();
        x.writeValue(writer, this.obj);
    }
}
