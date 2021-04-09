package io.temp.board.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.temp.board.domain.types.AccountRoleType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="test_account")
public class TestAccount {

    @Id @GeneratedValue
    @Column(name = "ACCOUNT_ID")
    private Long id;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "NICKNAME")
    private String nickname;
    
    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private AccountRoleType roleType;
}
