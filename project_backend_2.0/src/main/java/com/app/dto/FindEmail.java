package com.app.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class  FindEmail {
	@NotEmpty(message = "Email must not be empty")
	private String email;
}
