package com.od.backend.Usecases.Api.Constraints;

import java.io.Serializable;
import java.util.Objects;

public class MarkPk implements Serializable {
    private long user;
    private long questionEvent;
    private long room;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MarkPk)) return false;
        MarkPk markPk = (MarkPk) o;
        return user == markPk.user && questionEvent == markPk.questionEvent && room == markPk.room;
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, questionEvent, room);
    }
}
