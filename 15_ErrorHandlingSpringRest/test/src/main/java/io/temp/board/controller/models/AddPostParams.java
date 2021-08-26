package io.temp.board.controller.models;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddPostParams {
    @NotEmpty(message = "title cannot be empty")
    private String title;
    @Size(min = 0, max = 30, message = "content length must be between 0~30 characters")
    private String content;
}
