import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject()
export class UserContext {

    username: string;
    text?: string;

}
