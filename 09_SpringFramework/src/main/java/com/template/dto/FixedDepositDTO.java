package com.template.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FixedDepositDTO implements Serializable{
    private static final long serialVersionUID = -8363144927181713477L;
	private int fixedDepositId;
	private int bankAccountId;
	private Date fdCreationDate;
	private int fdAmount;
	private int tenure;
	private String active;
	private String email;

    @Override
	public String toString() {
		return "FixedDepositDetails [fixedDepositId=" + fixedDepositId
				+ ", bankAccountId=" + bankAccountId + ", fdCreationDate="
				+ fdCreationDate + ", fdAmount=" + fdAmount + ", tenure="
				+ tenure + ", active=" + active + "]";
	}
}
