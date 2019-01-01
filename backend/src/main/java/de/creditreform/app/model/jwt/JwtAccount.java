package de.creditreform.app.model.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class JwtAccount implements Serializable  {


    @XmlElement(name  = "account")
    @JsonProperty(value = "account")
    private JwtRoles account;

    public JwtAccount(JwtRoles account) {
        this.account = account;
    }

    public JwtAccount() {
        this(new JwtRoles());
    }

    public JwtRoles getAccount() {
        return account;
    }

    public void setAccount(JwtRoles account) {
        this.account = account;
    }

    public static JwtAccount of(String... arr) {
        return new JwtAccount(new JwtRoles(arr));
    }

}
