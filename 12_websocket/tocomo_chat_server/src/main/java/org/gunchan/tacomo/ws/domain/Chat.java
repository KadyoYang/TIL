package org.gunchan.tacomo.ws.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class Chat {
    String sender;
    String message;
    Date date;
}
