package de.creditreform.app.model.jwt;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class JwtRoles implements Serializable  {

    private List<String> roles;

    public JwtRoles() {}

    public JwtRoles(String... arr) {
        roles = Arrays.asList(arr);
    }

    public static JwtRoles of(String... arr) {
        return new JwtRoles(arr);
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public void addRole(String role) {
        if (null == roles) {
            roles = new ArrayList<>();
        }
        roles.add(role);
    }
}
