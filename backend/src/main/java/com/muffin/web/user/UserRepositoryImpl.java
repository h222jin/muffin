package com.muffin.web.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

interface IUserRepository {

}

@Repository
public class UserRepositoryImpl extends QuerydslRepositorySupport implements IUserRepository  {

    private final JPAQueryFactory queryFactory;
    private final DataSource dataSource;


    public UserRepositoryImpl(JPAQueryFactory queryFactory, DataSource dataSource) {
        super(User.class);
        this.queryFactory = queryFactory;
        this.dataSource = dataSource;
    }
}
