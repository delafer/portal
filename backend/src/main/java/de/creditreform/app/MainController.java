package de.creditreform.app;

import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


//@ApiIgnore
@Controller // Dont use RestController as this method is mapping to a static file not a JSON
public class MainController {

  @RequestMapping(value={"/"})
	public String index() {
		return "index.html";
	}

}
