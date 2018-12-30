package de.creditreform.app.model;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name = "game")
public class Game {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(name = "name",length = 48)
    public String name;

    @Column(name = "category", length = 32)
    public String category;

    @Column(name = "created")
    public Date create_date;

    @Column(name = "desc", length=4000)
    public String description;

    @Column(name = "url")
    public String url;

    @Column(name = "youtube")
    public String youtube;

    @Column(name = "embed")
    public String embed;

    @Column(name = "width")
    public int width;

    @Column(name = "height")
    public int height;

    @Column(name = "thumb")
    public String thumb;

    @Column(name = "picture")
    public String picture;

    @Column(name = "rating")
    public double rating;

    @Column(name = "played")
    public int played;

}
