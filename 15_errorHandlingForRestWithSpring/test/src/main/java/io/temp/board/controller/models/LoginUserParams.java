package io.temp.board.controller.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserParams {
    @Email(message = "email should be valid")
    private String email;

    @NotEmpty(message = "password cannot be empty")
    @Size(min = 6, max = 24, message = "password length should be in 6~24")
    private String password;
}
