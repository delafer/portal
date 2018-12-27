package de.creditreform.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by fan.jin on 2016-10-15.
 */

@Entity
@Table(name = "USER")
public class User implements  Serializable {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "username")
  private String username;

  @JsonIgnore
  @Column(name = "password")
  private String password;

  @Column(name = "firstname")
  private String firstname;

  @Column(name = "lastname")
  private String lastname;



  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {

    this.lastname = lastname;
  }


}
