package de.creditreform.app.model.jwt;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@JsonNaming(PropertyNamingStrategy.LowerCaseWithUnderscoresStrategy.class)
public class JwtError implements Serializable  {

    @XmlElement  (name  = "error")
    @JsonProperty(value = "error")
    private String error;

    @XmlElement  (name  = "error_description")
    @JsonProperty(value = "error_description")
    private String errorDescription;

    public JwtError(String error, String errorDescription) {
        this.error = error;
        this.errorDescription = errorDescription;
    }

    public JwtError() {
    }
}
