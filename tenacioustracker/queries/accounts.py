from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    # SignUp / LogIn
    def get(self, username: str) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                select id
                    , username
                    , hashed_password
                from accounts
                where username = %s
                """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                Account = AccountOutWithPassword(
                    id=record[0], username=record[1], hashed_password=record[2]
                )
                print("Account data from get method:", Account)
                return Account

    def create_user(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into accounts
                        (
                        username
                        , hashed_password
                        )
                        values (%s, %s)
                        returning id
                    """,
                    [
                        account.username,
                        hashed_password,
                    ],
                )
                id = result.fetchone()[0]
                old_data = account.dict()
                old_data["hashed_password"] = hashed_password
                return AccountOutWithPassword(id=id, **old_data)
