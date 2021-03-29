package org.gunchan.tacomo.ws.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Chat {
    String sender;
    String message;
    Date date;
}
