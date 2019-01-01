import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject()
export class User {

    access_token: string;

    expires_in: number;

    refresh_expires_in: number;

    refresh_token: string;

    token_type: string;

    @JsonProperty("not-before-policy")
    notBeforePolicy: string;

    session_state: string;

    scope: string;
}
