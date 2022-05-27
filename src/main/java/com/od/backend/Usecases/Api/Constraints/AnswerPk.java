package com.od.backend.Usecases.Api.Constraints;

import java.io.Serializable;
import java.util.Objects;

public class AnswerPk implements Serializable {
  private long user;
  private long room;
  private long question;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof AnswerPk)) return false;
    AnswerPk answerPk = (AnswerPk) o;
    return user == answerPk.user && room == answerPk.room && question == answerPk.question;
  }

  @Override
  public int hashCode() {
    return Objects.hash(user, room, question);
  }
}
