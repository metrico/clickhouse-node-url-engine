<img src="https://user-images.githubusercontent.com/1423657/147935343-598c7dfd-1412-4bad-9ac6-636994810443.png" width=220 >

# ClickHouse NodeJS URL Engine
This basic example illustrates a simple NodeJS [URL Table Engine](https://clickhouse.com/docs/en/engines/table-engines/special/url/) server for Clickhouse

##### β±οΈ Why
> Clickhouse is super fast and already has all the functions one could dream. What is this for?

This example is designed to understand the underlying formats and unleash imagination for integrators.

```mermaid
sequenceDiagram
    autonumber
    ClickHouse->>NodeJS: POST Request
    loop Javascript
        NodeJS->>NodeJS: INSERT
    end
    NodeJS-->>ClickHouse: POST Response
    ClickHouse->>NodeJS: GET Request
    loop Javascript
        NodeJS->>NodeJS: SELECT
    end
    NodeJS-->>ClickHouse: GET Response
```

##### Features
- [x] INSERT to JS array
- [x] SELECT from JS array

#### Setup
Install and run the example service :
```
npm install
npm start
```

#### π¦ Clickhouse
Create a `url_engine_table` table pointed at our service :
```sql
CREATE TABLE url_engine_node
(
    `key` String,
    `value` UInt64
)
ENGINE = URL('http://127.0.0.1:3123/', JSONEachRow)
```
 
 ##### βΆοΈ INSERT
 ```sql
 INSERT INTO url_engine_node VALUES ('hello',1), ('world', 2)
 ```
 ##### βοΈ SELECT
 ```sql
SELECT * FROM url_engine_node

Query id: d65b429e-76aa-49f3-b376-ebd3fbc9cd1a

ββkeyββββ¬βvalueββ
β hello β     1 β
β world β     2 β
βββββββββ΄ββββββββ

2 rows in set. Elapsed: 0.005 sec. 
 ```
 
